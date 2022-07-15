var App = /** @class */ (function () {
    function App(root) {
        this.root = root;
        this.viewStack = [];
    }
    App.prototype.render = function (component, up) {
        if (up === void 0) { up = true; }
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
        // Null check and prevents last element from being added to check when returning to previous element in stack
        if (this.view && up)
            this.viewStack.push(this.view);
        this.view = component;
        this.root.appendChild(component.getElement());
    };
    App.prototype["return"] = function () {
        this.viewStack.pop();
        this.render(this.viewStack[this.viewStack.length - 1], false);
    };
    return App;
}());
export default App;
