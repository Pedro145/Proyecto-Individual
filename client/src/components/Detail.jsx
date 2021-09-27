import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGamesDetail } from "../actions/index";
import { useEffect } from "react";

const Detail = (props) => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getVideoGamesDetail(props.match.params.id));
  }, [dispatch]);

  return (
    <div>
      {console.log(detail)}
      {detail.length > 0 ? (
        <div>
          <h1>{detail[0].name}</h1>
          <p>{detail[0].description}</p> 
          <p>{detail[0].released}</p>
          <p>{detail[0].rating}</p>
          <img src={detail[0].img} />
          <p>{detail[0].genres.map((e) => e)}</p>
          <p> {detail[0].platforms && detail[0].platforms.map((e) => e)}</p>
        </div>
      ) : 
        <p>Cargando..</p>
      }
    </div>
  );
};

export default Detail;
