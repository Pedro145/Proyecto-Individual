import axios from "axios";

export function getVideoGames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEO_GAMES",
      payload: json.data,
    });
  };
}

export function getVideoGamesDetail(id){
  return async function (dispatch){
    var json = await axios.get("http://localhost:3001/videogames/" + id);
    return dispatch({
      type: "GET_VIDEOGAMES_DETAIL",
      payload: json.data,
    })
  }
}



export function getGenres() {
  return async function (dispatch) {
    var gener = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: gener.data,
    });
  };
}


export function filterGenres(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "FILTER_GENRES",
      payload,
    });
  };
}
export function getNameGame(payload) {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames?name=" + payload);
        return dispatch({
            type: "GET_NAME_GAME",
            payload: json.data
        })

    }
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderName(payload) {
  return {
    type: "ORDER_NAME",
    payload,
  };
}

export function postVideoGames (payload) {
  return async function(dispatch){
    var json = await axios.post("http://localhost:3001/videogames",payload)
    return json
  }
}

export function orderRating(payload) {
  return {
    type: "ORDER_RATING",
    payload,
  };
}
