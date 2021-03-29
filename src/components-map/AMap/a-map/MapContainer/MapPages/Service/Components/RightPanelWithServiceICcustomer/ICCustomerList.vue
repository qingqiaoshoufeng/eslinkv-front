<template>
	<div class="list">
		<NoData :show="!list.length && !loading" />
		<i-icon
			type="ios-loading"
			size="54"
			class="demo-spin-icon-load"
			v-show="loading"
		></i-icon>
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
			v-show="!loading"
		>
			<div class="row">
				<img
					:src="iconList[index]"
					alt=""
					v-if="index < 3"
					class="panel-type-icon"
				/>
				<div class="panel-type-desc" v-else>
					{{ index + 1 }}
				</div>
				<div class="content">
					{{ item.name }}
				</div>
				<div>
					<SvgIcon
						:icon-name="statusList[item.isUp]"
						class="panel-type-icon"
					></SvgIcon>
				</div>
			</div>
			<div class="row">
				<div class="station-name">
					{{ `${item.num.toLocaleString()}m³` }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { SvgIcon, NoData } from '../../../../../components/'
	import { SERVICE_SERVICEICCUSTOMER_LEGEND_MAP } from '../../serviceICcustomer/config'
	import { Icon } from 'view-design'

	export default {
		name: 'HomeRealTimeList',
		components: {
			SvgIcon,
			NoData,
			'i-icon': Icon
		},
		data () {
			const iconList = [
				'/static/images/amap/first.svg',
				'/static/images/amap/second.svg',
				'/static/images/amap/third.svg'
			]
			const statusList = {
				up: 'iconup',
				down: 'icondown',
				parallel: 'iconkeep'
			}
			return {
				activeIndex: null,
				list: [],
				iconList,
				statusList,
				loading: true,
				loaded: false
			}
		},
		props: {
			activeItem: {
				type: Object,
				default () {
					return {}
				}
			},
			activeOverlay: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		async created () {
			this.getData()
			this.timer = setInterval(() => {
				this.getData()
			}, 60000)
		},
		watch: {
			activeItem (val) {
				if (JSON.stringify(val) == '{}') {
					return (this.activeIndex = null)
				}
				const index = this.list.findIndex((item) => {
					const { id } = item
					return val.id === id
				})
				this.activeIndex = index > -1 ? index : null
			}
		},
		methods: {
			async getData () {
				// 除第一次需要loading外，其余需要无感刷新
				if (!this.loaded) {
					this.loading = true
				}
				const data = await this.$api.map.serve.getICcustomerSituationAwareness()
				this.list = data
				this.loading = false
				this.loaded = true
			},
			handleClick (item, index) {
				this.activeIndex = index
				const {
					detailList,
					component: overlayType
				} = SERVICE_SERVICEICCUSTOMER_LEGEND_MAP.WarningICcustomer

				this.$emit('change', {
					...item,
					type: 'ICcustomer',
					detailList,
					overlayType,
					activeIndex: this.activeIndex
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep.demo-spin-icon-load {
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

.list {
	height: 799px;
	overflow-y: scroll;
	font-size: 16px;
	color: #fff;

	&::-webkit-scrollbar {
		display: none;
	}

	.list-item {
		box-sizing: border-box;
		// height: 96px;
		// display: flex;
		padding: 16px 8px;
		// justify-content: space-between;
		cursor: pointer;

		&:hover,
		&.active {
			background: rgba(23, 115, 201, 0.4);
		}

		.panel-type-icon {
			width: 24px;
			height: 24px;
		}

		.panel-type-desc {
			width: 24px;
			height: 24px;
			font-size: 20px;
			font-style: normal;
			font-weight: normal;
			line-height: 24px;
			color: #fff;
			text-align: center;
			background: #0057a9;
			border-radius: 50%;
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
