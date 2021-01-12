<template lang="pug">
    Modal(v-model="modalShow" title="审核")
        market-preview(:type="detail.componentEnTitle" :version="detail.componentVersion" v-if="modalShow")
        div(slot="footer")
            Button(type="primary" @click="submit") 通过
            Button(type="error" @click="cancel") 拒绝
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    import {Modal, Button,} from 'view-design'
    import MarketPreview from '../MarketPreview/index.vue'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import html2canvas from 'html2canvas'
    import {uploadFile, checkSuccess, checkError} from '@/api/bussiness.api'

    @Component({
        components: {
            Button,
            Modal,
            MarketPreview,
        }
    })
    export default class MarketEditDialog extends Vue {
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

        cancel() {
            checkError({componentId: this.detail.componentId}).then(() => {
                this.modalShow = false
                this.$emit('reload')
            })
        }

        submit() {
            html2canvas(document.getElementById('example'), {
                allowTaint: true,
                scale: 1,
                useCORS: true,
            }).then(canvas => {
                canvas.toBlob(blob => {
                    this.upload(blob)
                }, 'image/jpeg', 0.9)
            })
        }

        upload(blob) {
            const name = `${+new Date()}.jpg`
            const data = new FormData()
            data.append('file', blob, name)
            uploadFile(data).then(res => {
                checkSuccess({componentId: this.detail.componentId, componentImage: res.file}).then(() => {
                    this.modalShow = false
                    this.$emit('reload')
                })
            })
        }

        created() {

        }
    }
</script>
<style lang="scss" scoped>
    .iframe {
        width: 100%;
    }
</style>
