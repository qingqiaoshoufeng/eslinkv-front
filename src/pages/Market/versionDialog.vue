<template lang="pug">
	Modal(v-model="modalShow" title="切换版本")
		Select(v-model="version")
			Option(:value="k.componentVersion" v-for="(k, i) in versionList" :key="i") {{ k.componentVersion }}
		div(slot="footer")
			Button(type="primary" @click="submit") 确定
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {Modal, Select, Option, Button} from 'view-design'
import {getVersionList, changeComponentVersion} from '@/api/bussiness.api'

@Component({
	components: {
		Button,
		Modal,
		Select,
		Option
	}
})
class MarketVersionDialog extends Vue {
	@Prop(Boolean) value!: boolean
	@Prop(Object) detail: any
	modalShow = false
	version: string = ''
	versionList: any[] = []

	@Watch('value')
	onValueChange(val) {
		this.modalShow = val
	}

	@Watch('modalShow')
	onModalShow(val) {
		this.$emit('input', val)
	}

	@Watch('detail')
	onDetailShow(val) {
		getVersionList({ componentEnTitle: val.componentEnTitle }).then(r => {
			this.versionList = r
		})
	}

	async submit() {
		await changeComponentVersion({
			componentEnTitle: this.detail.componentEnTitle,
			componentVersion: this.version
		})
		this.modalShow = false
		this.$Message.success('操作成功')
		this.$emit('reload')
	}
}

export default MarketVersionDialog

</script>
<style lang="scss" scoped>
</style>
