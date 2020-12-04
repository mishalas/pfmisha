// rulesEngine.js

import DiceUtil, { DiceTypes, DiceDescriptor } from './dice/diceUtil'

/**
 * Main class and entry point for the rules engine
 * @property {DiceUtil} diceUtil
 */
class RulesEngine {
    constructor() {
        this.diceUtil = new DiceUtil()
    }
}

export { DiceTypes, DiceDescriptor }
export default new RulesEngine()
