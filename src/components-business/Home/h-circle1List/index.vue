<template>
	<div class="widget-part fn-flex flex-row" :style="styles">
		<div class="circle1list-box">
			<div class="left-list">
				<div
					class="list-item"
					:class="{'list-item-active':activeIndex === index}"
					v-for="(item,index) in data&&data.list"
					:key="index"
					:activeIndex="activeIndex"
					@click="selectTab(index)"
				>{{item}}
					<img src="/static/images/arrow.svg" v-if="index===activeIndex"/>
				</div>
			</div>
			<div class="right-circle">
				<circle1 :data="computedData" v-if="computedData"
						 :color="config.config&&JSON.parse(config.config.color)"/>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins'
	import circle1 from './circle1'
	import {customConfig, value} from './index.component'

	export default {
		data() {
			return {
				activeIndex: 0,
				intervalId: null,
				timeId: null,
			};
		},
		mixins: [mixins],
		components: {circle1},
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
		width: 100%;
		height: 100%;
		display: flex;

		.left-list {
			width: 100px;
			height: 140px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.list-item {
				text-align: left;
				padding-left: 8px;
				height: 40px;
				line-height: 40px;
				width: 96px;
				background: rgba(0, 31, 109, 0.5);
				font-style: normal;
				font-weight: normal;
				font-size: 18px;
				color: #fff;
				border-left: 4px solid rgba(0, 31, 109, 0.5);
				display: flex;
				align-items: center;

				img {
					height: 20px;
					width: 20px;
					margin-left: 20px;
				}
			}

			.list-item-active {
				border-left: 4px solid #00ddff;
			}
		}

		.right-circle {
			margin-left: 32px !important;
			display: flex;
			align-items: center;
		}
	}
</style>

