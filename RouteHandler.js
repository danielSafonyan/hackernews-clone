import NavPage from "./Pages/NavPage.js"
import StoryPage from "./Pages/StoryPage.js"
import Favorites from "./Pages/Favorites.js"

const router = new Navigo(null, true, '#')

class RouteHandler {
    constructor() {
        this.setRoutes()
    }

    setRoutes() {
        const routes = [
            {path: '/', page: NavPage},
            {path: '/new', page: NavPage},
            {path: '/ask', page: NavPage},
            {path: '/show', page: NavPage},
            {path: '/item', page: StoryPage},
            {path: '/favorites', page: Favorites},
        ]

        routes.forEach(({path, page}) => router.on(path, () => page(path)).resolve())
    }
}

export default RouteHandler