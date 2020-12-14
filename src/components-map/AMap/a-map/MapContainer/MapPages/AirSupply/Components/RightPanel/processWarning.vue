<template>
	<div class="process-warning">
		<div class="fn-flex filter-bar">
			<div class="fitler-item">
				<i-select
					class="filter-select"
					v-model="currentLevel"
					style="width: 72px"
					@on-change="getData"
				>
					<i-option
						:style="{
							padding: '0,10px',
							width: '72px',
							height: '32px',
							fontFamily: 'PingFang SC',
							fontWeight: 600,
							fontSize: '20px',
							lineHeight: '32px',
							color: '#fff',
							backgroundColor: '#0057A9',
						}"
						class="option"
						v-for="item in levelList"
						:value="item.value"
						:key="item.value"
					>
						{{ item.label }}
					</i-option>
				</i-select>
			</div>
			<div class="fitler-item repair-state">
				<div
					:class="repairState === 1 ? 'active' : ''"
					@click="changeRepairState(1)"
				>
					未处理
				</div>
				<div
					:class="repairState === 0 ? 'active' : ''"
					@click="changeRepairState(0)"
				>
					已处理
				</div>
			</div>
		</div>
		<div class="event-warning-list">
			<i-icon
				type="ios-loading"
				size="54"
				class="demo-spin-icon-load"
				v-show="isShow"
			></i-icon>
			<div
				@click="handleClick(item, index, 'WarningList')"
				v-for="(item, index) in list"
				:key="index"
				class="list-item"
				:class="{ active: activeIndex === index }"
				v-show="!isShow"
			>
				<div class="row">
					<SvgIcon
						:icon-name="
							item.status == '0'
								? 'iconzhengchang'
								: 'iconyichang'
						"
						class="panel-type-icon"
					></SvgIcon>
					<div class="content">
						{{ item.description }}
						<div
							class="level"
							:class="{
								first: item.level === 1,
								second: item.level === 2,
								third: item.level === 3,
							}"
						>
							{{ item.level }}
						</div>
					</div>
				</div>
				<div class="row">
					<div class="station-name">
						{{ item.address }}
					</div>
					<div class="time">
						{{ item.alarmTime }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { SvgIcon } from '../../../../../components/';
import VueSeamLess from 'vue-seamless-scroll';
import GoldChart from '@/openApi';
import {
	INDEXSCENEMAP,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
	AIRSUPPLY_WARN_MODEL_SCENEINDEX,
	AIRSUPPLY_WARN__MODEL_COMPONENTINDEX,
} from '../../../../../config/scene';
export default {
	name: 'ProcessWarningList',
	components: {
		SvgIcon,
		VueSeamLess,
	},
	data() {
		return {
			activeIndex: null,
			list: [],
			isShow: false,
			currentLevel: 1,
			repairState: 1,
			levelList: [
				// { value: 0, label: ''' },
				{ value: 1, label: '一级' },
				{ value: 2, label: '二级' },
				{ value: 3, label: '三级' },
			],
		};
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	async created() {
		this.getData();
		this.timer = setInterval(() => {
			this.getData();
		}, 120000);
	},
	computed: {
		active() {
			return this.$parent.active;
		},
	},
	watch: {
		activeItem(val) {
			if (JSON.stringify(val) == '{}') {
				return (this.activeIndex = null);
			}
			let index = this.list.findIndex(item => {
				let { id } = item;
				return val.id === id;
			});
			this.activeIndex = index > -1 ? index : null;
		},
	},
	methods: {
		changeRepairState(val) {
			this.repairState = val;
			this.getData();
		},
		handleClick(listItem, index) {
			let { address, time } = listItem;
			this.activeIndex = index;
			listItem.status = listItem.status == '1' ? 1 : 0;
			listItem.overlayType = 'WarningList';
			this.$emit('change', listItem);
			//实时报警弹出
			// GoldChart.scene.createSceneInstance(
			// 	AIRSUPPLY_WARN_MODEL_SCENEINDEX,
			// 	'fadeIn',
			// 	'none'
			// );
			// this.$nextTick(() => {
			// 	AIRSUPPLY_WARN__MODEL_COMPONENTINDEX.forEach(item => {
			// 		GoldChart.instance.updateComponent(item, {
			// 			data: {
			// 				time: time,
			// 				title: address,
			// 			},
			// 		});
			// 	});
			// });
			// setTimeout(() => {
			// 	GoldChart.scene.destroyScene(AIRSUPPLY_WARN_MODEL_SCENEINDEX);
			// }, 3000);
		},
		async getData() {
			this.isShow = true;
			this.list = await this.$sysApi.map.airSupply.getProcessWarningList({
				currentPage: 1,
				pageSize: 500,
				priority: this.currentLevel,
				status: this.repairState,
			});
			// setTimeout(() => {
			this.isShow = false;
			// }, 30000);
		},
		// handleClick(item, index) {
		// 	this.activeIndex = index;
		// 	item.status = item.stateName == '处理完成' ? 0 : 1;
		// 	item.overlayType = 'WarningList';
		// 	this.$emit('change', item);
		// },
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
};
</script>

<style lang="scss" scoped>
.process-warning {
	color: #fff;
	font-size: 20px;
	height: 800px;
	.filter-bar {
		position: sticky;
		background: #000866;
		width: 100%;
		position: sticky;
		justify-content: space-between;
		color: #00ddff;
		font-size: 20px;
		padding: 8px 2px 7px 2px;
		// height: 56px;
		border-bottom: 1px solid #00ddff;
		line-height: 38px;
		user-select: none;
		.fitler-item {
			display: flex;
			> div {
				padding: 0 8px;
				cursor: pointer;
			}
			> div:not(:last-child) {
				margin-right: 16px;
			}
		}
		.repair-type {
			.active {
				color: #fff;
				background: #0057a9;
				border: 1px solid #00ddff;
				border-radius: 4px;
			}
		}
		.repair-state {
			.active {
				color: #fff;
				&::after {
					content: ' ';
					display: inline-block;
					position: absolute;
					width: 0px;
					height: 0px;
					left: 4px;
					top: calc(50% - 5px);
					border: 4px solid #fff;
				}
			}
			> div {
				position: relative;
				padding-left: 20px;
				&::before {
					content: ' ';
					display: inline-block;
					position: absolute;
					width: 16px;
					height: 16px;
					left: 0px;
					top: calc(50% - 9px);
					border: 2px solid #00ddff;
				}
			}
		}
	}
	.event-warning-list {
		height: 744px;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	/deep/.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%);
	}
	@keyframes ani-demo-spin {
		from {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	/deep/.demo-spin-col {
		height: 100px;
		position: relative;
		border: 1px solid #eee;
	}
	/deep/.ivu-select-dropdown {
		// top: 32px !important;
		margin-top: 18px !important;

		background: #0057a9;
	}
	/deep/.ivu-select-selection {
		color: #fff;
		background: #0057a9;
		border: 1px solid #57a3f3 !important;
	}
	/deep/.ivu-select {
		padding: 0 !important;
		height: 40px !important;
		font-style: normal !important;
		font-weight: 600 !important;
		font-size: 20px !important;
		// padding-left: 10px !important;
		// width: 72px;
		// height: 32px;
	}
	/deep/.ivu-select-item {
		line-height: 32px;
		line-height: 20px !important;
	}
	/deep/.ivu-select-item:hover {
		background: rgba(0, 221, 255, 0.3) !important;
	}
	/deep/.ivu-select-selected-value {
		padding-left: 13px;
	}
	/deep/.ivu-icon-ios-arrow-down:before {
		font-size: 20px;
		font-weight: 700;
		color: #fff;
	}
	.list-item {
		padding: 16px 8px;
		box-sizing: border-box;
		cursor: pointer;
		&:hover,
		&.active {
			background: rgba(23, 115, 201, 0.4);
		}
		.panel-type-icon {
			width: 24px;
			height: 24px;
			margin-top: 8px;
		}
		.row {
			display: flex;
			// align-items: center;
			.content {
				flex: 1;
				font-size: 24px;
				display: flex;
				align-items: center;
				margin-left: 12px;
				display: flex;
				align-items: center;
				.level {
					width: 20px;
					height: 24px;
					line-height: 24px;
					margin-left: 8px;
					text-align: center;
				}
				.first {
					background: #9e1a14;
				}
				.second {
					background: #be4a18;
				}
				.third {
					background: #cf8900;
				}
			}
			.station-name {
				font-size: 20px;
				flex: 1;
				color: rgba(255, 255, 255, 0.8);
				margin-left: 36px;
			}
			.time {
				color: rgba(255, 255, 255, 0.8);
			}
		}
	}
	.status-err {
		color: #ffdc45;
	}
	.status-suc {
		color: #00ddff;
	}
}
</style>
