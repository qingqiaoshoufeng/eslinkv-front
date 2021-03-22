<template lang="pug">
	i-modal.check-modal(v-model="modalShow" title="审核")
		d-view(v-if="modalShow")
		div(slot="footer")
			i-button(type="primary" @click="submit") 通过
			i-button(type="error" @click="cancel") 拒绝
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
	import {Modal, Button,} from 'view-design'
	import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	import html2canvas from 'html2canvas'
	import dView from 'eslinkv-npm/src/components/d-view/index.vue'
	
	@Component({
		components: {
			'i-button': Button,
			'i-modal': Modal,
			dView,
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
			this.$api.marketComponent.checkError({componentId: this.detail.componentId}).then(() => {
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
			data.append('library', 'componentSnapshot')
			this.$api.upload.uploadFile(data).then(res => {
				this.$api.marketComponent.checkSuccess({
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
				max-width: 500px;
				max-height: 500px;
				overflow-x: auto;
				overflow-y: auto;
			}
		}
	}
</style>
