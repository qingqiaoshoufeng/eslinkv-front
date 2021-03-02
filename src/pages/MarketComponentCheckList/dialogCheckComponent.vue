<template lang="pug">
	i-modal.check-modal(v-model="modalShow" title="审核")
		market-preview(:detail="detail" v-if="modalShow")
		div(slot="footer")
			i-button(type="primary" @click="submit") 通过
			i-button(type="error" @click="cancel") 拒绝
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
	import {Modal, Button,} from 'view-design'
	import MarketPreview from './preview.vue'
	import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	import html2canvas from 'html2canvas'

	@Component({
		components: {
			'i-button': Button,
			'i-modal': Modal,
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
			this.$api.bussiness.checkError({componentId: this.detail.componentId}).then(() => {
				this.modalShow = false
				this.$emit('reload')
			})
		}

		submit() {
			html2canvas(document.getElementsByClassName('widget-part')[0], {
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
			this.$api.bussiness.uploadFile(data).then(res => {
				this.$api.bussiness.checkSuccess({
					componentId: this.detail.componentId,
					componentImage: res.file
				}).then(() => {
					this.modalShow = false
					this.$emit('reload')
				})
			})
		}
	}
</script>
<style lang="scss" scoped>
	.check-modal {
		/deep/ {
			.ivu-modal-body {
				max-height: 500px;
				max-width: 500px;
				overflow-y: auto;
				overflow-x: auto;
			}
		}
	}
</style>
