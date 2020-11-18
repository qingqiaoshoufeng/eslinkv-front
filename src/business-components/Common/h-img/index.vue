<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-img">
			<img :src="config.config&&config.config.img" alt=""/>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getSelect} from '../../../../lib'

	const configSource = {
		config: {
			fields: {
				img: getSelect('img', '图片', ['/static/mock/test1.png', '/static/mock/test2.png', '/static/mock/test3.png']),
			}
		}
	}

	const config = {
		animation: true,
		config: {
			img: true
		}
	}

	const value = {
		config: {
			img: '/static/mock/test1.png'
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
<style lang="scss" scoped>
	.h-img {
		height: 100%;
		width: 100%;

		img {
			width: 100%;
			height: 100%;
		}
	}

</style>

