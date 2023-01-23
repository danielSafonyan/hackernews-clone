import RouteHandler from './RouteHandler.js'
import checkActiveLink from './utils/checkActiveLink.js'

class App {
    constructor() {
        new RouteHandler()
        checkActiveLink()
    }
}

new App()

window.onhashchange = checkActiveLink