<template >
	<Overlay
		key="destination"
		:marker="{
			icon: 'iconcheliang',
			...data,
		}"
		:visible="true"
		@click="$emit('click', item)"
	>
		<img src="/static/images/amap/qiangxiu.gif" class="destination-gif" />
	</Overlay>
</template>
<script>
import { Overlay } from '../../../Components/index';

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
				return {};
			},
		},
	},
	created() {
		//加载轨迹控制器
		if (!window.PathSimplifier) {
			window.AMapUI.load(
				['ui/misc/PathSimplifier', 'lib/$'],
				(PathSimplifier, $) => {
					if (!PathSimplifier.supportCanvas) {
						alert('当前环境不支持 Canvas！');
						return;
					}
					window.PathSimplifier = PathSimplifier;
				}
			);
        }
        thsi.resetHomeRoute()
    },
	methods: {
		clearRoutePlanMap() {
			if (this.nav) {
				this.nav.destroy();
				this.pathSimplifierIns.setData([]);
				this.pathSimplifierIns.clearPathNavigators();
			}
		},
		//路线规划
		drawDrivingLine(val) {
			// 根据起终点经纬度规划驾车导航路线
			let {
				lat: endLat,
				lng: endLng,
				assignment,
				status: dataStatus,
			} = val;
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
						let pathDataLen = pathData.length;
						let passedLen =
							dataStatus === 1
								? Math.ceil(Math.random() * pathDataLen * 0.6)
								: pathDataLen;
						this.makePathAndTrack(
							pathData,
							pathData.slice(0, passedLen),
							dataStatus === 0
						);
					}
				}
			);
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
		resetHomeRoute(val) {
			val.icon = eventTypeIconMap[val.status];
			this.clearRoutePlanMap();
			this.$nextTick(() => {
				this.drawDrivingLine(val);
				this.activeOverlay = val;
				this.showDestination = true;
			});
		},
	},
};
</script>
