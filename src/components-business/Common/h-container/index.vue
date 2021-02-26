<template>
	<div class="widget-part" :style="styles">
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">{{config.config&&config.config.title}}</div>
			<img src="/static/icons/right-icon.svg">
		</section>
		<section class="main"></section>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configValue = this.parseConfigValue(value, customConfig)
		},
	};
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		flex-direction: column;
	}

	.main {
		flex: 1;
		border: 1px solid #00DDFF;
		border-top: none;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		background: url("./img/title-bg.svg") no-repeat;
		background-size: 100% 100%;

		.title-txt {
			font-weight: 600;
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
			margin: 0 8px;
		}
	}
</style>

