
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
  /* Gives an amount of xp to the specified skill, multiplied by its xpMultiplier */
  grantSkillXp: (skill, amount) => ({
    type: "grantSkillXp",
    skill,
    amount,
  }),

  /* Increase the xp multiplier for a skill by a flat amount */
  skillXpMultiplier: (skill, amount) => ({
    type: "skillXpMultiplier",
    skill,
    amount,
  }),

  skillLevelBonus: (skill, flat = 0, multiplier = 0) => ({
    type: "skillLevelBonus",
    skill,
    flat,
    multiplier,
  }),

  /* Apply a condition for an optional duration. If no duration is specified, the condition is permanent */
  applyCondition: (condition, amount=null) => ({
    type: "applyCondition",
    condition,
    amount,
  }),

  /* Increase the strength of a condition by amount */
  changeConditionStrength: (condition, amount) => ({
    type: "changeConditionStrength",
    condition,
    amount,
  }),

  /* Increase the strength of all conditions with tag by amount */
  changeConditionTagStrength: (tag, amount) => ({
    type: "changeConditionTagStrength",
    tag,
    amount,
  }),

  /* Change the current value of a resource (health, stamina, mental) by amount. Can be negative */
  changeResource: (resource, amount) => ({
    type: "changeResource",
    resource,
    amount,
  }),

  /* Set the current value of a resource to amount */
  setResource: (resource, amount) => ({
    type: "setResource",
    resource,
    amount,
  }),

  /* Set the current player location */
  setLocation: (location) => ({
    type: "setLocation",
    location,
  }),

  /* Send a log message. Category is used by the player to filter log */
  sendMessage: (category, message) => ({
    type: "sendMessage",
    category,
    message,
  }),

  /* Set the active action of the player */
  setActiveAction: (action) => ({
    type: "setActiveAction",
    action,
  }),

  /* Present a choice to the player, replacing their action ui until one is picked. Options are basically lambda actions */
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

  /* Min requirement for strength, woodworking, etc */
  skillMoreThan: (skill, value) => ({
    type: "skillMoreThan",
    skill,
    value,
  }),

  /* Base without any level modifiers added */
  skillBaseMoreThan: (skill, value) => ({
    type: "skillBaseMoreThan",
    skill,
    value,
  }),

  // If value is negative, it's treated as `resource.max - value`
  resourceLessThan: (resource, value) => ({
    type: "resourceLessThan",
    resource,
    value,
  }),

  /* Is this condition currently active, with an optional minimum duration */
  hasCondition: (condition, min_duration=null) => ({
    type: "hasCondition",
    condition,
    min_duration,
  }),

  /* Does the player not have this condition */
  hasNotCondition: (condition) => ({
    type: "hasCondition",
    condition,
  }),
};
