src
- main.js: Start game, tick, render
- game
    - state: current game state. dynamic. Stores skill xp, action completions, current effects
    - tick: every tick, processes the current action. If finished, applies the results
    - requirements: given an action, check if player meets requirements
    - results: given a result of action, apply results to game state
    - skills: handles granting skill xp
- data: game is data driven. Everything is declared in data files, as little hardcoded as possible
    - actions: stores actions, requirements, results
    - locations: stores locations, tags, ambient effects
    - skills: stores skills, parents. TODO milestones 
    - effects: stores temporary effects, durations
    - traits: stores permanent player traits. Granted by skill milestones, quests
- ui
    - render: call all other ui functions
    