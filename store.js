function createStore(reducer) {
    const stateFromStorage = JSON.parse(localStorage.getItem('state')) || undefined
    let currentState = reducer(stateFromStorage, {})

    return {
        getState() { return currentState},
        dispatch(action) { 
            currentState = reducer(currentState, action)
            localStorage.setItem('state', JSON.stringify(currentState))
        }
    }
}

const initialState = {
    favorites: []
}

function favoritesReducer(state = initialState, action) {
    switch(action.type) {
        case "ADD_FAVORITE": {
            const addedFavorite = action.payload.favorite
            const favorites = [...state.favorites, addedFavorite]
            return { favorites }
        }
        case "REMOVE_FAVORITE": {
            const removedFavorite = action.payload.favorite
            const favorites = state.favorites.filter(el => el.id !== removedFavorite.id) 
            return { favorites }
        }
        default:
            return state
    }
}

const store = createStore(favoritesReducer);
export default store;