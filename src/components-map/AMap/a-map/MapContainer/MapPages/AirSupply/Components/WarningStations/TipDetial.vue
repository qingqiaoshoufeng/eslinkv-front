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
						<span class="label" :style="item.style">{{
							`${item.label}: `
						}}</span>
						<span class="value">{{
							`${
								(detailInfo[item.prop] &&
								detailInfo[item.prop] !== 0 &&
								isNumber(detailInfo[item.prop])
									? parseFloat(
											detailInfo[item.prop].toFixed(
												item.Fixed || 0
											)
									  ).toLocaleString()
									: detailInfo[item.prop] || 0) + item.DW
							} `
						}}</span>
					</div>
				</div>
			</div>
			<!-- <div class="btn" v-if="true" @click="handleViewDetail()">查看详情</div> -->
		</div>
	</div>
</template>
<script>
import { DETAILLIST } from './config';
import { SvgIcon } from '../../../../../components/';
export default {
	name: 'TipDetial',
	components: { SvgIcon },
	props: {
		data: {
			Type: Object,
			default() {
				return {};
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
				return [];
			},
		},
	},
	watch: {
		detailShowList: {
			handler(val) {
				this.detailInfo = {};
				if (val.length === 1) {
					this.getDetailInfo(val[0].middleId);
				} else {
					this.getDetailInfo(val[this.activeIndex].middleId);
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
		};
	},
	methods: {
		handleViewDetail() {
			this.$emit('view-detail');
		},
		isNumber(val) {
			return typeof val === 'number' && !isNaN(val);
		},
		handlerClick(item, index) {
			this.detailInfo = {};
			console.log(item);
			this.activeIndex = index;
			this.getDetailInfo(item.middleId);
		},
		async getDetailInfo(id) {
			let params = {
				id,
			};
			let res = await this.$sysApi.map.airSupply.getLowMidDevice(params);
			console.log(res.valveOpenFinish);
			res.valveOpenFinish =
				res.valveOpenFinish === 'true' ? '开启' : '关闭';
			res.mc = res.mc ? '异常' : '正常';
			this.detailInfo = res;
		},
	},
	mounted() {},
};
</script>
<style lang="scss" scoped>
.companyName {
	font-style: normal;
	font-weight: normal;
	font-size: 32px;
	line-height: 1.5em;
	color: #ffd200;
}
.TipDetial {
	display: flex;
	min-width: 300px;
	text-align: left;
	.station_list {
		margin-left: 2px;
		margin-right: 24px;
		background: #001a77;
		width: 300px;
		padding: 15px 0;
		box-sizing: content-box;
		.station_item {
			font-style: normal;
			font-weight: 600;
			font-size: 24px;
			line-height: 40px;
			padding-left: 15px;
			color: rgba(255, 255, 255, 0.8);
			width: 300px;
			height: 40px;
			.arrow {
				margin-top: -5px;
			}
		}
		.active {
			background: #0057a9;
			color: #fff;
		}
	}
	.accept,
	.complete,
	.percentage {
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 32px;
		color: #ffffff;
	}
	.right {
		margin: 15px 0;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.detial_info_list {
		width: 100%;
		.item {
			min-width: 45%;
			display: inline-block;
			font-style: normal;
			font-weight: normal;
			font-size: 24px;
			color: #ffffff;
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
		padding: 0px 8px;
		line-height: 32px;
		width: 80px;
		height: 32px;
		background: #0057a9;
		border-radius: 4px;
		display: inline-block;
		cursor: pointer;
		margin-top: 16px;
		&:hover {
			opacity: 0.8;
		}
	}
}
</style>
