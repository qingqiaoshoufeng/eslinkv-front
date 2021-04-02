<template>
	<div class="process-warning">
		<div class="fn-flex filter-bar">
			<div class="fitler-item">
				<i-select
					class="filter-select"
					v-model="currentLevel"
					style="width: 80px"
					@on-change="getData"
				>
					<i-option
						:style="{
							padding: '0,10px',
							width: '80px',
							height: '32px',
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
				v-show="loading"
			></i-icon>
			<NoData :show="!loading && !list.length" />
			<template v-if="!loading">
				<div
					@click="handleClick(item, index, 'WarningList')"
					v-for="(item, index) in list"
					:key="index"
					class="list-item"
					:class="{ active: activeItem === item }"
					v-show="!loading"
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
			</template>
		</div>
	</div>
</template>

<script>
import { SvgIcon, NoData } from '../../../../../components/'
import { Icon, Select, Option } from 'view-design'

export default {
	name: 'ProcessWarningList',
	components: {
		SvgIcon,
		NoData,
		'i-icon': Icon,
		'i-select': Select,
		'i-option': Option,
	},
	data() {
		return {
			activeIndex: null,
			list: [],
			loading: false,
			loaded: false,
			currentLevel: 1,
			repairState: 1,
			levelList: [
				{ value: 1, label: '一级' },
				{ value: 2, label: '二级' },
				{ value: 3, label: '三级' },
			],
		}
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	// 定时刷新数据
	async created() {
		this.getData()
		this.timer = setInterval(() => {
			this.getData()
		}, 60000)
	},
	computed: {
		active() {
			return this.$parent.active
		},
	},
	methods: {
		changeRepairState(val) {
			this.repairState = val
			this.getData()
		},
		handleClick(listItem, index) {
			const { address, time } = listItem
			this.activeIndex = index
			listItem.status = listItem.status == '1' ? 1 : 0
			listItem.overlayType = 'WarningList'
			this.$emit('change', listItem)
		},
		async getData() {
			// 除第一次需要loading外，其余需要无感刷新
			if (!this.loaded) {
				this.loading = true
			}
			this.list = await this.$api.map.airSupply.getProcessWarningList({
				priority: this.currentLevel,
				status: this.repairState,
			})
			this.loading = false
			this.loaded = true
		},
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	},
}
</script>

<style lang="scss" scoped>
.process-warning {
	height: 800px;
	font-size: 20px;
	color: #fff;
	backface-visibility: hidden;

	.filter-bar {
		position: sticky;
		position: sticky;
		justify-content: space-between;
		width: 100%;
		padding: 8px 2px 7px 2px;
		font-size: 20px;
		line-height: 38px;
		color: #0df;
		user-select: none;
		border-bottom: 1px solid #0df;
		backface-visibility: hidden;

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
				border: 1px solid #0df;
				border-radius: 4px;
			}
		}

		.repair-state {
			.active {
				color: #fff;

				&::after {
					position: absolute;
					top: calc(50% - 5px);
					left: 4px;
					display: inline-block;
					width: 0;
					height: 0;
					content: ' ';
					border: 4px solid #fff;
				}
			}

			> div {
				position: relative;
				padding-left: 20px;

				&::before {
					position: absolute;
					top: calc(50% - 9px);
					left: 0;
					display: inline-block;
					width: 16px;
					height: 16px;
					content: ' ';
					border: 2px solid #0df;
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

	.demo-spin-icon-load {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%);
		animation: ani-demo-spin 1s linear infinite;
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

	&::v-deep {
		.ivu-select-dropdown {
			margin-top: 18px !important;
			background: #0057a9;
		}

		.ivu-select-selection {
			color: #fff;
			background: #0057a9;
			border: 1px solid #57a3f3 !important;
		}

		.ivu-select {
			height: 40px !important;
			padding: 0 !important;
			font-size: 20px !important;
			font-style: normal !important;
			font-weight: 600 !important;
		}

		.ivu-icon-ios-arrow-down::before {
			margin: 0 -6px;
		}

		.ivu-select-item {
			font-size: 20px !important;
			line-height: 32px;
			line-height: 20px !important;
		}

		.ivu-select-item:hover {
			background: rgba(0, 221, 255, 0.3) !important;
		}

		.ivu-select-selected-value {
			padding-left: 13px;
			font-size: 20px !important;
		}

		.ivu-icon-ios-arrow-down::before {
			font-size: 20px;
			font-weight: 700;
			color: #fff;
		}
	}

	.list-item {
		box-sizing: border-box;
		padding: 16px 8px;
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
				display: flex;
				display: flex;
				flex: 1;
				align-items: center;
				align-items: center;
				margin-left: 12px;
				font-size: 24px;

				.level {
					width: 20px;
					height: 24px;
					margin-left: 8px;
					line-height: 24px;
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
				flex: 1;
				margin-left: 36px;
				font-size: 20px;
				color: rgba(255, 255, 255, 0.8);
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
		color: #0df;
	}
}
</style>
