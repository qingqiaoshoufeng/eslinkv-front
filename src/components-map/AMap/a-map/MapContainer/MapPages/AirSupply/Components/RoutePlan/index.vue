<template ></template>
<script>
import { Overlay } from '../../../Components/index';
let eventTypeIconMap = {
	0: 'iconbaoguanshijian',
	1: 'iconxieloushijian',
};
export default {
	name: 'RoutePlan',
	components: {
		Overlay,
	},
	data() {
		return {};
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
					assignment: {
						lng: 120.1420324,
						gpstime: '2020-11-18 15:30:33.0',
						employeeid: '11005',
						employeename: '阚杰',
						lat: 30.3036494,
					},
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
				let { data } = this;
				let compData = {
					...data,
					assignment: {
						lng: 120.1420324,
						gpstime: '2020-11-18 15:30:33.0',
						employeeid: '11005',
						employeename: '阚杰',
						lat: 30.3036494,
					},
				};
				console.log(this.data);
				let { lat: endLat, lng: endLng, assignment } = compData;
				let { lat: startLat, lng: startLng } = assignment;
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
							var pathData = [];
							steps.forEach(i => {
								let pathArr = i.path;
								pathArr.forEach(({ lng, lat }) => {
									pathData.push([lng, lat]);
								});
							});
							let passedLen = Math.ceil(
								Math.random() * pathData.length
							);
							this.drawLine(
								pathData,
								pathData.slice(0, passedLen),
								[endLng, endLat],
								[startLng, startLat]
							);
						}
					}
				);
			},
			immediate: true,
		},
	},
	methods: {
		drawLine(lineArr, passedPath, endPose, startPose) {
			let map = this.$parent.$amap;
			this.marker = new AMap.Marker({
				map: map,
				position: endPose,
				icon: '/static/amap/car.png',
				offset: new AMap.Pixel(-22, -22),
			});

			// 绘制轨迹
			this.polyline = new AMap.Polyline({
				map: map,
				path: lineArr,
				showDir: true,
				strokeColor: '#FFD200', //线颜色
				strokeWeight: 10, //线宽
			});

			this.passedPolyline = new AMap.Polyline({
				map: map,
				strokeColor: '#BDBDBD', //线颜色
				strokeWeight: 10, //线宽
				strokeOpacity: 1, //线透明度
			});
            let { northEast, southWest } = this.polyline.getBounds();
			this.setRouteFitMap(northEast, southWest);
			this.marker.on('moving', e => {
				this.passedPolyline.setPath(e.passedPath);
			});
			let startAnimation = () => {
				this.marker.moveAlong(passedPath, {
					duration: 100,
					autoRotation: false,
				});
			};
			startAnimation();
		},
		reset() {
			this.map.remove([this.marker, this.passedPolyline, this.polyline]);
		},
		setRouteFitMap(northeast, southwest) {
			let { lat: northeastLat, lng: northeastLng } = northeast;
			let { lat: southwestLat, lng: southwestLng } = southwest;
			let latDiff = Math.abs(northeastLat - southwestLat);
			let lngDiff = Math.abs(northeastLng - southwestLng);
			let diff = 0;
			let ratioLngLat = lngDiff / latDiff;
			//宽度宽了，需要调整
			if (ratioLngLat > 1.5) {
				diff = ((ratioLngLat / 1.5) * latDiff) / 2;
			}
			this.map.setFitView([
				new AMap.Marker({
					position: [northeastLng, northeastLat + diff],
				}),
				new AMap.Marker({
					position: [southwestLng, southwestLat - diff],
				}),
			]);
		},
	},
	beforeDestroy() {
		this.reset();
	},
};
</script>


<style lang="scss">
.amap-icon {
	width: 44px !important;
	height: 44px !important;
	> img {
		width: 44px !important;
		height: 44px !important;
	}
}
</style>