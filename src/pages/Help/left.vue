<template lang="pug">
    Menu.fn-fl.help-left(:open-names="['1']" @on-select="handleSelect")
        Submenu(name="1")
            template(slot="title") 组件市场
            MenuItem(name="HowToUseMarket") 如何开发
            MenuItem(name="HowToPutMarket") 如何上架
            MenuItem(name="HowToLoadMarket") 如何加载
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Menu, Submenu, MenuItem} from 'view-design'

    @Component({
        components: {
            Menu,
            Submenu,
            MenuItem,
        }
    })

    class Left extends Vue {
        handleSelect(name) {
            const currentHash = decodeURIComponent(location.hash.replace('#', ''));
            const nowHash = `/help/${name}`
            if (encodeURIComponent(currentHash.replace(/\s+/g, '')) !== encodeURIComponent(nowHash.replace(/\s+/g, ''))) {
                this.$router.push(nowHash)
                window.scrollTo(0, 0)
            }
        }
    }

    export default Left
</script>
<style lang="scss">
    .vf-help-left {
        height: calc(100vh - 120px);
        overflow: auto;
    }
</style>