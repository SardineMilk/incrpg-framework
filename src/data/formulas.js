import { SKILLS } from "./skillsData.js";
import { game } from "../game/state.js";

// no touchy
// have fun trying to edit this, future me
const res = (val) => (typeof val === 'function' ? val() : val);
export const lift = (fn) => (...args) => () => fn(game, ...args.map(res));


// When adding new formula:
// It takes `game` as a parameter, but you dont need to pass game in at point of use
const definitions = {
    contextAmount:    (game) => game.context.amount,
    contextSkill:     (game) => game.context.skill,
    contextCondition: (game) => game.context.condition,

    conditionStrength:  (game, condition)   => game.activeConditions[condition]?.strength,
    resourceCurrent:    (game, resource)    => game.resources[resource]?.current,
    skillLevel:         (game, skill)       => game.skills[skill]?.level,
    skillParent:        (game, skill)       => SKILLS[skill]?.parent,
    flagValue:          (game, flag)        => game.flags[flag],


    add:     (game, x, y) => x + y,
    sub:     (game, x, y) => x - y,
    mul:     (game, x, y) => x * y,
    div:     (game, x, y) => x / y,
    min:     (game, x, y) => Math.min(x, y),
    max:     (game, x, y) => Math.max(x, y),
    clamp:   (game, x, min, max) => Math.max(min, Math.min(max, x)),
    ternary: (game, cond, t, f) => cond ? t : f,
};

export const fml = Object.fromEntries(
    Object.entries(definitions).map(([name, fn]) => [name, lift(fn)])
);