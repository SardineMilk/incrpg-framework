import { game } from "../game/state.js";

export function renderHero() {

  document.getElementById("health-bar").innerText =
    `HP ${Math.floor(game.resources.health)} / ${game.resources.maxHealth}`;

  document.getElementById("stamina-bar").innerText =
    `SP ${Math.floor(game.resources.stamina)} / ${game.resources.maxStamina}`;

  document.getElementById("mental-bar").innerText =
    `MP ${Math.floor(game.resources.mental)} / ${game.resources.maxMental}`;

  document.getElementById("money-box").innerText =
    `${game.resources.gold} gold`;

  renderStats();
}

function renderStats() {

  const box = document.getElementById("stats-box");

  box.innerHTML = "";

  for (const [name, value] of Object.entries(game.attributes)) {

    const div = document.createElement("div");

    div.className = "attribute-box";

    div.innerText =
      `${capitalize(name)}: ${value}`;

    box.appendChild(div);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}