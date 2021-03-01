<template>
    <div>
        <div class="fn-clear">
            <left/>
            <div class="market-content">
                <component :is="currentComponent"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Left from './left.vue'
    import {Component, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {
            Left
        }
    })
    export default class Market extends Vue {
        currentComponent: any = null

        @Watch('$route')
        handleRouter() {
            this.init()
        }

        init() {
            let {name} = this.$route.params
            name = name.replace(/%20/g, '')
            this.currentComponent = () => import(`./${name}.vue`)
        }

        mounted() {
            this.init()
        }
    }
</script>
<style lang="scss">
    .market-content {
        margin-left: 240px;
        height: calc(100vh);
        padding: 40px 80px;
        overflow-y: auto;
        
        code {
            word-break: break-all;
            white-space: pre-wrap;
        }
    }
</style>
