<!-- 门站 -->
<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
			...$attrs,
			data,
		}"
		@click="handleOverlayClick"
	>
		<template slot-scope="{ data }">
			<div :class="[{ active: active }, data.inletDirection]">
				<div class="arrow" v-if="data.inletDirection && data.inlet">
					{{ data.inlet }}
				</div>
				<p class="stationName">{{ data.name }}</p>
				<div class="wave"></div>
			</div>
		</template>
	</BaseOverlay>
</template>
<script>
	import {
		AIRSUPPLY_ARTWORK_MODEL_SCENEINDEX,
		AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX1,
		AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX2
	} from '../../../../config/scene'
	import { BaseOverlay } from '../../../../components/index'
	import { scene, instance } from 'eslinkv-sdk'
	export default {
		name: 'GasStation',
		components: {
			BaseOverlay
		},
		props: {
			visible: {
				type: Boolean,
				default: true
			},
			overlayIcon: {
				type: String,
				default: ''
			},
			overlayType: {
				type: String,
				default: ''
			},
			active: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array
			},
			detailList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			const apiFun = this.$api.map.mock.getGasStationList
			return {
				apiFun: apiFun,
				propDwMap: {
					flow: 'm³/h',
					inPressure: 'MPa',
					inTemp: '℃',
					outPressure: 'MPa',
					outTemp: '℃',
					todayAirFeed: 'm³'
				},
				mouseIn: false
			}
		},
		methods: {
			async handleOverlayClick (marker) {
				if (!marker.detail) {
					const { id = '', name = '', type = '' } = marker
					let data = {}
					const dataComp = {}
					try {
						data = await this.$api.map.airSupply.getStationRealTimeInfo(
							{
								id,
								name,
								type
							}
						)
					} catch (error) {
						console.error(error, '接口报错')
					}
					Object.keys(data).forEach((prop) => {
						const dw = this.propDwMap[prop]
						if (typeof data[prop] !== 'object') {
							return false
						}
						data[prop].forEach((item, index) => {
							const { name, value } = item
							const propInner = prop + index
							dataComp[propInner] = {
								label: name,
								value: value,
								dw
							}
						})
					})
					marker.detail = dataComp
				}
				this.$emit('overlay-click', marker, 'GasStation', false)
			},
			viewDetail (marker) {
				const { name, id } = marker
				scene.actions.createSceneInstance(
					AIRSUPPLY_ARTWORK_MODEL_SCENEINDEX,
					'slideRight'
				)
				this.$nextTick(() => {
					AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX1.forEach((item) => {
						instance.actions.updateComponent(item, {
							data: {
								label: name,
								title: name,
								image: name,
								stationId: id
							}
						})
					})
					AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX2.forEach((item) => {
						instance.actions.updateComponent(item, {
							params: {
								id
							}
						})
					})
					setTimeout(() => {
						this.$emit('close')
					}, 2000)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
img {
	width: 100%;
}

.active {
	z-index: 999;
	padding: 0;

	.wave {
		animation: wave 2s infinite;
	}
}

.right {
	.arrow {
		top: 50%;
		left: 100%;
		width: 100px;
		padding-left: 5px;
		margin-top: -44px;
		line-height: 88px;
		background: url('/static/amap/arrow-right.svg');
		background-repeat: no-repeat;
		animation: fade-left-fade-out 5s infinite;
	}
}

.down {
	.arrow {
		top: 100%;
		left: 50%;
		width: 88px;
		padding-top: 20px;
		margin-left: -44px;
		background: url('/static/amap/arrow-down.svg');
		background-repeat: no-repeat;
		animation: fade-up-fade-out 5s infinite;
	}

	.stationName {
		top: auto;
		bottom: 100%;
	}
}

.up {
	.arrow {
		bottom: 100%;
		left: 50%;
		box-sizing: border-box;
		width: 88px;
		height: 66px;
		padding-top: 20px;
		margin-left: -44px;
		background: url('/static/amap/arrow-up.svg');
		background-repeat: no-repeat;
		animation: fade-down-fade-out 5s infinite;
	}
}

.stationIcon {
	width: 100%;
}

.stationName {
	position: absolute;
	left: 50%;
	font-size: 24px;
	font-weight: 700;
	color: #fff;
	white-space: nowrap;
	transform: translateX(-50%);
}

.arrow {
	position: absolute;
	width: 33px;
	height: 88px;
	font-size: 26px;
	color: #62fff5;
}
// }

@keyframes fade-down-fade-out {
	0% {
		opacity: 0;
		transform: translateY(-50px);
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: translateY(0);
	}
}

@keyframes fade-up-fade-out {
	0% {
		opacity: 0;
		transform: translateY(50px);
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: translateY(0);
	}
}

@keyframes fade-left-fade-out {
	0% {
		opacity: 0;
		transform: translateX(50px);
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: translateX(0);
	}
}

@keyframes fade-right-fade-out {
	0% {
		opacity: 0;
		transform: translateX(-50px);
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: translateX(0);
	}
}

@keyframes wave {
	0% {
		opacity: 0;
		transform: scale(1);
	}

	50% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: scale(1.5);
	}
}
</style>
