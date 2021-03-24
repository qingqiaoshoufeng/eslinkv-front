<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-logo2 fn-flex flex-row pointer" @click="handleClick">
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
	import { widgetMixin } from 'eslinkv-npm'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value)
		},
		methods: {
			handleClick () {
				location.reload()
			}
		}
	}
</script>
<style lang="scss">
	.h-logo2 {
		h2 {
			font-size: 48px;
			font-weight: normal;
			line-height: 48px;
			white-space: nowrap;
			background-image: -webkit-linear-gradient(rgba(255, 255, 255, 1), rgba(102, 227, 253, 1));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		img {
			width: 48px;
			height: 92px;
			margin-right: 16px;
		}

		ul {
			width: 384px;
			margin-top: 14px;
		}

		li {
			flex: 1;
			font-size: 20px;
			line-height: 24px;
			color: #fff;

			&:nth-child(1) {
				&::before {
					position: absolute;
					top: 50%;
					left: 50%;
					width: 4px;
					height: 4px;
					margin-top: -2px;
					margin-left: 48px;
					content: '';
					background-color: rgba(255, 255, 255, 0.6);
				}
			}

			&:nth-child(2) {
				&::before {
					position: absolute;
					top: 50%;
					left: 50%;
					width: 4px;
					height: 4px;
					margin-top: -2px;
					margin-left: 78px;
					content: '';
					background-color: rgba(255, 255, 255, 0.6);
				}
			}

			&:nth-child(3) {
				right: 0;
			}
		}
	}

</style>

