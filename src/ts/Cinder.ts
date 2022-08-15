
class CinderApp {

}

class Property {
    value: string | number
    bindings: Component[]

    constructor(value: string | number) {
        this.value = value
        this.bindings = []
    }

    static processProperties(component: Component): string {
        const rawText = component.text
        const processedText = rawText
        let matches = rawText.match(/\{\w+\}/g)
        matches.forEach(match => {
            const propertyName = match.replace(/[\{\}]/g, "")
            const propertyValue = component.getProperty(propertyName)
            const matchRe = new RegExp(match)
            processedText.replace(matchRe, String(propertyValue))
        })
        return processedText
    }
}

class Component {

    properties: Map<string, Property>
    element: Element
    _text: string

    setProperty(name: string, value: string | number) {
        if (!this.properties.has(name)) {
            this.properties.set(name, new Property(value))
            return
        }
        const property = this.properties.get(name)
        property.value = value
        property.bindings.forEach(component => component.text = Property.processProperties(component))
    }

    useProperty(name: string, component: Component) {

    }

    getProperty(name: string): string | number | undefined {
        if (!this.properties.has(name)) return undefined
        return this.properties.get(name).value
    }

    get text(): string {
        return this._text
    }

    set text(value: string) {
        this._text = value
        this.element.innerHTML = Property.processProperties(this)
    }

}


const Cinder = (() => {

    let app = undefined


    return {
        createApp: () => {
            app = new CinderApp()
            return app
        }
    }

})()

export default Cinder