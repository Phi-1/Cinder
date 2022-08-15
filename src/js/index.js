import { Cinder } from "./Cinder.js";
import Homepage from "./Components/Homepage.js";
function main() {
    const app = Cinder.createApp(document.querySelector(".root"));
    app.render(new Homepage());
}
main();
