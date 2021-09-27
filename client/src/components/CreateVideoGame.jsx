import React from "react";
import { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, postVideoGames } from "../actions";



const CreateVideogames = () => {
  const dispatch = useDispatch();
  const todosGenres = useSelector((state) => state.genres);
  const [errores, setErrores] = useState({})

  const [form, setForm] = useState({
      name: "",
      description: "",
      release: "",
      rating: "",
      platforms: "",
      genres: [],
  })

  useEffect(() => {
      dispatch(getGenres())
  },[])

 const handleInputChange = (e) => {
     setForm({
         ...form,
         [e.target.name] : e.target.value
     })
 } 

 const handleGenres = (e) => {
     setForm({
         ...form,
         genres: [...form.genres, e.target.value]
     })
 }

 const handleSubmit = (e) => {
     e.preventDefault()
     dispatch(postVideoGames(form))
     alert("VideoGame created")
     setForm({
        name: "",
        description: "",
        release: "",
        rating: "",
        platforms: "",
        genres: [],
     })
 }


  return (
      <div>
          <h1>Crea Tu VideoJuego</h1>
          <form onSubmit={e => handleSubmit(e)}>
              <div>
                  <label>Nombre:</label>
                  <input type="text" value={form.name} name="name" onChange={e => handleInputChange(e)}/>
              </div>

              <div>
                  <label>Fecha De Lanzamiento</label>
                  <input type="date" value={form.release} name="release" onChange={e => handleInputChange(e)} />
              </div>

              <div>
                  <label>Rating</label>
                  <input type="text" value={form.rating} name="rating" onChange={e => handleInputChange(e)}/>
              </div>

              <div>
                  <label>Descripcion</label>
                  <input type="text" value={form.description} name="description" onChange={e => handleInputChange(e)}/>
              </div>

              <div>
                  <label>Selecciona El Genero</label>
                  <select onChange={e => handleGenres(e)}>
                      {todosGenres && todosGenres.map(e => (
                          <option value={e}>{e}</option>
                      ))}
                  </select>
                    {console.log(form)}
                  <button type="submit" > Crear VideoJuego</button>
              </div>
          </form>
          <Link to="/home"></Link>
      </div>
  )



};

export default CreateVideogames;
