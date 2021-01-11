<template lang="pug">
    Menu.fn-fl.help-left(:open-names="['1']" @on-select="handleSelect" :active-name="leftName")
        Submenu(name="1")
            template(slot="title") 组件市场
            MenuItem(name="componentList") 组件列表
            MenuItem(name="componentCheckList") 组件审核
            MenuItem(name="typeList") 分类列表
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
        leftName: string = ''

        handleSelect(name) {
            const currentHash = decodeURIComponent(location.hash.replace('#', ''));
            const nowHash = `/market/${name}`
            if (encodeURIComponent(currentHash.replace(/\s+/g, '')) !== encodeURIComponent(nowHash.replace(/\s+/g, ''))) {
                this.$router.push(nowHash)
                this.leftName = name
                window.scrollTo(0, 0)
            }
        }

        mounted() {
            let {name} = this.$route.params
            this.leftName = name
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