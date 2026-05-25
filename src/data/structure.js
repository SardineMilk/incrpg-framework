

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

    changeAttribute: (stat, flat = 0, multiplier = 0) => ({
        type: "changeAttribute",
        stat,
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
