<template>
	<div class="list">
		<i-icon
			type="ios-loading"
			size="54"
			class="demo-spin-icon-load"
			v-show="loading"
		></i-icon>
		<NoData :show="!loading && !list.length" />
		<div
			@click="handleClick(item, index)"
			v-for="(item, index) in list"
			:key="index"
			class="list-item"
			:class="{
				active:
					activeIndex === index &&
					activeOverlay.activeIndex === index,
			}"
		>
			<div class="row">
				<SvgIcon
					v-if="item.icon"
					:icon-name="item.icon"
					class="panel-type-icon"
				></SvgIcon>
				<div class="content">
					<div class="name">
						{{ item.name }}
					</div>

					<div class="time">
						{{ item.time }}
					</div>
				</div>
			</div>
			<div class="row">
				<div class="station-name">
					<div>
						{{ item.address }}
					</div>
				</div>
				<div
					:class="[
						'status',
						item.status == 0 ? 'status-suc' : 'status-err',
					]"
				>
					{{ item.statusText }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Icon } from 'view-design'
import { SvgIcon, NoData } from '../../../../../components/'
import { SERVICE_SERVICECUSTOMER_LEGEND_MAP } from '../../serviceCustomer/config'
export default {
	name: 'overlayList',
	components: {
		SvgIcon,
		NoData,
		'i-icon': Icon,
	},
	data() {
		return {
			activeIndex: null,
			list: [],
			loading: false,
			loaded: false,
		}
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {}
			},
		},
		activeOverlay: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	created() {
		this.getData()
		this.timer = setInterval(() => {
			this.getData()
		}, 60000)
	},
	watch: {
		activeItem(val) {
			if (JSON.stringify(val) == '{}') {
				return (this.activeIndex = null)
			}
			const index = this.list.findIndex(item => {
				const { id } = item
				return val.id === id
			})
			this.activeIndex = index > -1 ? index : null
		},
	},
	methods: {
		async getData() {
			// 除第一次需要loading外，其余需要无感刷新
			if (!this.loaded) {
				this.loading = true
			}
			const res = await this.$api.map.serve.getServiceCustomerThreeSocialList()
			this.list = res.map(item => {
				const { stationType } = item
				const config = SERVICE_SERVICECUSTOMER_LEGEND_MAP[stationType]
				if (config) {
					item.icon = config.legendIcon
				}
				return item
			})
			this.loading = false
			this.loaded = true
		},
		handleClick(item, index) {
			this.activeIndex = index
			item.overlayType = 'ThreeSocialLinkage'
			this.$emit('change', { ...item, activeIndex: index })
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.list {
	height: 799px;
	overflow-y: scroll;
	backface-visibility: hidden;
	font-size: 16px;
	color: #fff;

	&::-webkit-scrollbar {
		display: none;
	}

	.list-item {
		box-sizing: border-box;
		// height: 96px;
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
				justify-content: space-between;
				margin-left: 12px;
				font-size: 24px;

				.name {
					width: 320px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.time {
					font-size: 20px;
					font-style: normal;
					font-weight: normal;
					line-height: 16px;
					color: #fff;
				}
			}

			.status {
				font-size: 20px;
			}

			.station-name {
				flex: 1;
				margin-left: 36px;
				font-size: 20px;
				color: rgba(255, 255, 255, 0.8);
			}
		}
	}

	&::v-deep.demo-spin-icon-load {
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
