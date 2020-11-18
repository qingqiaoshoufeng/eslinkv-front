<template>
	<div class="widget-part pos-r h-linshi" :style="styles">
		<img :src="config.config&&config.config.img"/>
		<div class="pos-a h-line-1-title">{{config.config&&config.config.title}}</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getSelect} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				img: getSelect('img', '图片', ['/static/icons/优家.png', '/static/icons/体验.png', '/static/icons/供气.png', '/static/icons/服务.png']),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			img: true,
		}
	}
	const value = {
		config: {
			img: '/static/icons/优家.png'
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
	.h-linshi {
		img{
			height: 100%;
		}
	}
</style>

