import view from "../utils/view.js"
import baseUrl from "../utils/baseUrl.js"
import Story from '../components/Story.js'
import store from "../store.js";
import checkFavorite from "../utils/checkIsFavorite.js";

export default async function NavPage(path) {
    const endPoint = getEndPoint(path)
    
    let stories
    try { 
        view.textContent = 'Fetching data...'
        stories = await fetchNavPage(endPoint)
      } catch(error) {
        view.innerHTML = `<div class="error">Error while fetching stories.</div>`;
        return
      } 

    const { favorites } = store.getState()

    view.innerHTML = stories.map((story, i) => Story(
        {
            ...story, 
            index: i,
            isFavorite: checkFavorite(favorites, story)
        })).join('')

    document.querySelectorAll('.favorite').forEach(el => el.addEventListener('click', async (event) => {
        const storyContainer = event.target.closest('.favorite')
        const story = JSON.parse(storyContainer.dataset.story)
        const isFavorite = checkFavorite(store.getState().favorites, story)
        store.dispatch({
            type: `${isFavorite ? "REMOVE" : "ADD"}_FAVORITE`,
            payload: {
                favorite: story
            }
        })
        await NavPage(path)
    }))
}

async function fetchNavPage(endPoint) {
    const resp = await fetch(baseUrl + endPoint)
    const data = await resp.json()
    return data
}

function getEndPoint(path) {
    if (path === '/') {
        return '/news'
    } else if (path === '/new') {
        return '/newest'
    } else {
        return path
    }
}
