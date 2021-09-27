import React from "react";
import styles from "./Card.module.css"


const Card = ({img, name, genres, rating}) => {
    let gener = genres?.map((e) => e.name);
    
    return (
     <div className={styles.carta}>
         <h3>Nombre: {name}</h3>
         <p>Genero: {genres}</p>
         <p>Rating: {rating}</p>
         <img width={230} height={345} src={img} alt="" className={styles.Card}/>
     </div>
 )
}
export default Card;