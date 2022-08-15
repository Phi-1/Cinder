import { Component } from "../Cinder.js";
class Homepage extends Component {
    constructor() {
        super("div", Homepage.classes);
        this.setProperty("count", 0);
        this.text = "im counting {count}";
        this.useProperty("count", this);
        this.onClick = ((event) => this.setProperty("count", this.getProperty("count") + 1)).bind(this);
    }
}
Homepage.classes = ["homepage"];
export default Homepage;
