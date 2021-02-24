<template lang="pug">
	.widget-part(:style="styles")
		.fn-flex.flex-row.h-title-1
			.h-title-1-icon
			h2(@click="handleClick") {{data&&data.title}}
</template>
<script lang="ts">
	import mx from '../../mixins'
	import {Component} from 'vue-property-decorator'
	import {mixins} from 'vue-class-component'
	import {value} from './index.component'
	import scene from '../../../../lib/store/scene.store'

	@Component
	export default class extends mixins(mx) {

		handleClick() {
			scene.actions.createSceneInstance(this.data.scene)
		}

		created() {
			setTimeout(() => {
				this.configValue = this.parseConfigValue(value)
			}, 1000)
		}
	}
</script>
<style lang="scss">
	.h-title-1-icon {
		background-image: url('/static/icons/h-title1-1.svg');
		height: 34px;
		width: 34px;
		margin-right: 9px;
	}

	.h-title-1 {
		align-items: center;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);

		h2 {
			font-weight: 600;
			font-size: 24px;
			color: #fff;
		}
	}

</style>

