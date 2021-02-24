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
import mixins from '../../../../lib/mixins';
import options from './options';
import { config, value } from './index.component'

export default {
	mixins: [mixins],
	computed: {},
	methods: {
		setOption(data) {
			options.series[0].data[0].value = data?.value;
			options.series[0].data[1].value = 100 - data?.value;
			options.series[1].data[0].value = data?.value;
			options.series[1].data[1].value = 100 - data?.value;
			this.instance && this.instance.setOption(options);
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id)
						);
						this.setOption(val);
					});
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		
		this.configValue = this.parseConfigValue(value);
	},
};
</script>
<style lang="scss">
.h-call-count-statistics {
	width: 480px;
	height: 100%;
	display: flex;
	background: linear-gradient(
		360deg,
		rgba(255, 255, 255, 0.1) -2.01%,
		rgba(255, 255, 255, 0) 100%
	);

	&__icon {
		margin-left: 16px;
		margin-top: 26px;
		width: 110px;
		height: 110px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100px;
	}

	&__call-amount {
		margin-left: 16px;
		margin-top: 53px;

		&__count {
			font-weight: bold;
			font-size: 32px;
			line-height: 32px;
			color: #FEFFFF;
			text-align: left;
		}

		&__desc {
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
			margin-top: 8px;
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
			background-size: 144px;
			background-position: center;
		}

		&__desc {
			position: absolute;
			display: flex;
			flex-direction: column;
			top: 45px;
			left: 50%;
			width: 100%;
			transform: translateX(-50%);

			&__rate {
				font-weight: bold;
				font-size: 32px;
				line-height: 32px;
				color: #FEFFFF;
			}

			&__font {
				font-size: 18px;
				line-height: 24px;
				color: rgba(255, 255, 255, 0.75);
				margin-top: 7px;
			}
		}
	}
}
</style>

