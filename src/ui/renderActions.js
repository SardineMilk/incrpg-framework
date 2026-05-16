import { ACTIONS } from "../data/actions.js";
import { game } from "../game/state.js";

export function renderActions() {

  const container =
    document.getElementById("actions");

  container.innerHTML = "";

  for (const [id, action] of Object.entries(ACTIONS)) {

    const button =
      document.createElement("button");

    button.innerText = action.name;

    button.onclick = () => {

      game.activeAction = {
        id,
        progress: 0,
      };
    };

    container.appendChild(button);
  }
}