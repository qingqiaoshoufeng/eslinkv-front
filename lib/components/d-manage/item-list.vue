<template lang="pug">
    div.d-mange-list.d-scrollbar
        DManageItem(:config="child" v-for="(child, i) in list" :key="i")
</template>
<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'
    import DManageItem from './item'

    @Component({components: {DManageItem}})
    export default class DManageItemList extends Vue {
        @Prop(Array) list: any[]
    }
</script>

<style lang="scss" scoped>
    .d-mange-list {
        overflow: auto;
        height: calc(100% - 40px);
    }
</style>
