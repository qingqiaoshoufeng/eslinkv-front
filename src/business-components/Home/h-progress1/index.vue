<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-progress-1">
			<div class="fn-flex flex-column">
				<h2>{{data&&data.title}}</h2>
				<h3>{{data&&data.subTitle}}</h3>
			</div>
			<p class="font-num">{{data&&data.value}}%</p>
			<div class="pos-a h-progress-1-ratio">
				<i class="pos-a" :style="{width:`${data&&data.value}%`}"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				title: '标题', subTitle: '副标题', value: 10
			})
		}
	}

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.h-progress-1-ratio {
		height: 4px;
		background: rgba(255, 255, 255, 0.3);
		left: 0;
		bottom: 0;
		width: 100%;

		i {
			height: 4px;
			top: 0;
			left: 0;


			&:before {
				content: '';
				position: absolute;
				width: 100%;
				height: 4px;
				top: 0;
				left: 0;
				background: linear-gradient(270deg, #00DDFF 1.23%, rgba(0, 221, 255, 0.2) 100%);
			}
		}
	}

	.h-progress-1 {
		padding-bottom: 8px;

		h2, h3 {
			font-size: 18px;
			color: rgba(255, 255, 255, 0.75);
			font-weight: normal;
			line-height: 18px;
			text-align: left;
			word-wrap: break-word;
			white-space: nowrap;
		}

		h3 {
			margin-top: 12px;
		}

		p {
			color: #fff;
			font-weight: bold;
			font-size: 48px;
			line-height: 48px;
			margin-left: auto;
		}
	}

</style>

