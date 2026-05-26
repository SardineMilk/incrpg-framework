
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

    changeResource: (resource, amount) => ({
        type: "changeResource",
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
};

/*
Events are triggered by effects
The effect triggers all events of that category, 
then the specific requirements of that condition are checked
i.e. changeResource("health", 10) checks all resourceChanges, then only triggers positive change events
*/
export const evt = {
  resourceDropsBelowThreshold: (resource, threshold) => ({
    type: "resourceDropsBelowThreshold",
    resource,
    threshold,
  }),

  resourceChanges: (resource) => ({
    type: "resourceChanges",
    resource,
  }),

  locationChanges: (location) => ({
    type: "locationChanges",
    location,
  }),

  attributeReachesThreshold: (attribute, threshold) => ({
    type: "attributeReachesThreshold",
    attribute,
    threshold,
  }),

  conditionApplied: (condition) => ({
    type: "conditionApplied",
    condition,
  }),

  tick: () => ({
    type: "tick",
  })
};

/*
Requirements can be used to place static conditions on conditions
i.e. Stat boost condition, no event, requirement resourcePercentLessThan("health", 30)
*/
export const req = {
  item: (item) => ({
    type: "item",
    item,
  }),

  location: (location) => ({
    type: "location",
    location,
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
};
