<template>
	<div class="h-icon-info-desc widget-part fn-flex pos-r" :style="styles">
		<div class="pos-a h-icon-info-bg"></div>
		<div
			class="h-icon-info-desc__icon"
			:style="`background-image: url(${
				config.config && config.config.icon
			})`"
		></div>
		<div class="h-icon-info-desc__text">
			{{ config.config && config.config.desc }}
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import {customConfig, value} from './index.component'

	export default {
		mixins: [mixins],
		created() {

			this.configValue = this.parseConfigValue(value, customConfig)
		},
	}
</script>
<style lang="scss">
	.h-icon-info-desc {
		align-items: center;

		.h-icon-info-bg {
			background: linear-gradient(
					90deg,
					rgba(0, 31, 109, 1) 0%,
					rgba(0, 31, 109, 0) 100%
			);
			width: 100%;
			height: 100%;
			opacity: 0.2;
			top: 0;
			left: 0;
		}

		&__icon {
			width: 32px;
			height: 32px;
			background-color: #064F94;
			background-size: 22px 24px;
			background-repeat: no-repeat;
			background-position: center;
			margin-left: 6px;
		}

		&__text {
			font-size: 20px;
			line-height: 24px;
			color: #FEFFFF;
			margin-left: 10px;
		}
	}
</style>

