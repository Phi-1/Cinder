import App from "./App"


export default interface Component {

    classList: string[]
    element: Element
    root: App

    getElement(): Element
}