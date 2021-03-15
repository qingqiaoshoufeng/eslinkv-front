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
							{{ item.repairContent || '其他' }}
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
			</template>
		</div>
	</div>
</template>

<script>
	import { SvgIcon, NoData } from '../../../../../components/'
	import { Icon } from 'view-design'
	export default {
		name: 'HomeRealTimeList',
		components: {
			SvgIcon,
			NoData,
			'i-icon': Icon
		},
		data () {
			return {
				list: [],
				repairType: '抢修',
				repairState: 1,
				loading: false,
				loaded: false
			}
		},
		props: {
			activeItem: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			active () {
				return this.$parent.active
			}
		},
		async created () {
			this.getData()
			this.timer = setInterval(() => {
				this.getData()
			}, 60000)
		},
		methods: {
			changeRepairState (repairState) {
				this.repairState = repairState
				this.getData()
			},
			changeRepairType (repairType) {
				this.repairType = repairType
				this.getData()
			},
			async getData () {
				// 除第一次需要loading外，其余需要无感刷新
				if (!this.loaded) {
					this.loading = true
				}
				const data = await this.$sysApi.map.airSupply.getEventWarningList({
					repairType: this.repairType,
					repairState: this.repairState
				})
				this.list = data
				this.loading = false
				this.loaded = true
			},
			handleClick (item) {
				item.status = item.stateName == '处理完成' ? 0 : 1
				item.overlayType = 'WARNEVENT'
				this.$emit('change', item)
			}
		},
		beforeDestroy () {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		}
	}
</script>

<style lang="scss" scoped>
.event-warning {
	height: 800px;
	font-size: 20px;

	.filter-bar {
		justify-content: space-between;
		padding: 8px 2px 7px 2px;
		font-size: 20px;
		line-height: 38px;
		color: #0df;
		user-select: none;
		border-bottom: 1px solid #0df;

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
		font-size: 20px;
		color: #fff;

		&::-webkit-scrollbar {
			display: none;
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
			}

			.row {
				display: flex;
				align-items: center;

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

		.status-err {
			color: #ffdc45;
		}

		.status-suc {
			color: #0df;
		}
	}

	/deep/.demo-spin-icon-load {
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
}
</style>
