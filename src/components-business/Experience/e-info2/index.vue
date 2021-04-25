<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="title">
			<div class="color"></div>
			<span>线路总览</span>
		</div>
		<div class="main">
			<img :src="data.map" class="map" />
			<div class="content" v-html="data.content"></div>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	background: url('./img/dikuang.svg') no-repeat;
	background-size: 100% 100%;

	.title {
		display: flex;
		align-items: center;
		height: 48px;
		padding-left: 16px;
		font-size: 24px;
		font-weight: 500;
		color: #fff;

		.color {
			width: 6px;
			height: 28px;
			margin-right: 8px;
			background: #0df;
			transform: skewY(30deg);
		}
	}

	.main {
		padding: 16px;

		.content {
			margin-top: 32px;
			font-size: 18px;
			line-height: 25px;
			color: #fff;
			text-align: left;
		}
	}
}
</style>
