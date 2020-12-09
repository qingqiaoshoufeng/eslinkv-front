<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-5">
			<p class="pos-r text-left">{{data&&data.title}}工艺图</p>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const config = {
		animation: true,
	}

	const value = {
		api: {
			data:JSON.stringify({
				title: '标题'
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
	.h-title-5 {

		p {
			font-weight: 600;
			font-size: 32px;
			line-height: 32px;
			color: #fff;
			padding-bottom: 16px;
			border-bottom: 2px solid rgba(255, 255, 255, 0.4);

			&:before, &:after {
				position: absolute;
				content: '';
				width: 48px;
				height: 2px;
				background: #00DDFF;
				bottom: 0;
			}

			&:before {
				left: 0;
			}

			&:after {
				right: 0;
			}
		}
	}

</style>

