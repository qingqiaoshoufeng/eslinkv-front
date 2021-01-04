<template>
	<div class="widget-part" :style="styles" v-if="data">
		<img :src="config.config&&config.config.img" alt="">
		<div class="desc">{{ config.config&&config.config.desc }}</div>
		<div class="num font-num">{{ data.value | toThousand }}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import { config, configSource, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;
		padding: 0 18px;
		background: url("./img/bg.svg");
		background-size: 100% 100%;

		.num {
			font-weight: bold;
			font-size: 48px;
			line-height: 48px;
			text-align: right;
			color: #FFFFFF;
		}

		.desc {
			font-size: 24px;
			line-height: 24px;
			color: #00DDFF;
			margin-left: 6px;
			flex: 1;
			text-align: left;
		}
	}
</style>

