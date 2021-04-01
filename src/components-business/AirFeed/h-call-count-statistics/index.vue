<template>
	<div class="h-call-count-statistics widget-part" :style="styles">
		<div
			class="h-call-count-statistics__icon"
			:style="{ backgroundImage: `url(${(data && data.icon) || ''})` }"
		></div>
		<div class="h-call-count-statistics__call-amount">
			<div class="h-call-count-statistics__call-amount__count font-num">
				{{ data && data.telAmount }}
			</div>
			<div class="h-call-count-statistics__call-amount__desc">
				{{ (data && data.centerTitle) || '' }}
			</div>
		</div>
		<div class="h-call-count-statistics__call-success-rate">
			<div
				class="h-call-count-statistics__call-success-rate__graph"
				:id="id"
			></div>
			<div class="h-call-count-statistics__call-success-rate__desc">
				<div
					class="h-call-count-statistics__call-success-rate__desc__rate font-num"
				>
					{{ `${data && data.value}%` }}
				</div>
				<div
					class="h-call-count-statistics__call-success-rate__desc__font"
				>
					{{ (data && data.graphTitle) || '' }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import options from './options'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		computed: {},
		methods: {
			setOption (data) {
				options.series[0].data[0].value = data?.value
				options.series[0].data[1].value = 100 - data?.value
				options.series[1].data[0].value = data?.value
				options.series[1].data[1].value = 100 - data?.value
				this.instance && this.instance.setOption(options)
			}
		},
		watch: {
			data: {
				handler (val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							)
							this.setOption(val)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">
	.h-call-count-statistics {
		display: flex;
		width: 480px;
		height: 100%;
		background:
			linear-gradient(
				360deg,
				rgba(255, 255, 255, 0.1) -2.01%,
				rgba(255, 255, 255, 0) 100%
			);

		&__icon {
			width: 110px;
			height: 110px;
			margin-top: 26px;
			margin-left: 16px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100px;
		}

		&__call-amount {
			margin-top: 53px;
			margin-left: 16px;

			&__count {
				font-size: 32px;
				font-weight: bold;
				line-height: 32px;
				color: #feffff;
				text-align: left;
			}

			&__desc {
				margin-top: 8px;
				font-size: 18px;
				line-height: 24px;
				color: rgba(255, 255, 255, 0.75);
				text-align: left;
			}
		}

		&__call-success-rate {
			position: relative;
			width: 144px;
			height: 144px;
			margin-top: 8px;
			margin-left: 22px;

			&__graph {
				width: 144px;
				height: 144px;
				background-image: url('/static/icons/ellipse-dashed.svg');
				background-repeat: no-repeat;
				background-position: center;
				background-size: 144px;
			}

			&__desc {
				position: absolute;
				top: 45px;
				left: 50%;
				display: flex;
				flex-direction: column;
				width: 100%;
				transform: translateX(-50%);

				&__rate {
					font-size: 32px;
					font-weight: bold;
					line-height: 32px;
					color: #feffff;
				}

				&__font {
					margin-top: 7px;
					font-size: 18px;
					line-height: 24px;
					color: rgba(255, 255, 255, 0.75);
				}
			}
		}
	}
</style>

