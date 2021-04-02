<template>
	<div class="widget-part" :style="styles">
		<div class="h-hot-call-analysis">
			<h2 class="text-left">坐席使用情况</h2>
			<div class="h-hot-call-analysis-content fn-flex flex-row">
				<div class="h-hot-call-analysis-call-block"></div>
				<div class="h-hot-call-analysis-call-title">忙碌</div>
				<div class="h-hot-call-analysis-call-num font-num">
					{{ data && data.onBusy }}
				</div>
				<div class="h-hot-call-analysis-free-block"></div>
				<div class="h-hot-call-analysis-free-title">空闲</div>
				<div class="h-hot-call-analysis-free-num">
					{{ data && data.onFree }}
				</div>
			</div>
			<div class="h-hot-call-analysis-progress pos-r">
				<div
					class="h-hot-call-analysis-progress-left pos-a"
					:style="{ width: ratio1 }"
				></div>
				<div
					class="h-hot-call-analysis-progress-right pos-a"
					:style="{ width: ratio2 }"
				></div>
			</div>
		</div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	computed: {
		ratio1() {
			if (this.data) {
				const ratio =
					(this.data.onBusy /
						(Number(this.data.onBusy) + Number(this.data.onFree))) *
					100
				if (ratio < 3) {
					return 'calc(3% - 2px)'
				}
				if (ratio > 97) {
					return 'calc(97% - 2px)'
				}
				return `calc(${ratio}% - 2px)`
			}
			return '3%'
		},
		ratio2() {
			if (this.data) {
				const ratio =
					(this.data.onFree /
						(Number(this.data.onBusy) + Number(this.data.onFree))) *
					100
				if (ratio < 3) {
					return 'calc(3% - 2px)'
				}
				if (ratio > 97) {
					return 'calc(97% - 2px)'
				}
				return `calc(${ratio}% - 2px)`
			}
			return '3%'
		},
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
	right: 0;
	height: 16px;
	background: #001a77;
	border: 1px solid #00ffcf;
}

.h-hot-call-analysis-progress-left {
	left: 0;
	height: 16px;
	background: #0df;
}

.h-hot-call-analysis {
	height: 100%;
	background: rgba(0, 87, 169, 0.3);

	h2 {
		padding: 15px 12px 28px 12px;
		font-size: 20px;
		font-weight: 600;
		line-height: 24px;
		color: #fff;
	}
}

.h-hot-call-analysis-content {
	align-items: center;
}

.h-hot-call-analysis-call-block {
	width: 12px;
	height: 12px;
	margin-right: 4px;
	margin-left: 12px;
	background: #0df;
}

.h-hot-call-analysis-call-title {
	margin-right: 16px;
	font-size: 18px;
	line-height: 24px;
	color: #fff;
}

.h-hot-call-analysis-call-num {
	font-size: 24px;
	line-height: 24px;
	color: #fff;
}

.h-hot-call-analysis-free-block {
	width: 12px;
	height: 12px;
	margin-left: auto;
	background: #001a77;
	border: 1px solid #00ffcf;
}

.h-hot-call-analysis-free-title {
	margin-right: 16px;
	margin-left: 4px;
	font-size: 18px;
	line-height: 24px;
	color: #fff;
}

.h-hot-call-analysis-free-num {
	margin-right: 16px;
	font-size: 24px;
	line-height: 24px;
	color: #fff;
}
</style>
