import App from "../App";
import Component from "../Component";

export default class InfoDisplay implements Component {
    
    classList = ["info-display"]

    element: Element
    root: App
    id: number

    constructor(root: App, id: number) {
        this.root = root
        this.id = id
        this.element = this.createElement()
    }

    getElement(): Element {
        return this.element
    }

    createElement(): Element {
        const element = document.createElement("div")
        this.classList.forEach(classname => element.classList.add(classname))
        element.innerHTML = String(this.id)
        element.addEventListener("click", this.onclick())
        return element
    }

    onclick(): EventListener {
        const instance = this
        return (event) => {
            this.root.return()
        }
    }
    
}