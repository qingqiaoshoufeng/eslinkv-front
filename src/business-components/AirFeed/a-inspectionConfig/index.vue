<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="a-inspectionConfig fn-flex flex-column">
			<div class="video-box fn-flex flex-row">
				<video
					:src="config.config && config.config.videoUrl"
					controls="controls"
					autoplay="autoplay"
					muted="muted"
					loop
				></video>
				<div class="a-inspectionConfig-ratio-box pos-r">
					<div class="a-inspectionConfig-ratio pos-a" :style="{height:`${ data&&data.ratio}%`}"></div>
				</div>
				<div class="a-inspectionConfig-title">
					<h2 class="font-num">{{data&&data.ratio}}%</h2>
					<p>在线率</p>
				</div>
			</div>
			<div class="context fn-flex flex-row">
				<div class="context-item fn-flex flex-column">
					<div class="inspection-value font-num">
						{{ data && data.value1 }}
					</div>
					<div class="inspection-desc">
						{{ config.config && config.config.desc }}
					</div>
				</div>
				<div class="context-item fn-flex flex-column">
					<div class="inspection-value font-num">
						{{ data && data.value2 }}
					</div>
					<div class="inspection-desc">
						{{ config.config && config.config.desc }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import {getInput, getSelect} from '../../../../lib';
	// 组件配置项
	const config = {
		animation: true,
		config: {
			desc: true,
			videoUrl: true,
		},
	};
	// 组件选择框配置
	const configSource = {
		config: {
			fields: {
				desc: getInput('desc', '描述'),
				videoUrl: getSelect('videoUrl', '图片地址', [
					'/static/images/airfeed/car.webm',
					'/static/images/airfeed/people.webm',
				]),
			},
		},
	};
	const value = {
		api: {
			data: JSON.stringify({
				value1: 298,
				value2: 298,
				ratio: 95.3,
			}),
		},
		config: {
			desc: '客户事故数(件)',
			videoUrl: '/static/images/airfeed/car.webm',
		},
	};
	export default {
		mixins: [mixins],
		methods: {},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss">
	.a-inspectionConfig-title {
		h2 {
			font-size: 48px;
			line-height: 48px;
			color: #00FFCF;
			margin-top: 18px;
		}

		p {
			font-size: 20px;
			line-height: 24px;
			color: #fff;
			margin-top: 14px;
			text-align: left;
		}
	}

	.a-inspectionConfig-ratio {
		width: 14px;
		bottom: 0;
		left: 0;
		background: linear-gradient(180deg, #00F0FF 0%, rgba(0, 221, 255, 0.0001) 100%);
	}

	.a-inspectionConfig-ratio-box {
		width: 16px;
		height: 84px;
		margin-left: 33px;
		border: 1px solid #00DDFF;
		margin-right: 8px;
		margin-top: 21px;
	}

	.a-inspectionConfig {
		height: 200px;
		width: 497px;

		video::-webkit-media-controls {
			display: none !important;
		}

		video {
			height: 123px !important;
			width: 200px;
			flex: none;
		}

		.context-item {
			flex: 1;
			margin-left: 16px;

			&:nth-child(2) {
				.inspection-desc {
					color: #fff;

					&:before {
						border: 4px solid #00DDFF;
					}
				}
			}
		}

		.context {
			margin-top: 8px;

			.inspection-value {
				text-align: left;
				font-size: 32px;
				line-height: 32px;
				color: #fff;
				padding-left: 34px;
			}

			.inspection-desc {
				margin-top: 8px;
				width: 198px;
				padding-left: 24px;
				height: 24px;
				font-size: 20px;
				line-height: 24px;
				white-space: nowrap;
				color: #fff;
				text-align: center;
				position: relative;

				&:before {
					content: '';
					width: 16px;
					height: 16px;
					position: absolute;
					left: 0;
					top: 50%;
					margin-top: -8px;
					border: 4px solid #00DDFF;
					border-radius: 100px;
				}
			}
		}
	}
</style>

