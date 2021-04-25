<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="analysis-box">
			<div class="s-analysis" :id="id" />
			<div class="context">
				<div
					v-for="(item, index) in data.dataList"
					:key="index"
					class="context-item"
				>
					<div class="item-name">{{ item.name }}</div>
					<div class="item-value font-num">
						{{ item.value | toThousand }}
					</div>
					<div class="ratio-value font-num">
						{{ ((item.value / total) * 100).toFixed(2) }}%
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import getOption from './options'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(this.data))
		},
	},
	computed: {
		total() {
			if (this.data) {
				let total = 0
				this.data.dataList.forEach(item => {
					total += Number(item.value)
				})
				return total
			}
			return 0
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val }
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id),
						)
						this.setOption(data)
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.analysis-box {
	display: flex;

	.s-analysis {
		width: 250px;
		height: 240px;
	}

	.context {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20px;

		.context-item {
			display: flex;
			height: 24px;
			margin-top: 11px;

			.item-name {
				font-size: 18px;
				font-style: normal;
				font-weight: 400;
				line-height: 24px;
				color: #0df;
				text-align: right;
				letter-spacing: 0;
			}

			.item-value {
				min-width: 52px;
				margin-left: 25px;
				font-size: 24px;
				font-style: normal;
				font-weight: 700;
				line-height: 24px;
				color: #fff;
				text-align: left;
			}

			.ratio-value {
				margin-left: 25px;
				font-size: 24px;
				font-style: normal;
				font-weight: 700;
				line-height: 24px;
				color: #fff;
				text-align: left;
			}
		}
	}
}
</style>
