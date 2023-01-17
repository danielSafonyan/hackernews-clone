import view from "./view.js"
import baseUrl from "./baseUrl.js"
import Story from './Story.js'
import store from "./store.js";
import checkFavorite from "./checkIsFavorite.js";

export default async function Page(path) {
    const endPoint = getEndPoint(path)
    const stories = await fetchPage(endPoint)

    const { favorites } = store.getState()

    view.innerHTML = stories.map((story, i) => Story(
        {
            ...story, 
            index: i,
            isFavorite: checkFavorite(favorites, story)
        })).join('')

    document.querySelectorAll('.favorite').forEach(el => el.addEventListener('click', async (event) => {
        const story = JSON.parse(event.target.dataset.story)
        const isFavorite = checkFavorite(store.getState().favorites, story)
        store.dispatch({
            type: `${isFavorite ? "REMOVE" : "ADD"}_FAVORITE`,
            payload: {
                favorite: story
            }
        })
        await Page(path)
    }))
}

async function fetchPage(endPoint) {
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
