<template>
	<div class="s-table-status widget-part" :style="styles">
		<div
			class="s-table-status__content"
			v-if="!!data"
		>
			<vue-seamless-scroll
				:data="data || []"
				class="s-table-status__content__seamless-warp"
				:class-option="classOption"
			>
				<ul
					class="s-table-status__content__row"
					v-for="(item, index) in data ? data : []"
					:key="index"
				>
					<li class="text-right">{{ item.title || '' }}</li>
					<li class="pos-r">
						<i class="pos-a" :style="{width:`${item.value / max * 100}%`}"></i>
					</li>
					<li class="font-num">{{ item.value || '' }}</li>
					<li>{{ item.suffix || '' }}</li>
				</ul>
			</vue-seamless-scroll>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import VueSeamLess from 'vue-seamless-scroll'
	import { value } from './index.component'

	export default {
		data () {
			return {
				max: 0
			}
		},
		mixins: [widgetMixin],
		components: {
			VueSeamLess
		},
		methods: {},
		watch: {
			data: {
				handler (val) {
					if (val) {
						const list = this.data || []
						const amoutList = list.reduce((initVal, val) => {
							initVal.push(val?.value || 0)
							return initVal
						}, [])
						this.max = Math.max(...amoutList)
					}
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			classOption () {
				return {
					step: 0.2, // 数值越大速度滚动越快
					limitMoveNum: this.data?.length, // 开始无缝滚动的数据量
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				}
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">
	.s-table-status {
		&__content {
			height: 152px;
			margin-top: 9px;

			&__seamless-warp {
				height: 200px;
				overflow: hidden;
			}

			&__row {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				width: 480px;
				height: 24px;
				padding: 4px 8px;
				margin-top: 16px;

				& > li {
					font-size: 16px;
					line-height: 16px;
					color: #fff;
					text-align: left;

					&:nth-child(1) {
						width: 90px;
						color: #0df;
					}

					&:nth-child(2) {
						width: 252px;
						height: 16px;
						margin-right: 16px;
						margin-left: 16px;
						background: rgba(0, 87, 169, 0.2);

						i {
							top: 4px;
							left: 4px;
							height: 8px;
							background: linear-gradient(270deg, #0df 0%, rgba(0, 221, 255, 0) 100%);
						}
					}

					&:nth-child(4) {
						font-size: 13px;
					}
				}
			}
		}
	}
</style>

