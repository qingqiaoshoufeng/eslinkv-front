<template lang="pug">
	.d-manage-modal-control-size
		.fn-flex.flex-row.d-manage-modal-control-3
			.d-manage-modal-control
				label 宽度
				i-inputNumber(:min="1" :step="1" v-model="platform.panelConfig.size.width")
			.d-manage-modal-control
				label 高度
				i-inputNumber(:min="1" :step="1" v-model="platform.panelConfig.size.height")
			.d-manage-modal-control
				label 单位
				i-select(v-model="platform.panelConfig.size.unit")
					i-option(value="px") px
					i-option(value="%") %
					i-option(value="vw/vh") vw/vh
		.d-manage-modal-control
			label 常规尺寸
			i-select(@on-change="sizeChange")
				i-option(value="1920×1080") 1920×1080
				i-option(value="1600×900") 1600×900
				i-option(value="1366×768") 1366×768
				i-option(value="1080×1920") 1080×1920
				i-option(value="2560×1600") 2560×1600
		.fn-flex.flex-row.d-manage-modal-control-3
			.d-manage-modal-control
				label 移动看板
				i-switch(v-model="platform.panelConfig.size.isMobileKanboard")
			.d-manage-modal-control(v-if="platform.panelConfig.size.isMobileKanboard")
				label 设备类型
				i-select(v-model="platform.panelConfig.size.deviceType")
					i-option(value="mobile") 手机
					i-option(value="pad") 平板
			.d-manage-modal-control(v-if="platform.panelConfig.size.isMobileKanboard")
				label 布局模式
				i-select(v-model="platform.panelConfig.size.layoutMode")
					i-option(value="full-size") 充满页面
					i-option(value="full-width") 100%宽度
					i-option(value="full-height") 100%高度
</template>
<script lang="ts">
	import func from './mixins'
	import {mixins} from 'vue-class-component'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncSizePanel extends mixins(func) {
		sizeChange(value) {
			if (value === undefined) return
			if (value) {
				const [width, height] = value.split('×')
				if (width !== 'null') this.platform.panelConfig.size.width = +width
				if (height !== 'null') this.platform.panelConfig.size.height = +height
			} else {
				this.platform.panelConfig.size.width = 1920
				this.platform.panelConfig.size.height = 1080
			}
		}
	}
</script>
<style lang="scss" scoped>
	.d-manage-modal-control-size {
		margin-bottom: 10px;
	}

	.d-manage-modal-control-3 {
		.d-manage-modal-control {
			flex: 1;
			&:nth-child(3) {
				margin-left: 10px;
			}
		}
	}
</style>
