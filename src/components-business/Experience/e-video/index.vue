<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="wrapper">
			<video
				class="video"
				:src="data.video"
				autoplay="autoplay"
				muted="muted"
				loop
			></video>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configValue = this.parseConfigValue(value)
		},
	}
</script>
<style lang="scss" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		text-align: left;
		background: url("./img/bg.png") no-repeat;
		background-size: 100% 100%;
		padding-top: 61px;
		padding-left: 435px;

		.video {
			width: 1104px;
			height: 676px;
		}
	}
</style>

