import { Cinder } from "./Cinder";
import Homepage from "./Components/Homepage";


function main() {
    const app = Cinder.createApp(document.querySelector(".root"))
    app.render(new Homepage())
}
main()