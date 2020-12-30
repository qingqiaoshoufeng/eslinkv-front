<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="s-linshi pos-r">
			<img ref="img" :src="config.config&&config.config.img"/>
			<div class="s-linshi-close pos-a pointer" @click="handleClick"
				 :style="{right:`${config.config&&config.config.left}px`}"></div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getSelect, getInput} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				img: getSelect('img', '图片', ['/static/icons/数据下钻.png', '/static/icons/工商户点位弹窗.png']),
				index: getInput('index', '场景ID'),
				left: getInput('left', '位移'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			img: true,
			index: true,
			left: true,
		}
	}
	const value = {
		config: {
			img: '/static/icons/数据下钻.png',
			index: '',
			left: 0
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			handleClick() {
				window.GoldChart.scene.destroyScene(this.config.config.index)
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		},
	}
</script>
<style lang="scss">
	.s-linshi {
		height: 100%;

		img {
			height: 100%;
		}
	}

	.s-linshi-close {
		right: 0;
		top: 0;
		width: 40px;
		height: 40px;
	}
</style>

