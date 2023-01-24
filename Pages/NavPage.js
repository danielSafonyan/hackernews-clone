import view from "../utils/view.js"
import baseUrl from "../utils/baseUrl.js"
import Story from '../components/Story.js'
import store from "../store.js";
import checkFavorite from "../utils/checkIsFavorite.js";

export default async function NavPage(path) {
    // Get the endpoint for the API call based on the path
    const endPoint = getEndPoint(path)
    
    let stories
    try { 
        // Display a message while fetching data
        view.innerHTML = 'Fetching data...'
        // Fetch the stories from the API
        stories = await fetchNavPage(endPoint)
      } catch(error) {
        view.innerHTML = `<div class="error">Error while fetching stories.</div>`;
        return
      } 

    // Get the favorites from the state
    const { favorites } = store.getState()

    // Render the stories 
    view.innerHTML = stories.map((story, i) => Story(
        {
            ...story, 
            index: i + 1,
            // Check if the story is a favorite
            isFavorite: checkFavorite(favorites, story)
        })).join('')

    // Add event listeners to the favorite buttons
    document.querySelectorAll('.favorite').forEach(el => el.addEventListener('click', async (event) => {
        // Get the story container element [it has two children and will throw eror if you push the heart withput line below]
        const storyContainer = event.target.closest('.favorite')
        // Get the story object from the container's dataset
        const story = JSON.parse(storyContainer.dataset.story)
        // Check if the story is a favorite
        const isFavorite = checkFavorite(store.getState().favorites, story)
        // Modify state depending on whether the story is a favorite or not
        store.dispatch({
            type: `${isFavorite ? "REMOVE" : "ADD"}_FAVORITE`,
            payload: {
                favorite: story
            }
        })
        // Call the NavPage function again to render favorited and unfavorited stories
        await NavPage(path)
    }))
}

// Function to fetch the stories from the API
async function fetchNavPage(endPoint) {
    const resp = await fetch(baseUrl + endPoint)
    const data = await resp.json()
    return data
}

// Function to get the endpoint for the API call based on the path
function getEndPoint(path) {
    if (path === '/') {
        return '/news'
    } else if (path === '/new') {
        return '/newest'
    } else {
        return path
    }
}
