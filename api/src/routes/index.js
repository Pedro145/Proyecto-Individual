const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genero } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCION QUE ME TRAE LA INFO DE LA API
const getVideoGames = async () => {
  var apiUno = await axios.get("https://api.rawg.io/api/games?key=8f38f9d8c0cf44cea5ed8f2777c6376a&page_size=40");
  var apiDos = await axios.get("https://api.rawg.io/api/games?key=8f38f9d8c0cf44cea5ed8f2777c6376a&page=2&page_size=40");
  var apiTres = await axios.get("https://api.rawg.io/api/games?key=8f38f9d8c0cf44cea5ed8f2777c6376a&page=3");

  const dataUno = apiUno.data.results;
  const dataDos = apiDos.data.results;
  const dataTres = apiTres.data.results;

  var dataTotal = dataUno.concat(dataDos, dataTres);

  const infoApi = await dataTotal.map((juego) => {
    return {
      id: juego.id,
      name: juego.name,
      released: juego.released,
      description: juego.description,
      rating: juego.rating,
      platforms: juego.platforms.map((e) => e.platform.name),
      img: juego.background_image,
      genres: juego.genres.map((e) => e.name),
    };
  });
  return infoApi;
};
//----------------------------FUNCION QUE ME TRAE LA INFORMACION DE LA BASE DE DATOS--------------
const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genero,
      atributes: ["name"],
    },
  });
};
//-----------------------------JUNTO LA INFO DE LA API Y DE LA BASE DE DATOS-------------------------
const getAllVideoJuegos = async () => {
  const infoApi = await getVideoGames();
  const infoDb = await getDbInfo();
  const infoTotal = infoApi.concat(infoDb);
  return infoTotal;
};

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  let totalVideoJuegos = await getAllVideoJuegos();
  if (name) {
    let nameVideoJuego = totalVideoJuegos.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    nameVideoJuego.length
      ? res.status(200).send(nameVideoJuego)
      : res.status(404).send("No esta el juego");
  } else {
    res.status(200).send(totalVideoJuegos);
  }
});



router.get("/videogames/:id", async (req, res) => {
  const id = req.params.id;
  const totalJuego = await getAllVideoJuegos();
  if (id) {
    let juegoId = await totalJuego.filter((e) => e.id == id);
    juegoId.length ? res.status(200).json(juegoId) : res.status(404).send("Juego no encontrado");
  }
});




router.get("/genres", async (req, res) => {
  try {
    let response = await axios.get(
      "https://api.rawg.io/api/genres?key=8f38f9d8c0cf44cea5ed8f2777c6376a"
    );
    let genero = response.data.results;
    let genres = genero.map((e) => e.name);
    genres.map(async (e) => {
      if (e.name) {
        await Genero.findOrCreate({
          where: {
            name: e.name,
          },
        });
      }
    });

    res.status(200).send(genres);
  } catch {
    res.status(404).send("Error");
  }
});


router.post("/videogames", async (req, res) => {
  let { name, description, release, rating, genres, platforms, createdDb } = req.body;

  let crearJuego = await Videogame.create({
    name,
    description,
    release,
    rating,
    platforms,
    createdDb,
  
  });
  genres?.map(async (g) => {
    let dbgenero = await Genero.findAll({
      where: {
        name: g,
      },
    });
    await crearJuego.addGenero(dbgenero);
  });

  res.send("Juego Creado");
});

module.exports = router;
