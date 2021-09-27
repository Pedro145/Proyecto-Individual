import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameGame} from "../actions"


const Nabvar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")


    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleButton = (e) => {
      e.preventDefault()
      dispatch(getNameGame(name))
    }
    
    return (
        <div>
        <input
        onChange = {e => handleInput(e)}
        type="text"
        placeholder = "Buscar..."></input>

        <button type="submit" onClick={e => handleButton(e)}>Buscar</button>
        </div>
    )

} 

export default Nabvar;