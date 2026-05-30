import { SKILLS } from "./skillsData.js"


export const fml = {
    contextAmount: (game) => game.context.amount,
    
    contextSkill: (game) => game.context.skill,
    
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