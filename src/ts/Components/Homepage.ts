import { Component } from "../Cinder";


class Homepage extends Component {

    static classes = ["homepage"]
    
    constructor() {
        super("div", Homepage.classes)
        this.setProperty("count", 0)
        this.text = "im counting {count}"
        this.useProperty("count", this)
        this.onClick = ((event: MouseEvent) => this.setProperty("count", this.getProperty("count") as number + 1)).bind(this)
    }

}

export default Homepage