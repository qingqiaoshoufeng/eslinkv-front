<template>
	<div>
		<div class="search">
			<input
				type="text"
				placeholder="输入关键词搜索点位"
				v-model="searchName"
			/>
			<div class="search-btn">
				<SvgIcon
					:icon-name="'iconsearch'"
					:style="{ fontSize: '24px' }"
				/>
			</div>
		</div>
		<div class="list">
			<div
				@click="handleClick(item, index)"
				v-for="(item, index) in showStationList"
				:key="index"
				class="list-item"
				:class="{ active: activeItem === item }"
			>
				<div class="row">
					<SvgIcon
						:icon-name="iconList[item.type]"
						class="panel-type-icon"
					></SvgIcon>
					<div class="content">
						{{ item.name }}
					</div>
				</div>
				<div class="row">
					<SvgIcon
						:icon-name="'iconarrow'"
						:style="{ fontSize: '24px' }"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { SvgIcon } from '../../../../../components/';
// import {
//     AIRSUPPLYOVERLAYCONFIGMAP,
// } from '../../../../../config/index';
export default {
	name: 'HomeRealTimeList',
	components: {
		SvgIcon,
	},
	data() {
		let iconList = {
			GasStation: 'icontulimenzhan', // '门站',
			PressureRegulatingStation: 'icontulitiaoyazhan', // '调压站',
			EmergencyAirSourceStation: 'icontuliqiyuanzhan', // '应急气源站',
			ServiceStation: 'icontulizonghefuwuzhan1', // '综合服务站',
			PipeManageMentStation: 'icontuliguanwangyunhangguanlizhan', // '管网运行管理站',
			UndergroundRepairStation: 'icontulidixiaqiangxiudian', // '地下抢修点',
			OngroundRepairStation: 'icontulidishangqiangxiudian', // '地上抢修点',
			LNGStation: 'icontulilNG', // 'LNG站',
			LiquefiedGasStation: 'icontuliyehuaqi', // '液化气站',
			NaturalGasStation: 'icontulijiaqizhan', // '加气站',
			DistributedEnergyResource: 'icontulinengyuanzhan', // '分布式能源',
		};

		return {
			list: [],
			iconList,
			searchName: '',
		};
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {};
			},
		},
		stationList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	computed: {
		showStationList() {
			if (this.searchName) {
				return this.stationList.filter(item =>
					item.name.includes(this.searchName)
				);
			}
			return this.stationList;
		},
	},
	methods: {
		clearSearch() {
			this.searchName = '';
		},
		handleClick(item, index) {
			this.$emit(
				'change',
				{ ...item, overlayType: item.type },
				'StationList'
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.search {
	margin-top: 6px;
	width: 100%;
	height: 40px;
	border: 1px solid #0057a9;
	box-sizing: border-box;
	border-radius: 4px;
	display: flex;
	font-family: PingFang SC;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 24px;
	input {
		display: block;
		background-color: transparent;
		color: #fff;
		height: 100%;
		flex: 1;
		padding-left: 16px;
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 20px;
		border: 1px solid #0057a9;
	}
	::-webkit-input-placeholder {
		color: #fff;
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 20px;
	}
	.search-btn {
		display: flex;
		background: #0057a9;
		width: 40px;
		height: 40px;
		font-size: 14px;
		justify-content: center;
		align-items: center;
	}
}
.list {
	height: 744px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	color: #fff;
	font-size: 16px;
	.list-item {
		display: flex;
		justify-content: space-between;
		padding: 24px 16px 24px 8px;
		box-sizing: border-box;
		cursor: pointer;
		&:hover,
		&.active {
			background: rgba(23, 115, 201, 0.4);
		}
		.panel-type-icon {
			width: 24px;
			height: 24px;
		}
		.row {
			display: flex;
			align-items: center;
			.status-err {
				color: #ffdc45;
			}
			.status-suc {
				color: #00ddff;
			}
			.content {
				flex: 1;
				font-size: 24px;
				display: flex;
				align-items: center;
				margin-left: 12px;
			}
			.station-name {
				font-size: 20px;
				flex: 1;
				color: rgba(255, 255, 255, 0.8);
				margin-left: 36px;
			}
		}
	}
}
</style>
