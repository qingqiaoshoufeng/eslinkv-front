<template lang="pug">
    #example.text-center
        component(:is="currentComponent")
</template>
<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator'

    @Component
    export default class MarketPreview extends Vue {
        @Prop(String) type: string
        @Prop(String) version: string
        ready: boolean = false

        get currentComponent() {
            if (this.ready) {
                return `market-${this.type}-${this.version}`
            }
            return null
        }

        mounted() {
            if (window.GoldChart.components[`${this.type}-${this.version}`]) {
                this.ready = true
            } else {
                this.$sysApi.bussiness.detailMarket({
                    componentEnTitle: this.type,
                    componentVersion: this.version
                }).then(res => {
                    let script = document.createElement('script')
                    script.onload = () => {
                        Vue.component(
                            `market-${res.componentEnTitle}-${this.version}`,
                            window.GoldChart.components[`${res.componentEnTitle}-${this.version}`].component)
                        this.ready = true
                    }
                    script.src = res.componentJsUrl
                    document.head.appendChild(script)
                })
            }
        }
    }
</script>