import '@testing-library/jest-dom'
import Vue from 'vue'
import { render, fireEvent } from '@testing-library/vue'
import Vuetify from 'vuetify'
import DiceRoller from '@/components/utilities/diceRoller.vue'

Vue.use(Vuetify)

const renderWithVuetify = (component, options, callback) => {
    const root = document.createElement('div')
    root.setAttribute('data-app', 'true')

    const result = render(
        component,
        {
            container: document.body.appendChild(root),
            // for Vuetify components that use the $vuetify instance property
            vuetify: new Vuetify(),
            ...options,
        },
        callback
    )
    return result
}

describe('DiceRoller tests', () => {
    it('should have only count diceType, modifier  and roll by default', () => {
        const {
            getByText,
            getByLabelText,
            getByDisplayValue,
            queryByLabelText,
        } = renderWithVuetify(DiceRoller)

        const subTitle = getByText('1d6')
        expect(subTitle).toBeInTheDocument()

        const countText = getByLabelText('Count')
        expect(countText.valueAsNumber).toEqual(1)

        const diceTypeSelect = getByDisplayValue('d6')
        expect(diceTypeSelect.value).toEqual('d6')

        const modText = getByLabelText('Mod')
        expect(modText.valueAsNumber).toEqual(0)

        const rollBtn = getByText('Roll')
        expect(rollBtn).toBeInTheDocument()

        const minText = queryByLabelText('Min')
        expect(minText).toBeNull()

        const maxText = queryByLabelText('Max')
        expect(maxText).toBeNull()
    })
})
