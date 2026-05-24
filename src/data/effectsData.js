// Consolidate conditions / traits / event effect files
// These are all the same structure, but are seperated for ease of use

import { CONDITIONS } from "./conditionsData.js";
import { TRAITS } from "./traitsData.js";
import { EVENT_EFFECTS } from "./eventData.js";

// TODO come up with a better name for this
export const EFFECTS = Object.assign({}, CONDITIONS, TRAITS, EVENT_EFFECTS);