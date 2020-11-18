<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-linshi2 pos-r">
			<img ref="img" class="pos-a" :src="config.config&&config.config.img"/>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getSelect, getInput} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				img: getSelect('img', '图片', ['/static/icons/右侧.png', '/static/icons/左侧.png']),
				transform: getInput('transform', '旋转角度'),
				left: getInput('left', '位移'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			img: true,
			transform: true,
			left: true,
		}
	}
	const value = {
		config: {
			img: '/static/icons/右侧.png',
			transform: 149,
			left: -50,
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		},
		mounted() {
			setTimeout(()=>{
				this.$refs.img.style.transform=`perspective(763px) rotateY(${this.config.config.transform}deg)`
				this.$refs.img.style.right=`${this.config.config.left}px`
			},1500)
		}
	}
</script>
<style lang="scss">
	.h-linshi2 {
		height: 100%;

		img {
			height: 100%;
			transform: rotateY(180deg);
			right: 0;
			transition: all .5s;
			top: 40px;
		}
	}
</style>

