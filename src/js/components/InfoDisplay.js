var InfoDisplay = /** @class */ (function () {
    function InfoDisplay(root, id) {
        this.classList = ["info-display"];
        this.root = root;
        this.id = id;
        this.element = this.createElement();
    }
    InfoDisplay.prototype.getElement = function () {
        return this.element;
    };
    InfoDisplay.prototype.createElement = function () {
        var element = document.createElement("div");
        this.classList.forEach(function (classname) { return element.classList.add(classname); });
        element.innerHTML = String(this.id);
        element.addEventListener("click", this.onclick);
        return element;
    };
    InfoDisplay.prototype.onclick = function (event) {
        this.root["return"]();
    };
    return InfoDisplay;
}());
export default InfoDisplay;
