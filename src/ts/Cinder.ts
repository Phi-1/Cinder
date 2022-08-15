

const Cinder = (() => {

    class App {

        root: Element
        view: Component
        viewStack: Component[]
    
        constructor(root: Element) {
            this.root = root
            this.viewStack = []
        }
    
        render(component: Component) {
            this.view = component
            this.viewStack.push(component)
            while(this.root.lastChild) this.root.removeChild(this.root.lastChild)
            this.root.appendChild(component.element)
        }
    
        renderPrevious() {
            this.viewStack.pop()
            this.render(this.viewStack[this.viewStack.length-1])
        }
    
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

    class ClassList {
        list: string[]
        component: Component

        constructor(classList) {
            this.list = classList
            this.list.forEach((className => this.component.element.classList.add(className)).bind(this))
        }

        add(className: string) {
            this.list.push(className)
            this.component.element.classList.add(className)
        }

        remove(className: string) {
            this.list.splice(this.list.indexOf(className), 1)
            this.component.element.classList.remove(className)
        }
    }
    
    class Component {
    
        properties: Map<string, Property>
        element: Element
        classList: ClassList
        onClick: (event: MouseEvent) => void
        _text: string
        _children: Component[]
    
        constructor(elementType: string, classList: string[]) {
            this.element = document.createElement(elementType)
            this.element.addEventListener("click", ((event: MouseEvent) => { if (this.onClick) this.onClick(event) }).bind(this))
            this.classList = new ClassList(classList)
            this._children = []
        }
    
        setProperty(name: string, value: string | number) {
            if (!this.properties.has(name)) {
                this.properties.set(name, new Property(value))
                return
            }
            const property = this.properties.get(name)
            property.value = value
            property.bindings.forEach(component => component.element.innerHTML = Property.processProperties(component))
        }
    
        useProperty(name: string, component: Component) {
            if (!this.properties.has(name)) {
                const prop = new Property(undefined)
                prop.bindings.push(component)
                this.properties.set(name, prop)
                return
            }
            this.properties.get(name).bindings.push(component)
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


    let app: App = undefined

    return {
        Component: Component,
        createApp: (root: Element): App => {
            app = new App(root)
            return app
        },
        getApp: (): App => {
            return app
        }
    }

})()

export default Cinder