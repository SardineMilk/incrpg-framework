import { game } from "../game/state.js";

export function renderHero() {

  document.getElementById("health-bar").innerText =
    `HP ${Math.floor(game.resources.health.current)} / ${game.resources.health.max}`;

  document.getElementById("stamina-bar").innerText =
    `SP ${Math.floor(game.resources.stamina.current)} / ${game.resources.stamina.max}`;

  document.getElementById("mental-bar").innerText =
    `MP ${Math.floor(game.resources.mental.current)} / ${game.resources.mental.max}`;

  document.getElementById("money-box").innerText =
    `${game.resources.gold} gold`;

  renderStats();
}

function renderStats() {

  const box = document.getElementById("stats-box");

  box.innerHTML = "";

  for (const name in game.attributes) {

    const div = document.createElement("div");

    div.className = "attribute-box";

    div.innerText =
      `${capitalize(name)}: ${game.attributes[name].value}`;

    box.appendChild(div);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}