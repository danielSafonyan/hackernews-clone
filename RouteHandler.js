import Page from "./Pages/Page.js"
import StoryPage from "./Pages/StoryPage.js"
import Favorites from "./Pages/Favorites.js"

const router = new Navigo(null, true, '#')

class RouteHandler {
    constructor() {
        this.setRoutes()
    }

    setRoutes() {
        const routes = [
            {path: '/', page: Page},
            {path: '/new', page: Page},
            {path: '/ask', page: Page},
            {path: '/show', page: Page},
            {path: '/item', page: StoryPage},
            {path: '/favorites', page: Favorites},
        ]

        routes.forEach(({path, page}) => router.on(path, () => page(path)).resolve())
    }
}

export default RouteHandler