import RouteHandler from './RouteHandler.js'
import checkActiveLink from './utils/checkActiveLink.js'

class App {
    constructor() {
        new RouteHandler()
        checkActiveLink()
        window.onhashchange = checkActiveLink
    }
}

new App()
