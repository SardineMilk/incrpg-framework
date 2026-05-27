
// TODO
// eff.changeCategoryStrength


/*
Conditions, actions and traits apply effects to the game state.
These are represented using the `eff` framework.
`eff.doThing(...args)`
These are then activated using the `applyEffect()` function
by whatever portion of the game loop processes that data.
Every change to the gamestate goes through an effect

Example:
Trait effects are applied once when first gained
Action tick effects and result effects are applied by the tick functions as required
*/
export const eff = {
    grantSkillXp: (skill, baseAmount) => ({
        type: "grantSkillXp",
        skill,
        baseAmount,
    }),

    skillXpMultiplier: (skill, multiplier) => ({
        type: "skillXpMultiplier",
        skill,
        multiplier,
    }),

    changeAttribute: (attribute, flat = 0, multiplier = 0) => ({
        type: "changeAttribute",
        attribute,
        flat,
        multiplier,
    }),

    applyCondition: (condition, duration) => ({
        type: "applyCondition",
        condition,
        duration,
    }),

    changeConditionStrength: (condition, multiplier) => ({
        type: "changeConditionStrength",
        condition,
        multiplier,
    }),

    changeConditionTagStrength: (tag, multiplier) => ({
        type: "changeConditionTagStrength",
        tag,
        multiplier,
    }),

    changeResource: (resource, amount) => ({
        type: "changeResource",
        resource,
        amount,
    }),

    setResource: (resource, amount) => ({
        type: "setResource",
        resource,
        amount,
    }),

    setLocation: (location) => ({
        type: "setLocation",
        location,
    }),

    sendMessage: (category, message) => ({
        type: "sendMessage",
        category,
        message,
    }),

    addEventEffect: (event, effect) => ({
        type: "addEventEffect",
        event,
        effect,
    }),

    setActiveAction: (action) => ({
        type: "setActiveAction",
        action,
    }),

    presentChoice: (options) => ({
      type: "presentChoice",
      options,
    }),
};

/*
If a condition has a trigger, it is not activated during the normal condition step
Instead it is activated whenever the trigger occurs
*/
export const evt = {
  resourceDropsBelowThreshold: (resource, threshold) => ({
    type: "resourceDropsBelowThreshold",
    resource,
    threshold,
  }),

  resourceGain: (resource, min=1) => ({
    type: "resourceGain",
    resource,
    min,
  }),

  resourceLoss: (resource, min=1) => ({
    type: "resourceLoss",
    resource,
    min,
  }),

  gainSkillXp: (skill) => ({
    type: "gainSkillXp",
    skill,
  }),

  locationChanges: (tags = []) => ({
    type: "locationChanges",
    tags,
  }),

  conditionApplied: (condition) => ({
    type: "conditionApplied",
    condition,
  }),

  actionChanges: () => ({
    type: "actionChanges",
  }),

  tick: () => ({
    type: "tick",
  }),
};

/*
Requirements can be used to place static conditions on conditions
i.e. Stat boost condition, no event, requirement resourcePercentLessThan("health", 30)

multiple requirements must all apply: 
[A and B and C]
you can add a nested array of requirements, of which only one must apply:
[[A or B or C] and [X or Y or Z]]

example:
[[hasPickaxe or isStrong] and [locationHasStone or locationHasOre]]

*/
export const req = {
  item: (item) => ({
    type: "item",
    item,
  }),

  locationHasTag: (tag) => ({
    type: "locationHasTag",
    tag,
  }),

  stat: (stat, value) => ({
    type: "stat",
    stat,
    value,
  }),

  // If value is negative, it's treated as `resource.max - value`
  resourceLessThan: (resource, value) => ({
    type: "resourceLessThan",
    resource,
    value,
  }),

  hasCondition: (condition, min_duration=null) => ({
    type: "hasCondition",
    condition,
    min_duration,
  }),

  hasNotCondition: (condition) => ({
    type: "hasCondition",
    condition,
  }),
};
