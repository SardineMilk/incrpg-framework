import { renderHero } from "./renderHero.js";
import { renderLog } from "./renderLog.js";
/*
import { renderSkills } from "../ui/renderSkills.js";
import { renderActions } from "../ui/renderActions.js";
import { renderTasks } from "../ui/renderTasks.js";
*/
export function render() {

  renderHero();
  renderLog(game);
  /*
  renderSkills();
  renderActions();
  renderTasks();
*/
}