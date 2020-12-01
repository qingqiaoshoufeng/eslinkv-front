<template>
	<div class="h-table-status widget-part" :style="styles" v-if="data">
		<ul class="h-table-status__title1">
			<li v-for="(k, i) in config.config.titles">{{ k }}</li>
		</ul>
		<div class="h-table-status__content1">
			<vue-seamless-scroll
				:data="data || []"
				class="h-table-status__content1__seamless-warp1"
				:class-option="classOption"
			>
				<ul
					class="h-table-status__content1__row1"
					v-for="(item, index) in data"
					:key="index"
				>
					<li>{{ item.time || '' }}</li>
					<li>{{ item.channel || '' }}</li>
					<li>{{ item.businessType || '' }}</li>
					<li>{{ item.statusDesc || '' }}</li>
				</ul>
			</vue-seamless-scroll>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import VueSeamLess from 'vue-seamless-scroll';
	import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

	const config = {
		animation: true,
		config: {
			titles: true
		}
	};
	const configSource = {
		config: {
			fields: {
				title: getInput('titles', '标题'),
			}
		}
	}
	const value = {
		api: {
			data: JSON.stringify([
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '在线客服',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					customer: '李的萌萌',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
			]),
		},
		config: {
			titles: ['时间', '报警人', '地点', '工单内容']
		}
	};
	export default {
		mixins: [mixins],
		components: {
			VueSeamLess,
		},
		methods: {},
		computed: {
			classOption() {
				return {
					step: 0.2, // 数值越大速度滚动越快
					limitMoveNum: this.data?.length, // 开始无缝滚动的数据量
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
				};
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss">
	.h-table-status {
		width: 100%;

		&__title1 {
			width: 100%;
			height: 32px;
			background: rgba(23, 123, 255, 0.2);
			display: flex;
			align-items: center;
			padding: 8px;
			box-sizing: border-box;

			& > li {
				font-size: 16px;
				line-height: 16px;
				color: #00CBF4;
				text-align: left;

				&:nth-child(1) {
					width: 16%;
				}

				&:nth-child(2) {
					width: 21%;
				}

				&:nth-child(3) {
					width: 36.3%;
				}

				&:nth-child(4) {
					width: 25.2%;
				}
			}
		}

		&__content1 {
			margin-top: 9px;
			height: 152px;

			&__seamless-warp1 {
				height: 152px;
				overflow: hidden;
			}

			&__row1 {
				width: 100%;
				height: 24px;
				display: flex;
				align-items: center;
				padding: 4px 8px;
				box-sizing: border-box;
				margin-top: 8px;

				& > li {
					text-align: left;
					font-size: 16px;
					line-height: 16px;
					color: #FFFFFF;

					&:nth-child(1) {
						width: 16%;
						color: rgba(255, 255, 255, 0.6);
					}

					&:nth-child(2) {
						width: 21%;
					}

					&:nth-child(3) {
						width: 36.3%;
					}

					&:nth-child(4) {
						width: 25.2%;
						color: #FFDC45;
					}
				}
			}
		}
	}
</style>

