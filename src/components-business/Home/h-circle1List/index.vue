<template>
	<div class="widget-part fn-flex flex-row" :style="styles">
		<div class="circle1list-box">
			<div class="left-list">
				<div
					class="list-item"
					:class="{ 'list-item-active': activeIndex === index }"
					v-for="(item, index) in data && data.list"
					:key="index"
					:activeIndex="activeIndex"
					@click="selectTab(index)"
				>
					{{ item }}
					<img
						src="/static/images/arrow.svg"
						v-if="index === activeIndex"
					/>
				</div>
			</div>
			<div class="right-circle">
				<circle1
					:data="computedData"
					v-if="computedData"
					:color="config.config && JSON.parse(config.config.color)"
				/>
			</div>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import circle1 from './circle1'
import { customConfig, value } from './index.component'

export default {
	data() {
		return {
			activeIndex: 0,
			intervalId: null,
			timeId: null,
		}
	},
	mixins: [widgetMixin],
	components: { circle1 },
	computed: {
		computedData() {
			if (!this.data) return
			return this.data && this.data.itemList[this.activeIndex]
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
	mounted() {
		this.actived = this.defaultActived || 0
		this.beginInterval()
	},
	beforeDestroy() {
		this.clearIntervalId()
	},
	methods: {
		selectTab(index) {
			clearInterval(this.intervalId)
			this.intervalId = null
			this.activeIndex = index
			setTimeout(this.beginInterval, this.config.config.timeoutTime)
		},
		beginInterval() {
			if (!this.data) return
			if (this.intervalId) return
			this.intervalId = setInterval(() => {
				this.activeIndex = (this.activeIndex + 1) % 3
			}, this.config.config.intervalTime)
		},
		clearIntervalId() {
			clearInterval(this.intervalId)
			this.intervalId = null
		},
	},
}
</script>
<style lang="scss">
.circle1list-box {
	display: flex;
	width: 100%;
	height: 100%;

	.left-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100px;
		height: 140px;

		.list-item {
			display: flex;
			align-items: center;
			width: 96px;
			height: 40px;
			padding-left: 8px;
			font-size: 18px;
			font-style: normal;
			font-weight: normal;
			line-height: 40px;
			color: #fff;
			text-align: left;
			background: rgba(0, 31, 109, 0.5);
			border-left: 4px solid rgba(0, 31, 109, 0.5);

			img {
				width: 20px;
				height: 20px;
				margin-left: 20px;
			}
		}

		.list-item-active {
			border-left: 4px solid #0df;
		}
	}

	.right-circle {
		display: flex;
		align-items: center;
		margin-left: 32px !important;
	}
}
</style>
