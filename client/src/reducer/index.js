const initialState = {
    videogames: [],
    genres: [],
    videogames2: [],
    detail: [],
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
       case "GET_VIDEO_GAMES":
           return {
               ...state,
               videogames: action.payload,
               videogames2: action.payload,
           }
        case "GET_VIDEOGAMES_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
                
            }
        case "FILTER_GENRES":
        var filtro = [...state.genres]
        return{
            ...state,
            videogames: filtro === "todos" ? state.videogames2 : state.videogames2.filter(e => e.genres.includes(action.payload))
                }    
        

        case "FILTER_CREATED":
            const filtroCreate = action.payload === "created" ? state.videogames.filter( e => e.createdDb) : state.videogames.filter(e => !e.createdDb)
            return {
                ...state,
                videogames: action.payload === "todos" ? state.videogames : filtroCreate
            }


        case "POST_VIDEOGAME":
            return {
                ...state
            }    
            

        case "ORDER_NAME":
            let order = action.payload === "asce" ? state.videogames.sort(function(a,b){
                if(a.name > b.name) {
                    return 1;
                }

                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }):
            state.videogames.sort(function(a,b){
            if(a.name < b.name) {
                return 1;
            }

            if(b.name < a.name) {
                return -1;
            }
            return 0;
        
        })
        return {
            ...state,
            videogames: order
        }

        case "ORDER_RATING":
        let ratingOrder = action.payload === "rating2" ? state.videogames.sort(function(a,b){
            if(a.rating > b.rating) {
                return 1;
            }

            if(b.rating > a.rating) {
                return -1;
            }
            return 0;
        }):
        state.videogames.sort(function(a,b){
        if(a.rating < b.rating) {
            return 1;
        }

        if(b.rating < a.rating) {
            return -1;
        }
        return 0;
        })
        return {
            ...state,
            videogames: ratingOrder
        }


        case "GET_NAME_GAME":
            return {
                ...state,
                videogames: action.payload
            }


           default: return state

        }
}

export default rootReducer;