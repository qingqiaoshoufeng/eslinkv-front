<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-logo fn-flex flex-row pointer" @click="handleClick">
			<img src="/static/icons/logo.svg" alt=""/>
			<div class="right-box">
				<h2>杭州燃气数字平台</h2>
				<ul class="fn-flex flex-row">
					<li class="text-left pos-r">云上燃气</li>
					<li class="text-center pos-r">智慧能源</li>
					<li class="text-right pos-r">增值服务</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart from '../../../openApi'

	const config = {animation: true}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config)
		},
		methods: {
			handleClick() {
				location.reload()
			}
		}
	}
</script>
<style lang="scss">
	.h-logo {
		h2 {
			font-size: 48px;
			line-height: 48px;
			background-image: -webkit-linear-gradient(rgba(255, 255, 255, 1), rgba(102, 227, 253, 1));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-weight: normal;
			letter-spacing: 21px;
			white-space: nowrap;
		}

		img {
			width: 48px;
			height: 92px;
			margin-right: 16px;
		}

		ul {
			margin-top: 14px;
			width: 528px;
		}

		li {
			color: #fff;
			font-size: 20px;
			line-height: 24px;
			letter-spacing: 11px;
			flex: 1;

			&:nth-child(1) {
				&:before {
					content: '';
					width: 4px;
					height: 4px;
					position: absolute;
					background-color: rgba(255, 255, 255, 0.6);
					left: 50%;
					margin-left: 68px;
					top: 50%;
					margin-top: -2px;
				}
			}

			&:nth-child(2) {
				&:before {
					content: '';
					width: 4px;
					height: 4px;
					position: absolute;
					left: 50%;
					margin-left: 98px;
					top: 50%;
					margin-top: -2px;
					background-color: rgba(255, 255, 255, 0.6);
				}
			}

			&:nth-child(3) {
				right: -8px;
			}
		}
	}

</style>

