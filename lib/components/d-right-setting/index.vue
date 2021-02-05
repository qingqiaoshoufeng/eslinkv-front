<template lang="pug">
	d-right-modal.d-setting-modal(title="编辑器设置" :width="360" icon="ios-construct" :top="144")
		header.fn-flex.flex-row
			span 编辑器设置
		ul.d-scrollbar
			li.fn-flex.flex-row
				label 自动贴靠参考线
				i-switch(v-model="platform.autoAlignGuide")
			li.fn-flex.flex-row
				label 标尺可见
				i-switch(v-model="platform.ruler.rulerVisible")
</template>
<script lang="ts">
	import dRightModal from '../d-right-modal'
	import {Component, Vue} from 'vue-property-decorator'
	import {Icon, Switch} from 'view-design'
	import platform from '../../store/platform.store'

	@Component({
		components: {
			dRightModal,
			'i-icon': Icon,
			'i-switch': Switch,
		},
	})
	export default class DRightSetting extends Vue {

		platform: any = platform.state
	}
</script>
<style lang="scss" scoped>
	@import "../../../src/scss/conf";

	.d-setting-modal {
		header {
			width: 100%;
			height: 42px;
			line-height: 42px;
			font-weight: bold;
			font-size: 14px;
			flex: 0 0 auto;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $borderColor;
		}

		li {
			margin-top: 10px;

			label {
				margin-right: auto;
				font-size: 14px;
			}
		}
	}

</style>
