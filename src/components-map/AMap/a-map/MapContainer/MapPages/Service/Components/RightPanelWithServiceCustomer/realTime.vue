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
				<SvgIcon
					:icon-name="
						item.status == 0 ? 'iconzhengchang' : 'iconyichang'
					"
					class="panel-type-icon"
				></SvgIcon>
				<div class="content">
					{{ item.content }}
				</div>
				<div class="time">
					{{ item.time }}
				</div>
			</div>
			<div class="row">
				<div class="station-name">
					{{ item.address }}
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
	import { SvgIcon, NoData } from '../../../../../components/'
	import { Icon } from 'view-design'
	export default {
		name: 'realTime',
		components: {
			SvgIcon,
			'i-icon': Icon,
			NoData
		},
		data () {
			return {
				activeIndex: null,
				list: [],
				clickNumber: 0,
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
				const index = this.list.findIndex(item => {
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
				const data = await this.$api.map.serve.getServiceCustomerTaskList()
				this.list = data
				this.loading = false
				this.loaded = true
			},
			handleClick (item, index) {
				item.activeIndex = index
				this.activeIndex = index
				item.overlayType = 'TaskList'
				this.$emit('change', item)
			},
			beforeDestroy () {
				if (this.timer) {
					clearInterval(this.timer)
					this.timer = null
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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

			.status {
				font-size: 20px;
			}

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

			.time {
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
}
</style>
