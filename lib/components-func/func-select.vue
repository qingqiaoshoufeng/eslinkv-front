<template lang="pug">
    .d-manage-modal-control
        label {{config.label}}
        i-select(v-model="obj[inputKey]")
            i-option(v-for="(k, i) in config.options" :value="k.value" :key="i") {{k.label}}
</template>
<script lang="ts">
import func from './mixins'
import {mixins} from 'vue-class-component'
import {Component} from 'vue-property-decorator'

@Component
export default class FuncSelect extends mixins(func) {
}
</script>
