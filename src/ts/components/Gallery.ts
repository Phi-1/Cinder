import App from "../App";
import Component from "../Component";
import InfoDisplay from "./InfoDisplay";

export default class Gallery implements Component {

    classList = ["gallery-container"]

    root: App
    element: Element
    galleryItems: GalleryItem[]

    constructor(root: App, n_items: number) {
        this.root = root
        this.element = this.createElement()
        this.galleryItems = []
        for (let i = 0; i < n_items; i++) {
            const galleryItem = new GalleryItem(this.root, i)
            this.galleryItems.push(galleryItem)
            this.element.appendChild(galleryItem.getElement())
        }
    }

    getElement(): Element {
        return this.element
    }

    createElement(): Element {
        const element = document.createElement("div")
        this.classList.forEach(classname => element.classList.add(classname))
        return element
    }
}

class GalleryItem implements Component {
    
    classList = ["gallery-item"]

    root: App
    element: Element
    id: number

    constructor(root: App, id: number) {
        this.root = root
        this.id = id
        this.element = this.createElement()
    }

    createElement(): Element {
        const element = document.createElement("div")
        this.classList.forEach(classname => element.classList.add(classname))
        element.innerHTML = String(this.id)
        element.addEventListener("click", this.onclick())
        return element
    }

    getElement(): Element {
        return this.element
    }

    onclick(): EventListener {
        const instance = this
        return (event) => {
            instance.root.render(new InfoDisplay(this.root, this.id))
        }
    }
    
}