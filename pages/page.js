import view from '../utils/view.js'
import Story from '../components/Story.js'

export default async function (path) {
    const stories = await fetchStories(path)
    const hasStories = stories.length > 0
    view.innerHTML = `<div>${hasStories && stories.map((el, i) => Story({...el, index: i + 1})).join("")}</div>`
}

async function fetchStories(endPoint) {
    const BASE_URL = 'https://node-hnapi.herokuapp.com'
    console.log(BASE_URL + endPoint)
    const resp = await fetch(BASE_URL + endPoint)
    console.log(resp.status)
    const data = await resp.json()
    return data
}

// {
//     "id": 34345952,
//     "title": "When the CIA spied on American citizens using pigeons",
//     "points": 85,
//     "user": "prismatic",
//     "time": 1673476140,
//     "time_ago": "a day ago",
//     "comments_count": 49,
//     "type": "link",
//     "url": "https://www.atlasobscura.com/articles/cia-cold-war-pigeon-spies",
//     "domain": "atlasobscura.com"
// }