<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-progress-2">
			<h2>{{ config.config && config.config.title }}</h2>
			<p class="font-num">
				{{ data && data.value
				}}{{ config.config && config.config.suffix }}
			</p>
		</div>
		<div class="pos-r h-progress-2-ratio">
			<i class="pos-a" :style="{ width: `calc(${ratio} - 12px)` }"></i>
			<span
				class="pos-a circle"
				:style="{ left: `calc(${ratio} - 12px)` }"
			/>
		</div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	computed: {
		ratio() {
			if (this.data) {
				if (this.data.value <= this.data.max) {
					return `${(this.data.value / this.data.max) * 100}%`
				}
				return '100%'
			}
			return '0%'
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss">
.h-progress-2-ratio {
	height: 16px;
	padding: 6px;
	background: rgba(255, 255, 255, 0.1);

	span {
		top: 50%;
		width: 20px;
		height: 20px;
		margin-top: -10px;
		border: 2px solid rgba(0, 254, 207, 0.4);

		&::before {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 12px;
			height: 12px;
			margin-top: -6px;
			margin-left: -6px;
			content: '';
			background: #00ffcf;
			border-radius: 100px;
			box-shadow: 0 0 4px #00fecf;
		}
	}

	i {
		top: 6px;
		left: 6px;
		height: 4px;

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 4px;
			content: '';
			background: linear-gradient(
				90deg,
				rgba(1, 229, 255, 0.0001) 0%,
				#0df 100%
			);
		}
	}
}

.h-progress-2 {
	align-items: center;
	margin-bottom: 12px;

	h2 {
		font-size: 24px;
		font-weight: bold;
		line-height: 24px;
		color: #feffff;
	}

	p {
		margin-left: auto;
		font-size: 24px;
		font-weight: bold;
		line-height: 24px;
		color: #feffff;
	}
}
</style>
