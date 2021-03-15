<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="a-inspectionConfig fn-flex flex-column">
			<div class="video-box fn-flex flex-row">
				<div class="wrap">
					<video
						:src="config.config && config.config.videoUrl"
						controls="controls"
						autoplay="autoplay"
						muted="muted"
						loop
					></video>
				</div>
				<div class="wrap">
					<div class="a-inspectionConfig-ratio-box pos-r">
						<div class="a-inspectionConfig-ratio pos-a" :style="{height:`${ data && data.ratio}`}"></div>
					</div>
					<div class="a-inspectionConfig-title">
						<h2 class="font-num">{{ data && data.ratio }}</h2>
						<p>在线率</p>
					</div>
				</div>
			</div>
			<div class="context fn-flex flex-row">
				<div class="context-item fn-flex flex-column">
					<div class="inspection-value font-num">
						{{ data && data.value1 }}
					</div>
					<div class="inspection-desc" style="margin-left: 16px;">
						{{ config.config && config.config.desc }}
					</div>
				</div>
				<div class="context-item fn-flex flex-column">
					<div class="inspection-value font-num">
						{{ data && data.value2 }}
					</div>
					<div class="inspection-desc">
						{{ config.config && config.config.desc2 }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { value, customConfig } from './index.component'

	export default {
		mixins: [mixins],
		methods: {},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss">
	.a-inspectionConfig-title {
		h2 {
			margin-top: 18px;
			font-size: 48px;
			line-height: 48px;
			color: #00ffcf;
		}

		p {
			margin-top: 14px;
			font-size: 20px;
			line-height: 24px;
			color: #fff;
			text-align: left;
		}
	}

	.a-inspectionConfig-ratio {
		bottom: 0;
		left: 0;
		width: 14px;
		background: linear-gradient(180deg, #00f0ff 0%, rgba(0, 221, 255, 0.0001) 100%);
	}

	.a-inspectionConfig-ratio-box {
		width: 16px;
		height: 84px;
		margin-top: 21px;
		margin-right: 8px;
		border: 1px solid #0df;
	}

	.a-inspectionConfig {
		width: 497px;
		height: 200px;

		.wrap {
			display: flex;
			flex: 1;
		}

		video::-webkit-media-controls {
			display: none !important;
		}

		video {
			flex: none;
			width: 200px;
			height: 123px !important;
		}

		.context-item {
			flex: 1;

			&:nth-child(2) {
				.inspection-desc {
					color: #fff;

					&::before {
						border: 4px solid #0df;
					}
				}
			}
		}

		.context {
			margin-top: 8px;

			.inspection-value {
				padding-left: 34px;
				font-size: 32px;
				line-height: 32px;
				color: #fff;
				text-align: left;
			}

			.inspection-desc {
				position: relative;
				width: 198px;
				height: 24px;
				margin-top: 8px;
				font-size: 20px;
				line-height: 24px;
				color: #fff;
				text-align: center;
				white-space: nowrap;

				&::before {
					position: absolute;
					top: 50%;
					left: 0;
					width: 16px;
					height: 16px;
					margin-top: -8px;
					content: '';
					border: 4px solid #0df;
					border-radius: 100px;
				}
			}
		}
	}
</style>

