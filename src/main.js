import { game } from "./game/state.js";
import { startTicking } from "./game/tick.js";
import { render } from "./ui/render.js";

window.game = game;

render();
startTicking(render);