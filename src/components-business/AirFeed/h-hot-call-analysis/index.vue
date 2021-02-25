<template>
	<div class="widget-part" :style="styles">
		<div class="h-hot-call-analysis">
			<h2 class="text-left">坐席使用情况</h2>
			<div class="h-hot-call-analysis-content fn-flex flex-row">
				<div class="h-hot-call-analysis-call-block"></div>
				<div class="h-hot-call-analysis-call-title">忙碌</div>
				<div class="h-hot-call-analysis-call-num font-num">{{data&&data.onBusy}}</div>
				<div class="h-hot-call-analysis-free-block"></div>
				<div class="h-hot-call-analysis-free-title">空闲</div>
				<div class="h-hot-call-analysis-free-num">{{data&&data.onFree}}</div>
			</div>
			<div class="h-hot-call-analysis-progress pos-r">
				<div class="h-hot-call-analysis-progress-left pos-a" :style="{width:ratio1}"></div>
				<div class="h-hot-call-analysis-progress-right pos-a" :style="{width:ratio2}"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		computed: {
			ratio1() {
				if (this.data) {
					const ratio = this.data.onBusy / (Number(this.data.onBusy) + Number(this.data.onFree)) * 100
					if (ratio < 3)
						return `calc(3% - 2px)`
					if (ratio > 97)
						return `calc(97% - 2px)`
					return `calc(${ratio}% - 2px)`
				}
				return `3%`
			},
			ratio2() {
				if (this.data) {
					const ratio = this.data.onFree / (Number(this.data.onBusy) + Number(this.data.onFree)) * 100
					if (ratio < 3)
						return `calc(3% - 2px)`
					if (ratio > 97)
						return `calc(97% - 2px)`
					return `calc(${ratio}% - 2px)`
				}
				return `3%`
			}
		},
		created() {
			this.configValue = this.parseConfigValue(value)
		},
	}
</script>
<style lang="scss">
	.h-hot-call-analysis-progress {
		width: calc(100% - 24px);
		height: 16px;
		margin: 12px;
	}

	.h-hot-call-analysis-progress-right {
		border: 1px solid #00FFCF;
		background: #001A77;
		height: 16px;
		right: 0;
	}

	.h-hot-call-analysis-progress-left {
		height: 16px;
		background: #00DDFF;
		left: 0;
	}

	.h-hot-call-analysis {
		height: 100%;
		background: rgba(0, 87, 169, 0.3);

		h2 {
			padding: 15px 12px 28px 12px;
			font-weight: 600;
			font-size: 20px;
			line-height: 24px;
			color: #FFFFFF;
		}
	}

	.h-hot-call-analysis-content {
		align-items: center;
	}

	.h-hot-call-analysis-call-block {
		width: 12px;
		height: 12px;
		background: #00DDFF;
		margin-right: 4px;
		margin-left: 12px;
	}

	.h-hot-call-analysis-call-title {
		font-size: 18px;
		line-height: 24px;
		color: #fff;
		margin-right: 16px;
	}

	.h-hot-call-analysis-call-num {
		font-size: 24px;
		line-height: 24px;
		color: #FFFFFF;
	}

	.h-hot-call-analysis-free-block {
		margin-left: auto;
		width: 12px;
		height: 12px;
		border: 1px solid #00FFCF;
		background: #001A77;
	}

	.h-hot-call-analysis-free-title {
		font-size: 18px;
		line-height: 24px;
		color: #fff;
		margin-left: 4px;
		margin-right: 16px;
	}

	.h-hot-call-analysis-free-num {
		font-size: 24px;
		line-height: 24px;
		color: #FFFFFF;
		margin-right: 16px;
	}
</style>

