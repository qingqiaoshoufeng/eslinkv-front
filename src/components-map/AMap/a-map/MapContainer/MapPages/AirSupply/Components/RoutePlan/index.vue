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
			isExecuteFlag: false, //是否正在请求数据
			drawLineIndex: 0, //当前请求的index
			duration: 6, //6秒内播放完毕
			planPathData: [],
			passedPathData: [],
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
				//记录当前数据变更次数
				this.drawLineIndex++;
				this.$emit('view-detail');
				this.getData(this.drawLineIndex);
			},
			immediate: true,
		},
		passedPathData(val) {
			this.reset();
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.drawLine(this.passedPathData, this.planPathData);
			}, 1000);
		},
	},
	created() {
		let fun = findAmapRoot.bind(this);
		this.map = fun();
	},
	methods: {
		async getData(drawLineIndex) {
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
					new AMap.LngLat(endLat, endLat)
				);
			}
			if (!employeeName || !callDate) {
				console.error('还没有接单或者派人');
				return false;
			}
			let passedPathData = [];
			try {
				passedPathData = await this.$sysApi.map.airSupply.getEmployeeGpsTrack(
					{ employeeName, callDate, arriveDate: arrivalTime }
				);
			} catch (error) {
				console.log('error', error);
				return false;
			}
			//判断接口返回数据是否为最新
			if (this.drawLineIndex !== drawLineIndex) {
				return false;
			}
			if (!passedPathData || !passedPathData.length) {
				console.error('无人员位置信息');
				return false;
			}
			//arrivalTime ？ '已到达'：'规划路线'
			if (arrivalTime) {
				this.planPathData = [];
				this.passedPathData = passedPathData;
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
							//有异步数据，需重新判断下
							if (this.drawLineIndex === drawLineIndex) {
								this.planPathData = planPathData;
								this.passedPathData = passedPathData;
							}
						}
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
			let markerPose = passedPathData[0];
			this.marker = new AMap.Marker({
				map: map,
				position: markerPose,
				icon: '/static/amap/car-1.png',
				offset: new AMap.Pixel(-8, -8),
				autoRotation: true,
				//   angle:90,
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
					//计算速度
					let totalDistance = AMap.GeometryUtil.distanceOfLine(
						passedPathData
					);
					let speed =
						totalDistance / 1000 / (this.duration / 60 / 60);
					this.marker.moveAlong(passedPathData, speed);
				};
				startAnimation();
			}
			let { scaleRatio } = this.parentInfo;
			let paddingH = 1050 - 1050 * scaleRatio;
			let paddingW = window.innerWidth * (1 - scaleRatio);
			let otherInstance = this.$parent.getDetailOverlayInstance();
			this.map.setFitView([this.pathAll, otherInstance], false, [
				80,
				10,
				paddingW * 0.6,
				paddingW * 0.4,
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
	width: 32px !important;
	height: 16px !important;
	> img {
		width: 32px !important;
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
</style>
