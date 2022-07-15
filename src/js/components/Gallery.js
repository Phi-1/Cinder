import InfoDisplay from "./InfoDisplay";
var Gallery = /** @class */ (function () {
    function Gallery(root, n_items) {
        this.classList = ["gallery-container"];
        this.root = root;
        this.element = this.createElement();
        this.galleryItems = [];
        for (var i = 0; i < n_items; i++) {
            var galleryItem = new GalleryItem(this.root, i);
            this.galleryItems.push(galleryItem);
            this.element.appendChild(galleryItem.getElement());
        }
    }
    Gallery.prototype.getElement = function () {
        return this.element;
    };
    Gallery.prototype.createElement = function () {
        var element = document.createElement("div");
        this.classList.forEach(function (classname) { return element.classList.add(classname); });
        return element;
    };
    return Gallery;
}());
export default Gallery;
var GalleryItem = /** @class */ (function () {
    function GalleryItem(root, id) {
        this.classList = ["gallery-item"];
        this.root = root;
        this.id = id;
        this.element = this.createElement();
    }
    GalleryItem.prototype.createElement = function () {
        var element = document.createElement("div");
        this.classList.forEach(function (classname) { return element.classList.add(classname); });
        element.innerHTML = String(this.id);
        element.addEventListener("click", this.onclick());
        return element;
    };
    GalleryItem.prototype.getElement = function () {
        return this.element;
    };
    GalleryItem.prototype.onclick = function () {
        var _this = this;
        var instance = this;
        return function (event) {
            instance.root.render(new InfoDisplay(_this.root, _this.id));
        };
    };
    return GalleryItem;
}());
