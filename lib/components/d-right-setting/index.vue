<template lang="pug">
	d-right-modal.d-widget-modal(title="编辑器设置" :width="360" icon="ios-easel" :top="144")
		header.fn-flex.flex-row
			span 编辑器设置
		.d-mange-list.d-scrollbar
			.d-manage-modal-control
				label 自动贴靠参考线
				i-switch(v-model="platform.autoAlignGuide")
</template>
<script lang="ts">
	import dRightModal from '../d-right-modal'
	import {Component, Vue} from 'vue-property-decorator'
	import {Icon,Switch} from 'view-design'
	import scene from '../../store/scene.store'
	import platform from '../../store/platform.store'

	@Component({
		components: {
			dRightModal,
			'i-icon': Icon,
			'i-switch': Switch,
		},
	})
	export default class DRightSetting extends Vue {
		scene: any = scene.state
		platform: any = platform.state
	}
</script>
<style lang="scss" scoped>
</style>
