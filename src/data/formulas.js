import { SKILLS } from "./skillsData.js";
import { game } from "../game/state.js";

// no touchy
// have fun trying to edit this, future me
const res = (val) => (typeof val === 'function' ? val() : val);
export const lift = (fn) => (...args) => () => fn(game, ...args.map(res));


// When adding new formula:
// It takes `game` as a parameter, but you dont need to pass game in at point of use
// Wrap in the lift() function to make the magic work
export const fml = {
    contextAmount:      lift((game)                 => game.context.amount),
    contextSkill:       lift((game)                 => game.context.skill),
    contextCondition:   lift((game)                 => game.context.condition),

    conditionStrength:  lift((game, condition)      => game.activeConditions[condition]?.strength),
    resourceCurrent:    lift((game, resource)       => game.resources[resource]?.current),
    skillLevel:         lift((game, skill)          => game.skills[skill]?.level),
    skillParent:        lift((game, skill)          => SKILLS[skill]?.parent),

    add:                lift((game, x, y)           => x + y),
    sub:                lift((game, x, y)           => x - y),
    mul:                lift((game, x, y)           => x * y),
    div:                lift((game, x, y)           => x / y),
    min:                lift((game, x, y)           => Math.min(x, y)),
    max:                lift((game, x, y)           => Math.max(x, y)),
    clamp:              lift((game, x, min, max)    => Math.max(min, Math.min(max, x))),
    ternary:            lift((game, cond, t, f)     => cond ? t : f),
};