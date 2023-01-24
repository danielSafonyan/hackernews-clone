import view from "../utils/view.js"
import Story from '../components/Story.js'
import store from "../store.js";
import checkFavorite from "../utils/checkIsFavorite.js";

export default function Favorites() {
    // Get the favorites state from the store
    const { favorites } = store.getState()
    // Check if there are any favorites in state
    const haveFavorites = favorites.length > 0 
    let content
    if (haveFavorites) {
        // If there are favorites, map over them and create a Story component for each one 
        content = favorites.map((story, i) => Story(
        {
            ...story, 
            index: i + 1,
            isFavorite: true
        })).join('')
    } else {
        // If there are no favorites, set content to "Let's add some favorites."
        content = "Let's add some favorites."
    }

    // Set the innerHTML of the view to the content variable
    view.innerHTML = content

    // Select all elements with the class "favorite" and add event listner that will listen for "deleteFromFavorite"
    document.querySelectorAll('.favorite').forEach(el => el.addEventListener('click', async (event) => {
        // Get the story object from the element's dataset
        const story = JSON.parse(event.target.dataset.story)
        // Remove the story from the favorites state
        store.dispatch({
            type: `REMOVE_FAVORITE`,
            payload: {
                favorite: story
            }
        })
        // Call the Favorites function again to render remaining favorites stories
        Favorites()
    }))
}
