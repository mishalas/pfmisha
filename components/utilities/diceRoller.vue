<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title class="card-title-tight"
                    >Dice Roller</v-card-title
                >
                <v-card-subtitle>{{ diceRequestDisplay }}</v-card-subtitle>
                <v-card-actions>
                    <v-text-field
                        v-model="count"
                        label="Count"
                        type="number"
                        min="1"
                        class="short-number-input"
                    ></v-text-field>
                    <v-select
                        v-model="diceType"
                        label="Type"
                        :items="diceTypes"
                        class="dice-type-select"
                        @input="onDiceTypeChange"
                    >
                    </v-select>
                    <v-text-field
                        v-model="min"
                        label="Min"
                        type="number"
                        min="0"
                        :disabled="diceType !== 'd?'"
                        class="short-number-input"
                    ></v-text-field>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import rulesEngine from '~/assets/js/rulesEngine/rulesEngine'
export default {
    data() {
        return {
            count: 1,
            diceTypes: Object.entries(rulesEngine.diceUtil.diceType).map(
                ([key, value]) => {
                    return { text: key, value }
                }
            ),
            diceType: 'd?',
            min: 0,
            max: 0,
            mod: 0,
        }
    },
    computed: {
        diceRequestDisplay() {
            return rulesEngine.diceUtil.getDiceDisplayText(
                this.count,
                this.min,
                this.max,
                this.mod
            )
        },
    },
    methods: {
        onDiceTypeChange() {
            switch (this.diceType) {
                case rulesEngine.diceUtil.diceType.d4:
                    this.min = 1
                    this.max = 4
                    break
            }
        },
    },
}
</script>

<style>
.card-title-tight {
    padding: 5px;
}
.short-number-input {
    max-width: 50px;
    margin: 2px;
}
.dice-type-select {
    max-width: 60px;
    margin: 2px;
}
</style>
