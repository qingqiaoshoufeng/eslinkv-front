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
			<NoData :show="!showStationList.length" />
			<div
				@click="handleClick(item, index)"
				v-for="(item, index) in showStationList"
				:key="index"
				class="list-item"
				:class="{ active: activeItem.name === item.name }"
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
	import { SvgIcon, NoData } from '../../../../../components/'
	export default {
		name: 'HomeRealTimeList',
		components: {
			SvgIcon,
			NoData
		},
		data () {
			const iconList = {
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
				DistributedEnergyResource: 'icontulinengyuanzhan' // '分布式能源',
			}

			return {
				list: [],
				iconList,
				searchName: ''
			}
		},
		props: {
			activeItem: {
				type: Object,
				default () {
					return {}
				}
			},
			stationList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		computed: {
			showStationList () {
				if (this.searchName) {
					return this.stationList.filter(item =>
						item.name.includes(this.searchName)
					)
				}
				return this.stationList
			}
		},
		methods: {
			clearSearch () {
				this.searchName = ''
			},
			handleClick (item, index) {
				this.$emit(
					'change',
					{ ...item, overlayType: item.type },
					'StationList'
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
.search {
	box-sizing: border-box;
	box-sizing: content-box;
	display: flex;
	width: 100%;
	height: 48px;
	margin-top: 6px;
	font-size: 20px;
	font-style: normal;
	font-weight: normal;
	line-height: 24px;
	border: 1px solid #0057a9;
	border-radius: 4px;

	input {
		display: block;
		flex: 1;
		height: 100%;
		padding-left: 16px;
		font-size: 20px;
		font-style: normal;
		font-weight: normal;
		color: #fff;
		background-color: transparent;
		border: 1px solid #0057a9;
	}

	::-webkit-input-placeholder {
		font-size: 20px;
		font-style: normal;
		font-weight: normal;
		color: #fff;
	}

	.search-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 100%;
		font-size: 14px;
		background: #0057a9;
	}
}

.list {
	height: 744px;
	overflow-y: scroll;
	font-size: 16px;
	color: #fff;

	&::-webkit-scrollbar {
		display: none;
	}

	.list-item {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 24px 16px 24px 8px;
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
				color: #0df;
			}

			.content {
				display: flex;
				flex: 1;
				align-items: center;
				margin-left: 12px;
				font-size: 24px;
			}

			.station-name {
				flex: 1;
				margin-left: 36px;
				font-size: 20px;
				color: rgba(255, 255, 255, 0.8);
			}
		}
	}
}
</style>
