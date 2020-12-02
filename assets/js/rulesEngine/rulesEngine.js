// rulesEngine.js

import DiceUtil from './dice/diceUtil'

/**
 * Main class and entry point for the rules engine
 * @property {DiceUtil} diceUtil
 */
class RulesEngine {
  constructor() {
    this.diceUtil = new DiceUtil()
  }
}

export default new RulesEngine()
