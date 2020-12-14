<template></template>
<script>
function findAmapRoot() {
	if (this.$amap) return this.$amap;
	let parent = this.$parent;
	if (parent) {
		let fun = findAmapRoot.bind(parent);
		return fun();
	}
}
import { Overlay } from '../../../../../components/index';
export default {
	name: 'RoutePlan',
	inject: ['parentInfo'],
	components: {
		Overlay,
	},
	data() {
		return {
			icon: 'iconbaoguanshijian',
			isExecuteFlag: false,
		};
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	watch: {
		data: {
			handler(val) {
				this.reset();
				//数据返回延迟，防止多次点击
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
				this.timer = setInterval(() => {
					if (!this.isExecuteFlag) {
						this.getData();
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000);
			},
			immediate: true,
		},
	},
	created() {
		let fun = findAmapRoot.bind(this);
		this.map = fun();
	},
	methods: {
		async getData() {
			let { data } = this;
			let {
				lat: endLat,
				lng: endLng,
				employeeName,
				callDate,
				arrivalTime,
			} = data;
			this.isExecuteFlag = true;
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
						this.isExecuteFlag = false;
					}
				);
			}
		},
		drawLine(passedPathData = [], planPathData = []) {
			let map = this.map;
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
			let paddingH = 1050 - 1050 * scaleRatio;
			let paddingW = 3500 - 3500 * scaleRatio;
			this.map.setFitView(this.pathAll, false, [
				paddingH * 0.5 + 80,
				paddingH * 0.5 + 40,
				paddingW * 0.55,
				paddingW * 0.45,
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
