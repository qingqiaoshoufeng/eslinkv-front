<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul class="title">
			<li v-for="(k, i) in config.config.tableHeader" :key="i">{{ k }}</li>
		</ul>
		<div class="content">
			<vue-seamless-scroll
				:data="data || []"
				class="content-warp"
				:class-option="classOption"
			>
				<ul
					class="content-row"
					v-for="(item, index) in data"
					:key="index"
				>
					<li>{{ item.startTime }}</li>
					<li>{{ item.dangerType }}</li>
					<li>{{ item.deviceType }}</li>
					<li>{{ item.rank }}</li>
					<li :class="{active: item.status === '未处理'}">{{ item.status }}</li>
					<li>{{ item.handleTime }}</li>
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
			tableHeader: true
		}
	};
	const value = {
		api: {
			data: JSON.stringify([
				{
					startTime: '11/12',
					dangerType: '压力异常',
					deviceType: '调压器',
					rank: '一级',
					status: '未处理',
					handleTime: '--'
				},
				{
					startTime: '11/10',
					dangerType: '压力异常',
					deviceType: '调压器',
					rank: '一级',
					status: '已处理',
					handleTime: '11/10'
				},
				{
					startTime: '11/10',
					dangerType: '压力异常',
					deviceType: '调压器',
					rank: '一级',
					status: '已处理',
					handleTime: '11/10'
				},
				{
					startTime: '11/10',
					dangerType: '压力异常',
					deviceType: '调压器',
					rank: '一级',
					status: '已处理',
					handleTime: '11/10'
				},
				{
					startTime: '11/10',
					dangerType: '压力异常',
					deviceType: '调压器',
					rank: '一级',
					status: '已处理',
					handleTime: '11/10'
				},
				{
					startTime: '11/10',
					dangerType: '压力异常',
					deviceType: '调压器',
					rank: '一级',
					status: '已处理',
					handleTime: '11/10'
				},
				{
					startTime: '11/10',
					dangerType: '压力异常',
					deviceType: '调压器',
					rank: '一级',
					status: '已处理',
					handleTime: '11/10'
				}
			])
		},
		config: {
			tableHeader: ['发现时间', '隐患类型', '设备类型', '隐患等级', '隐患状态', '处理时间']
		}
	};
	const configSource = {
		config: {
			fields: {
				tableHeader: getInput('tableHeader', '表头')
			}
		},
	}
	export default {
		mixins: [mixins],
		components: {
			VueSeamLess
		},
		data() {
			return {}
		},
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
			},
		},
		methods: {},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		}
	};
</script>
<style lang="scss" scoped>
	.widget-part {
		.title {
			width: 100%;
			height: 32px;
			background: rgba(23, 123, 255, 0.2);
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-left: 15px;

			& > li {
				font-size: 18px;
				color: #00CBF4;
				text-align: left;
				flex: none;

				&:nth-child(1) {
					width: 90px;
				}

				&:nth-child(2) {
					width: 102px;
				}

				&:nth-child(3) {
					width: 114px;
				}

				&:nth-child(4) {
					width: 113px;
				}

				&:nth-child(5) {
					width: 134px;
				}

				&:nth-child(6) {
					flex: 1;
				}
			}
		}

		.content {
			height: 155px;
			padding-left: 15px;

			.content-warp {
				height: 155px;
				overflow: hidden;
			}

			.content-row {
				height: 24px;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				margin-top: 8px;

				& > li {
					font-size: 18px;
					color: #fff;
					text-align: left;
					flex: none;

					&:nth-child(1) {
						width: 90px;
					}

					&:nth-child(2) {
						width: 102px;
					}

					&:nth-child(3) {
						width: 114px;
					}

					&:nth-child(4) {
						width: 113px;
						color: #FF7217;
					}

					&:nth-child(5) {
						width: 134px;
						color: #00FFCF;

						&.active {
							color: #FF7217;
						}
					}

					&:nth-child(6) {
						flex: 1;
					}
				}
			}
		}
	}
</style>

