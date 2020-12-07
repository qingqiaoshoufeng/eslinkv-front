<template>
	<Overlay
		:key="'warn111'"
		:marker="{
			icon,
			...data,
		}"
		ref="marker"
		:visible="true"
		@click="$emit('click', item)"
	>
		<img src="@/assets/amap/images/qiangxiu.gif" class="warnoverlay-gif" />
	</Overlay>
</template>
<script>
import { Overlay } from '../../../../../components/index';
let eventTypeIconMap = {
	0: 'iconbaoguanshijian',
	1: 'iconxieloushijian',
};
export default {
	name: 'RoutePlan',
	inject: ['parentInfo'],
	components: {
		Overlay,
	},
	data() {
		return {
			icon: 'iconbaoguanshijian',
		};
	},
	props: {
		data: {
			type: Object,
			default() {
				return {
					content: '改装工单',
					address: '龙湖天街滨江店',
					id: 10,
					status: 1,
					timeInSeconds: 1,
					statusText: '待处理',
					lng: 120.288668,
					lat: 30.316372,
					eventType: 1,
					time: '11-03 08: 32: 15',
				};
			},
		},
	},
	created() {
		this.map = this.$parent.$amap;
	},
	watch: {
		data: {
			handler(val) {
				this.reset();
				setTimeout(async () => {
					let { data } = this;
					let {
						lat: endLat,
						lng: endLng,
						employeeName,
						callDate,
						arrivalTime,
					} = data;
					//渲染一次后，需手动调整位置
					if (this.$refs.marker) {
						this.$refs.marker.$amapComponent.setPosition(
							new window.AMap.LngLat(endLat, endLat)
						);
					}
					if (!employeeName || !callDate) {
						console.error('还没有接单或者派人');
						return false;
					}
					let passedPathData = await this.$sysApi.map.airSupply.getEmployeeGpsTrack(
						{ employeeName, callDate, arrivalTime }
					);
					if (!passedPathData) {
						console.error('无人员位置信息');
						return false;
					}
					//arrivalTime ？ '已到达'：'规划路线'
					if (arrivalTime) {
						this.drawLine(passedPathData);
					} else {
						let [startLng, startLat] = passedPathData[
							passedPathData.length - 1
						];
						//构造路线导航类
						if (!this.driving) {
							this.driving = new AMap.Driving({
								hideMarkers: true,
								showTraffic: false,
								isOutline: false,
								autoFitView: true,
							});
						}
						this.driving.search(
							new AMap.LngLat(startLng, startLat),
							new AMap.LngLat(endLng, endLat),
							(status, result) => {
								if (status === 'complete') {
									const { routes = [] } = result;
									const { steps = [] } = routes[0];
									var planPathData = [];
									steps.forEach(i => {
										let pathArr = i.path;
										pathArr.forEach(({ lng, lat }) => {
											planPathData.push([lng, lat]);
										});
									});
									this.drawLine(passedPathData, planPathData);
								}
							}
						);
					}
				}, 1000);
			},
			immediate: true,
		},
	},
	methods: {
		drawLine(passedPathData = [], planPathData = []) {
			let map = this.$parent.$amap;
			// 1.已行驶路径 + 预测轨迹
			let pathDataAll = [...passedPathData, ...planPathData];
			this.pathAll = new AMap.Polyline({
				map: map,
				path: pathDataAll,
				showDir: true,
				strokeColor: '#FFD200', //线颜色
				strokeOpacity: 1,
				fillColor: '#FFD200', //线颜色
				strokeWeight: 6, //线宽
			});
			// 2.车辆位置
			let markerPose = passedPathData[passedPathData.length - 1];
			this.marker = new AMap.Marker({
				map: map,
				position: AMap.LngLat(...markerPose),
				icon: '/static/amap/car.png',
				offset: new AMap.Pixel(-8, -8),
			});
			// 3.轨迹回放
			if (passedPathData.length > 1) {
				this.passedPolyline = new AMap.Polyline({
					map: map,
					zIndex: 1500,
					strokeColor: '#BDBDBD', //线颜色
					fillColor: '#BDBDBD', //线颜色
					strokeWeight: 6, //线宽
					strokeOpacity: 1, //线透明度
				});
				this.marker.on('moving', e => {
					this.passedPolyline.setPath(e.passedPath);
				});
				let startAnimation = () => {
					this.marker.moveAlong(passedPathData, {
						duration: 100,
						// autoRotation: false,
					});
				};
				startAnimation();
			}
			let { scaleRatio } = this.parentInfo;
			let paddingTop = (1050 - 1050 * scaleRatio) / 2;
			let paddingRight = (3500 * scaleRatio) / 2.6;
			let paddingLeft = 3500 - paddingRight * 1.6;
			console.log(pathDataAll[0]);
			console.log(pathDataAll[pathDataAll.length - 1]);
			console.log(paddingTop, paddingRight);
			this.map.setFitView(null, [
				paddingTop+80,
				paddingTop,
				paddingRight,
				paddingLeft,
			]);
		},
		reset() {
			if (this.map) {
				this.passedPolyline && this.map.remove(this.passedPolyline);
				this.marker && this.map.remove(this.marker);
				this.pathAll && this.map.remove(this.pathAll);
			}
		},
	},
	beforeDestroy() {
		this.reset();
	},
};
</script>


<style lang="scss">
.amap-icon {
	width: 16px !important;
	height: 32px !important;
	> img {
		width: 16px !important;
	}
}
.warnoverlay-gif {
	transform: translateX(-50%);
	position: absolute;
	display: block;
	width: 100px;
	height: 35px;
	margin-top: -14px;
	margin-left: 19px;
}

// img {
// 	width: 100%;
// }
</style>
