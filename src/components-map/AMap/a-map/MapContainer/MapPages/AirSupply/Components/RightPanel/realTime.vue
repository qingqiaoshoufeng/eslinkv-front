<template>
	<div class="event-warning">
		<div class="fn-flex filter-bar">
			<div class="fitler-item repair-type">
				<div
					:class="repairType === '抢修' ? 'active' : ''"
					@click="changeRepairType('抢修')"
				>
					抢修
				</div>
				<div
					:class="repairType === '维修' ? 'active' : ''"
					@click="changeRepairType('维修')"
				>
					维修
				</div>
			</div>
			<div class="fitler-item repair-state">
				<div
					:class="repairState === '未处理' ? 'active' : ''"
					@click="changeRepairState('未处理')"
				>
					未处理
				</div>
				<div
					:class="repairState === '处理完成' ? 'active' : ''"
					@click="changeRepairState('处理完成')"
				>
					已处理
				</div>
			</div>
		</div>
		<div class="event-warning-list">
			<div
				@click="handleClick(item, index, 'WarningList')"
				v-for="(item, index) in list"
				:key="index"
				class="list-item"
				:class="{ active: activeIndex === index }"
			>
				<div class="row">
					<SvgIcon
						:icon-name="
							item.stateName == '处理完成'
								? 'iconzhengchang'
								: 'iconyichang'
						"
						class="panel-type-icon"
					></SvgIcon>
					<div class="content">
						{{ item.repairContent }}
					</div>
					<div>
						{{ item.callDate }}
					</div>
				</div>
				<div class="row">
					<div class="station-name">
						{{ item.address }}
					</div>
					<div
						:class="[
							'status',
							item.stateName == '处理完成'
								? 'status-suc'
								: 'status-err',
						]"
					>
						{{ item.stateName }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { SvgIcon } from '../../../../../components/';

export default {
	name: 'HomeRealTimeList',
	components: {
		SvgIcon,
	},
	data() {
		return {
			activeIndex: null,
			list: [],
			repairType: '抢修',
			repairState: '未处理',
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
	computed: {
		active() {
			return this.$parent.active;
		},
	},
	async created() {
		this.getData();
		this.timer = setInterval(() => {
			this.getData();
		}, 120000);
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
		changeRepairState(repairState) {
			this.repairState = repairState;
			this.getData();
		},
		changeRepairType(repairType) {
			this.repairType = repairType;
			this.getData();
		},
		async getData() {
			let { list } = await this.$sysApi.map.airSupply.getEventWarningList(
				{
					currentPage: 1,
					pageSize: 500,
					repairType: this.repairType,
					repairState: this.repairState,
				}
			);
			this.list = list;
		},
		handleClick(item, index) {
			this.activeIndex = index;
			item.status = item.stateName == '处理完成' ? 0 : 1;
			item.overlayType = 'WARNEVENT';
			this.$emit('change', item);
		},
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
.event-warning {
	height: 800px;
	.filter-bar {
		justify-content: space-between;
		color: #00ddff;
		font-size: 20px;
		padding: 8px 2px 7px 2px;
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
					top: calc(50% - 4px);
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
					top: calc(50% - 8px);
					border: 2px solid #00ddff;
				}
			}
		}
	}
	.event-warning-list {
		height: 744px;
		color: #fff;
		font-size: 16px;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			display: none;
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
			}
			.row {
				display: flex;
				align-items: center;
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
		.status-suc {
			color: #00ddff;
		}
		.status-err {
			color: #ff7217;
		}
	}
}
</style>
