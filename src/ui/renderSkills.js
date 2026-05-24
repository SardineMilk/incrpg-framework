import { SKILLS } from "../data/skillsData.js";



export function renderSkills(game) {
    const container = document.getElementById("skills-box");
    if (!container) return;

    container.innerHTML = "";

    const skills = game.skills || {};

    const visible = Object.entries(skills)
        .filter(([, s]) => s?.level >= 1)
        .sort((a, b) => b[1].level - a[1].level);

    if (!visible.length) return;


    for (const skillId in SKILLS) {
        const skill = SKILLS[skillId];
        const state = game.skills[skillId] || { level:0 };

        if (state.level < 1) continue;
        if (skillId in ["strength", "constitution", "agility", "dexterity", "intelligence", "willpower", "wit", "perception"]) continue;

        let entry = container.querySelector(`[data-skill="${skillId}"]`);
        let info;

        if (!entry) {
            entry = document.createElement("div");
            entry.className = "skill-entry";
            entry.dataset.skill = skillId;

            info = document.createElement("div");
            info.className = "skill-info";

            entry.appendChild(info);
            container.appendChild(entry);
        } else {
            info = entry.querySelector(".skill-info");
        }

        info.innerText = `${skill.name}: ${state.level}, ${Math.round(state.xp)}`;
    }

}