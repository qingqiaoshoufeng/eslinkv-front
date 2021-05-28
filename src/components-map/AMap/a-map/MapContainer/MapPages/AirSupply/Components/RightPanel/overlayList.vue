<template>
	<div>
		<div class="select">
			<div @click="isShowOption = !isShowOption" class="select-show">
				<span>{{ currName }}</span>
				<Icon type="ios-arrow-down" />
			</div>
			
			<ul class="options" v-show="isShowOption">
				<li
					v-for="(k, i) in points"
					:key="i"
					@click="changeType(k.type)"
					:class="{active: type === k.type}"
				>{{ k.label }}</li>
			</ul>
		</div>
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
						:icon-name="markerConfig[item.type].legendIcon"
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
import { Icon } from 'view-design'
export default {
	name: 'OverlayList',
	components: {
		SvgIcon,
		NoData,
		Icon
	},
	data() {
		return {
			list: [],
			searchName: '',
			isShowOption: false,
			type: '',
			currName: '全部点位',
			points: [
				{
					label: '全部点位',
					type: ''
				}
			]
		}
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {}
			},
		},
		stationList: {
			type: Array,
			default() {
				return []
			},
		},
		markerConfig: Object
	},
	computed: {
		showStationList() {
			let res = this.stationList
			if (this.type) {
				res = res.filter(item => item.type === this.type)
			}
			if (this.searchName) {
				res = res.filter(item =>
					item.name.includes(this.searchName) || (item.address || '').includes(this.searchName))
			}
			return res
		},
	},
	methods: {
		changeType(type) {
			this.type = type
			this.isShowOption = false
		},
		clearSearch() {
			this.searchName = ''
		},
		handleClick(item, index) {
			this.$emit(
				'change',
				{ ...item, overlayType: item.type },
				'StationList',
			)
		},
	},
	created () {
		Object.keys(this.markerConfig).forEach(key => {
			this.points.push({
				type: key,
				...this.markerConfig[key]
			})
		})
	}
}
</script>

<style lang="scss" scoped>
.select {
	position: relative;
	margin-top: 8px;
	.select-show {
		cursor: pointer;
		background: #0057A9;
		border-radius: 4px;
		width: 100%;
		height: 40px;
		font-size: 20px;
		color: #FEFFFF;
		padding: 0 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.options {
		position: absolute;
		top: 48px;
		left: 0;
		width: 100%;
		padding: 8px 0;
		background: #0057A9;
		border: 1px solid #00DDFF;
		border-radius: 4px;
		li {
			font-size: 20px;
			color: rgba(255, 255, 255, 0.75);
			text-align: left;
			padding: 8px 16px;
			&.active, &:hover {
				background: rgba(0, 221, 255, 0.3);
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
}
.search {
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
