<template lang="pug">
    Modal(v-model="modalShow" title="审核")
        market-preview(:type="detail.componentEnTitle" :version="detail.componentVersion" v-if="detail")
        div(slot="footer")
            Button(type="primary" @click="submit") 通过
            Button(type="error" @click="submit") 拒绝
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    import {Modal,  Button, } from 'view-design'
    import MarketPreview from '../MarketPreview/index.vue'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    @Component({
        components: {
            Button,
            Modal,
            MarketPreview,
        }
    })
    class MarketEditDialog extends Vue {
        @Prop(Boolean) value!: boolean
        @Prop(Object) detail: any
        modalShow = false

        @Watch('value')
        onValueChange(val) {
            this.modalShow = val
        }

        @Watch('modalShow')
        onModalShow(val) {
            this.$emit('input', val)
        }

        submit() {
        }

        created() {
        
        }
    }

    export default MarketEditDialog

</script>
<style lang="scss" scoped>
    .iframe{
        width: 100%;
    }
</style>
