import RouteHandler from './RouteHandler.js'
import store from './store.js'

class App {
    constructor() {
        new RouteHandler()
    }
}

new App()
checkActiveLink()

window.onhashchange = checkActiveLink

function checkActiveLink() {
    const links = document.querySelectorAll('.header-link')
    const currentHash = window.location.hash
    links.forEach(link => {
        const linkHash = link.getAttribute("href")
        if (linkHash === currentHash) {
            link.classList.add('active');  
        } else {
            link.classList.remove('active');  
        }
    })
}