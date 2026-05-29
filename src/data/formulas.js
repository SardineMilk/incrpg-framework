import { SKILLS } from "./skillsData.js"

function currentContext(game) {
    return game.eventStack[game.eventStack.length - 1];
}

export const fml = {
    contextAmount: (game) => currentContext(game)?.amount,
    
    contextSkill: (game) => currentContext(game)?.skill,
    
    skillParent: (skillFn) => (game) => {
        const skill = skillFn(game);

        if (!skill) {
            throw new Error("skillParent: skill is undefined (missing context or bad stack state)");
        }

        const entry = SKILLS[skill];

        if (!entry) {
            throw new Error(`skillParent: unknown skill "${skill}"`);
        }

        return entry.parent;
    },

    getConditionStrength: (condition) => (
        game.activeConditions[condition].strength
    ),
}