import { SKILLS } from "./skillsData.js"


export const fml = {
    contextAmount: (game) => game.context.amount,
    
    contextSkill: (game) => game.context.skill,
    
    skillParent: (skillFn) => (game) => {
        const skill = skillFn(game);
        const entry = SKILLS[skill];
        return entry.parent;
    },

    getConditionStrength: (condition) => (
        game.activeConditions[condition].strength
    ),
}