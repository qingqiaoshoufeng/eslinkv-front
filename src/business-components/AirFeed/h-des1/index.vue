<template>
	<div class="widget-part" :style="styles">
		<div class="h-des-1 fn-flex flex-row">
			<div class="fn-flex">
				<img :src="config.config&&config.config.img" alt=""/>
			</div>
			<p class="pos-r text-left">{{config.config&&config.config.title}}</p>
			<h2>{{data&&data.value}}</h2>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput, getSelect} from "@lib"

	const config = {
		animation: true,
		config: {
			title: true, img: true
		}
	}

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
				img: getSelect('img', '图形', ['/static/icons/h-des1-1.svg', '/static/icons/h-des1-2.svg', '/static/icons/h-des1-3.svg']),
			}
		},
	}

	const value = {
		api: {
			data: JSON.stringify({
				value: 73
			}),
		},
		config: {
			title: '巡检点数(点)',
			img: '/static/icons/h-des1-1.svg'
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.h-des-1 {
		background: linear-gradient(90deg, rgba(0, 87, 169, 0.5) 0%, rgba(0, 87, 169, 0) 100%);
		height: 100%;
		align-items: center;

		> div {
			width: 56px;
			height: 56px;
			justify-content: center;
			align-items: center;
			margin-right: 16px;
		}

		p {
			font-size: 20px;
			line-height: 24px;
			color: #fff;
		}

		h2 {
			font-size: 24px;
			line-height: 24px;
			text-align: right;
			color: #FFFFFF;
			margin-left: auto;
			margin-right: 8px;
		}
	}

</style>

