import React, { Fragment }  from "react";
import {useState, useEffect} from"react"
import {useDispatch, useSelector} from "react-redux"
import { getVideoGames, filterGenres, getGenres, filterCreated, orderName, orderRating } from "../actions";
import Card from "./Card"
import { Link } from "react-router-dom";
import Paginado from "./Paginado"
import Nabvar from "./Nabvar";
import Detail from "./Detail";


export default function Home (){
    const dispatch = useDispatch();
    const stateGame = useSelector((state) => state.videogames) //Igual que mapstatetoprops me trae el estado

    //---------------------------Paginado--------------------------
    
    const [actPage, setActPage] = useState(1) //pagina principal
    const [juegosPage, setJuegosPage] = useState(15) //juegos por pagina
     const indiceUltimoVg = actPage * juegosPage  //indice del ultimo videojuego
     const indicePrimerVg = indiceUltimoVg - juegosPage // indice del primer videojuego
     const actuaVideogames = stateGame.slice(indicePrimerVg, indiceUltimoVg) //toma solo el primer y el ultimo indice de videojuego
     //filtro genero
     const todosGenres = useSelector(state => state.genres)
     //ordenamiento
     const[order, setOrder] = useState("")
     //renderizado
     const paginado = (numeroPagina) => {
        setActPage(numeroPagina)
     }


    useEffect(() => {
     dispatch(getVideoGames())
     dispatch(getGenres())
    },[dispatch])

    function handleFilter(e){
      e.preventDefault()
      dispatch(filterGenres(e.target.value))
      setActPage(1)
    }


    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
       
    }
    

    function handleSort (e){
       e.preventDefault()
       dispatch(orderName(e.target.value))
       setActPage(1)
       setOrder("Ordenado" + e.target.value)
    }

   function handleRating(e){
       e.preventDefault()
       dispatch(orderRating(e.target.value))
       setActPage(1)
       setOrder("Ordenado" + e.target.value)

   }

    return(
        <div>
            <Link to="/videogames">Crear VideoJuego</Link>
            <h1>Video Games</h1>

            <select  onChange={e => handleSort(e)}>
                <option value="asce">Ascendente</option>
                <option value="desce">Descendente</option>
            </select>

            <select onChange={e => handleRating(e)}>
            <option value="rating">MejorRatign</option>
            <option value="rating2">PeorRating</option>
            </select>
            <br/>


            <select onChange={e => handleFilter(e)}>
            <option value="todos">VerTodosLosJuegos</option>
            {
                todosGenres?.map((e) => (
                    <option value={e}>{e}</option>
                ))
            }
            </select>

            <select onChange={e => handleFilterCreated(e)}>
                <option value="todos">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>
            <Paginado juegosPage={juegosPage} stateGame={stateGame.length} paginado={paginado} />
                <Nabvar></Nabvar>
            {
                actuaVideogames && actuaVideogames.map((e) => {
                    return (
                    <Link to={"/home/Detail/" + e.id}>
                    <Card  img={e.img} name={e.name} genres={e.genres} rating={e.rating} key={e.id}/>
                    </Link>
                    )
                })
            }
        </div>
    )
}