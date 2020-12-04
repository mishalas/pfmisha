// diceUtils.spec.js

import DiceUtil from '~/assets/js/rulesEngine/dice/diceUtil'

const diceUtil = new DiceUtil()

describe('DiceUtil tests', () => {
    it('Validates good dice roll request parameters', () => {
        expect(diceUtil.isValidRollRequest(1, 1, 8, 2)).toBeTruthy()
    })

    it('Invalidates missing "count" parameter', () => {
        expect(diceUtil.isValidRollRequest(null, 1, 8, 2)).toBeFalsy()
    })

    it('Invalidates missing "min" parameter', () => {
        expect(diceUtil.isValidRollRequest(1, null, 8, 2)).toBeFalsy()
    })
})
