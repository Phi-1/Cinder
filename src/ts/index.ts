import App from "./App"
import Gallery from "./components/Gallery"


function main() {
    const app = new App(document.querySelector(".page"))
    app.render(new Gallery(app, 8))
}

main()