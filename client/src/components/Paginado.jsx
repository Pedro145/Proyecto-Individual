import React from "react";
import styles from "./Paginado.module.css"


const Paginado = ({juegosPage, stateGame, paginado}) => {
    const numPages = []

    //tomo el numero redondo de dividir todos los videojuegos x las paginas
    for( let i = 0; i <=Math.ceil(stateGame/juegosPage); i++){
        numPages.push(i)
    }
    return (
        <nav className={styles.paginado}> 
            <ul className="paginado">
                {
                    numPages && numPages.map(num => ( 
                        <li className="num">
                        <a onClick={() =>paginado(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}


export default Paginado