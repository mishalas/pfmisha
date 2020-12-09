<!--- utilities.vue --->

<template>
    <v-row>
        <v-col class="utility-col">
            <dice-roller></dice-roller>
        </v-col>
        <v-col></v-col>
        <v-col></v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>

<style lang="css">
.utility-col {
    background-color: darkcyan;
}

.utility-card-title {
    background-color: darkslategray;
}

.utility-card-subtitle {
    background-color: darkslategray;
}

.utility-card-actions {
    background-color: black;
}
</style>
