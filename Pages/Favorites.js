import view from "../utils/view.js"
import Story from '../components/Story.js'
import store from "../store.js";
import checkFavorite from "../utils/checkIsFavorite.js";

export default function Favorites() {
    const { favorites } = store.getState()
    const haveFavorites = favorites.length > 0 
    let content = null
    if (haveFavorites) {
        content = favorites.map((story, i) => Story(
        {
            ...story, 
            index: i,
            isFavorite: checkFavorite(favorites, story)
        })).join('')
    } else {
        content = "Let's add some favorites."
    }

    view.innerHTML = content

    document.querySelectorAll('.favorite').forEach(el => el.addEventListener('click', async (event) => {
        const story = JSON.parse(event.target.dataset.story)
        const isFavorite = checkFavorite(store.getState().favorites, story)
        store.dispatch({
            type: `${isFavorite ? "REMOVE" : "ADD"}_FAVORITE`,
            payload: {
                favorite: story
            }
        })
        await Favorites()
    }))
}