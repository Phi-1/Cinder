import Component from "./Component";


export default class App {

    root: Element
    view: Component
    viewStack: Component[]

    constructor(root: Element) {
        this.root = root
        this.viewStack = []
    }

    render(component: Component, up: boolean = true): void {
        while(this.root.firstChild) {
            this.root.removeChild(this.root.firstChild)
        }
        // Null check and prevents last element from being added to check when returning to previous element in stack
        if (this.view && up) this.viewStack.push(this.view)
        this.view = component
        this.root.appendChild(component.getElement())
    }

    return(): void {
        this.viewStack.pop()
        this.render(this.viewStack[this.viewStack.length-1], false)
    }
}