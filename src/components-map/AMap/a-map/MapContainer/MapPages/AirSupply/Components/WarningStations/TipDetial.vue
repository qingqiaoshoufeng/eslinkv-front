<template>
	<div>
		<div class="companyName" v-show="detailShowList.length === 1">
			<!-- {{ data.name || data.context || data.address }} -->
			{{ detailShowList[0].name }}
		</div>
		<div class="TipDetial">
			<div class="station_list" v-show="detailShowList.length > 1">
				<div
					class="station_item"
					v-for="(item, index) in detailShowList"
					:key="index"
					:class="{ active: activeIndex === index }"
					@click="handlerClick(item, index)"
				>
					{{ item.name.split('-')[0] }}
					<SvgIcon
						v-show="activeIndex === index"
						class="arrow"
						:icon-name="'iconarrow1'"
						:style="{ fontSize: '24px' }"
					/>
				</div>
			</div>
			<div class="right">
				<div class="detial_info_list">
					<div
						class="item"
						v-for="(item, index) in detailList || []"
						:key="index"
						:style="item.style"
						v-show="
							detailInfo[item.prop] || detailInfo[item.prop] == 0
						"
					>
						<!-- v-show="detailInfo[item.prop]" -->
						<span class="label" :style="item.style">
							{{ `${item.label}: ` }}
						</span>
						<span class="value">
							{{
								`${
									(detailInfo[item.prop] &&
									detailInfo[item.prop] !== 0 &&
									isNumber(detailInfo[item.prop])
										? parseFloat(
												detailInfo[item.prop].toFixed(
													item.Fixed || 0,
												),
										  ).toLocaleString()
										: detailInfo[item.prop] || 0) + item.DW
								} `
							}}
						</span>
					</div>
				</div>
			</div>
			<!-- <div class="btn" v-if="true" @click="handleViewDetail()">查看详情</div> -->
		</div>
	</div>
</template>
<script>
import { DETAILLIST } from './config'
import { SvgIcon } from '../../../../../components/'
import { getLowMidDevice } from '@/components-map-api/map.airSupply.api'

export default {
	name: 'TipDetial',
	components: { SvgIcon },
	props: {
		data: {
			Type: Object,
			default() {
				return {}
			},
		},
		isShowMore: {
			Type: Boolean,
			default: false,
		},
		isShowList: {
			Type: Number,
			default: -1,
		},
		detailShowList: {
			Type: Array,
			default() {
				return []
			},
		},
	},
	watch: {
		detailShowList: {
			handler(val) {
				this.detailInfo = {}
				if (val.length === 1) {
					this.getDetailInfo(val[0].middleId)
				} else {
					this.getDetailInfo(val[this.activeIndex].middleId)
				}
			},
			immediate: true,
		},
	},
	data() {
		return {
			detailList: DETAILLIST,
			activeIndex: 0,
			detailInfo: {},
		}
	},
	methods: {
		handleViewDetail() {
			this.$emit('view-detail')
		},
		isNumber(val) {
			return typeof val === 'number' && !isNaN(val)
		},
		handlerClick(item, index) {
			this.detailInfo = {}
			this.activeIndex = index
			this.getDetailInfo(item.middleId)
		},
		async getDetailInfo(id) {
			const params = {
				id,
			}
			const res = await getLowMidDevice(params)
			res.valveOpenFinish =
				res.valveOpenFinish === 'true' ? '开启' : '关闭'
			res.mc = res.mc ? '异常' : '正常'
			this.detailInfo = res
		},
	},
}
</script>
<style lang="scss" scoped>
.companyName {
	font-size: 32px;
	font-style: normal;
	font-weight: normal;
	line-height: 1.5em;
	color: #ffd200;
}

.TipDetial {
	display: flex;
  min-width: 370px;
  text-align: left;

  .station_list {
    box-sizing: content-box;
    width: 370px;
		padding: 15px 0;
		margin-right: 24px;
		margin-left: 2px;
		background: #001a77;

		.station_item {
			width: 370px;
			height: 40px;
			padding-left: 15px;
			font-size: 24px;
			font-style: normal;
			font-weight: 600;
			line-height: 40px;
			color: rgba(255, 255, 255, 0.8);

			.arrow {
				margin-top: -5px;
			}
		}

		.active {
			color: #fff;
			background: #0057a9;
		}
	}

	.accept,
	.complete,
	.percentage {
		font-size: 24px;
		font-style: normal;
		font-weight: normal;
		line-height: 32px;
		color: #fff;
	}

	.right {
		height: 358px;
		margin: 15px 0;
		overflow-y: scroll;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.detial_info_list {
		width: 100%;

		.item {
			display: inline-block;
			min-width: 45%;
			font-size: 24px;
			font-style: normal;
			font-weight: normal;
			color: #fff;

			.label {
				color: #fff;
			}

			.value {
				color: #ffd200;
			}
		}
	}

	.accept {
		margin-top: 16px;
	}

	.btn {
		display: inline-block;
		width: 80px;
		height: 32px;
		padding: 0 8px;
		margin-top: 16px;
		line-height: 32px;
		cursor: pointer;
		background: #0057a9;
		border-radius: 4px;

		&:hover {
			opacity: 0.8;
		}
	}
}
</style>
