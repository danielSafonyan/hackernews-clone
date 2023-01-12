import Page from './pages/page.js'

const router = new Navigo(null, true, "#");

class RouterHandler {
    constructor() {
        this.setRoutes()
    }

    setRoutes() {
        const routes = [
            {path: '/', page: Page},
            {path: '/new', page: Page},
            {path: '/ask', page: Page},
            {path: '/show', page: Page},
        ]

        routes.forEach(({ path, page}) => {
            router.on(path, () => page(path)).resolve()
        })
    }
}

export default RouterHandler