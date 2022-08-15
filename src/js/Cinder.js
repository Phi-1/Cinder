class App {
    constructor(root) {
        this.root = root;
        this.viewStack = [];
    }
    render(component) {
        this.view = component;
        this.viewStack.push(component);
        while (this.root.lastChild)
            this.root.removeChild(this.root.lastChild);
        this.root.appendChild(component.element);
    }
    renderPrevious() {
        this.viewStack.pop();
        this.render(this.viewStack[this.viewStack.length - 1]);
    }
}
class Property {
    constructor(value) {
        this.value = value;
        this.bindings = [];
    }
    static processProperties(component) {
        const rawText = component.text;
        let processedText = rawText;
        let matches = rawText.match(/\{\w+\}/g);
        matches.forEach(match => {
            const propertyName = match.replace(/[\{\}]/g, "");
            const propertyValue = component.getProperty(propertyName);
            const matchRe = new RegExp(match);
            processedText = processedText.replace(matchRe, String(propertyValue));
        });
        return processedText;
    }
}
class ClassList {
    constructor(classList, component) {
        this.list = classList;
        this.component = component;
        this.list.forEach((className => this.component.element.classList.add(className)).bind(this));
    }
    add(className) {
        this.list.push(className);
        this.component.element.classList.add(className);
    }
    remove(className) {
        this.list.splice(this.list.indexOf(className), 1);
        this.component.element.classList.remove(className);
    }
}
class Component {
    constructor(elementType, classList) {
        this.properties = new Map();
        this.element = document.createElement(elementType);
        this.element.addEventListener("click", ((event) => { if (this.onClick)
            this.onClick(event); }).bind(this));
        this.classList = new ClassList(classList, this);
        this._children = [];
    }
    setProperty(name, value) {
        if (!this.properties.has(name)) {
            this.properties.set(name, new Property(value));
            return;
        }
        const property = this.properties.get(name);
        property.value = value;
        property.bindings.forEach(component => component.element.innerHTML = Property.processProperties(component));
    }
    useProperty(name, component) {
        if (!this.properties.has(name)) {
            const prop = new Property(undefined);
            prop.bindings.push(component);
            this.properties.set(name, prop);
            return;
        }
        this.properties.get(name).bindings.push(component);
    }
    getProperty(name) {
        if (!this.properties.has(name))
            return undefined;
        return this.properties.get(name).value;
    }
    addChild(component) {
        this._children.push(component);
        this.element.appendChild(component.element);
    }
    removeChild(component) {
        this._children.splice(this._children.indexOf(component), 1);
        this.element.removeChild(component.element);
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.element.innerHTML = Property.processProperties(this);
    }
}
const Cinder = (() => {
    let app = undefined;
    return {
        Component: Component,
        createApp: (root) => {
            app = new App(root);
            return app;
        },
        getApp: () => {
            return app;
        }
    };
})();
export { Cinder, Component };
