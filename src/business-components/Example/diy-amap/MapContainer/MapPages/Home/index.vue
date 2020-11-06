<template>
	<div>
		<!-- marker -->
		<template v-if="viewMode === 'main'">
			<!-- 地图站点，应急站，巡检人员等 -->
			<template v-for="(config, legend) in legendMap">
				<template v-for="(item, index) in overlayData[legend] || []">
					<component
						:key="legend + index"
						:marker="{
							...item,
							icon: config.icon,
						}"
						:visible="config.isShow"
						:is="config.component"
						@click="handleMapOverlayClick(item, legend)"
					/>
				</template>
			</template>
			<!-- 态势感知 -->
			<WarningOverlay
				v-for="(item, index) in taskList || []"
				:key="'WARN' + index"
				:marker="item"
				@click="handleMapOverlayClick(item, 'WARN')"
			/>
		</template>
		<!-- 1.2首页路线规划 -->
		<template v-if="viewMode === 'routePlan'">
			<ElAmapMarker
				v-if="showDestination"
				:position="[activeOverlay.lng, activeOverlay.lat]"
				vid="destination"
				:key="activeOverlay.lng"
			>
				<div class="destination">
					<SvgIcon
						class="destination-icon"
						:iconName="activeOverlay.icon"
					></SvgIcon>
					<img
						src="@/assets/amap/images/qiangxiu.gif"
						class="destination-gif"
					/>
				</div>
			</ElAmapMarker>
		</template>
		<!-- 弹窗 -->
		<ElAmapMarker
			v-if="showOverlayDetail"
			:position="[activeOverlay.lng, activeOverlay.lat]"
			vid="stationDetail"
			:zIndex="1400"
		>
			<PopContainer
				class="no-hover-effect"
				v-model="showOverlayDetail"
				@input="handleCloseOverlayDetail"
			>
				<div
					class="station-name"
					v-for="(info, prop) in overlayTypeInfo"
					:style="{
						...info.style,
						color:
							activeOverlay.status == 1
								? info.errColor
								: info.style && info.style.color,
					}"
					:key="prop"
				>
					{{
						info.formatter
							? info.formatter(activeOverlay)
							: activeOverlay[prop]
					}}
				</div>
				<div class="btn" @click="handleViewDetail(activeOverlay)">
					查看详情
				</div>
			</PopContainer>
		</ElAmapMarker>
	</div>
</template>
<script>
import {
	GASSTATIONLIST,
	SURGESTATIONLIST,
	INSPECTIONCAR,
	HOMESITUATIONAWARENESSLIST,
	OVERLAYINFOMAP,
} from '@/business-components/Example/diy-amap/config/index';
import { AMapMarker } from '@/business-components/Example/diy-amap/lib';
import {
	WarningOverlay,
	GasStationOverlay,
	Overlay,
	PopContainer,
	SvgIcon,
} from '@/business-components/Example/diy-amap/components/index';
//高压线
import GaoYaLineJSON from '@/assets/amap/json/gaoya.json';
let eventTypeIconMap = {
	0: 'iconbaoguanshijian',
	1: 'iconxieloushijian',
};
export default {
	components: {
		GasStationOverlay,
		WarningOverlay,
		Overlay,
		PopContainer,
		SvgIcon,
		ElAmapMarker: AMapMarker,
	},
	props: {
		legendMap: {
			type: Object,
			default() {
				return {};
			},
		},
		activeItem: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			viewMode: 'main',
			showOverlayDetail: false,
			showDestination: false,
			activeOverlay: {},
			overlayTypeInfo: {},
			overlayData: {
				GASSTATION: GASSTATIONLIST,
				SURGESTATION: SURGESTATIONLIST,
				INSPECTIONCAR: INSPECTIONCAR,
			},
		};
	},
	created() {
		this.regionPolyGonArr = null;
		this.GAOYAGUANXIAN = null;
		this.map = this.$parent.$amap;
		this.init();
		this.map.on('zoomend', this.handleMapZoomChange);
	},
	computed: {
		taskList() {
			let list = [];
			HOMESITUATIONAWARENESSLIST.forEach(item => {
				let { id } = item;
				let assignment = INSPECTIONCAR.find(person => {
					let { taskId } = person;
					return taskId == id;
				});
				item.assignment = assignment;
				list.push(item);
			});
			return list;
		},
	},
	methods: {
		init() {
			this.drawRegionBoundary(this.map);
			this.drawLine(GaoYaLineJSON, 'GaoYaLine');
			if (this.isMapUIComplete) {
				this.drawPathNavigators();
				return false;
			}
			window.AMapUI.load(
				['ui/misc/PathSimplifier', 'lib/$'],
				(PathSimplifier, $) => {
					if (!PathSimplifier.supportCanvas) {
						alert('当前环境不支持 Canvas！');
						return;
					}
					var emptyLineStyle = {
						strokeStyle: '#BDBDBD',
						lineWidth: 10,
						dirArrowStyle: false,
					};
					var pathSimplifierIns = new PathSimplifier({
						zIndex: 1000,
						autoSetFitView: false,
						map: this.map, //所属的地图实例
						getPath: function(pathData) {
							return pathData.path;
						},
						getHoverTitle: function() {
							return null;
						},
						renderOptions: {
							getPathStyle: function(pathItem, zoom) {
								let { name } = pathItem.pathData;
								let lineStyle = {
									lineWidth: 0,
									fillStyle: null,
									strokeStyle: null,
									borderStyle: null,
								};
								if (name === '已行驶的路线') {
									lineStyle = emptyLineStyle;
								}

								return {
									pathLineStyle: lineStyle,
									pathLineSelectedStyle: lineStyle,
									pathLineHoverStyle: lineStyle,
									keyPointStyle: lineStyle,
									startPointStyle: null,
									endPointStyle: null,
									keyPointHoverStyle: lineStyle,
									keyPointOnSelectedPathLineStyle: lineStyle,
								};
							},
						},
					});
					this.pathSimplifierIns = pathSimplifierIns;
					this.PathSimplifier = PathSimplifier;
					this.isMapUIComplete = true;
					this.drawPathNavigators();
				}
			);
		},
		//绘制行政区域
		drawRegionBoundary(map) {
			var district = new window.AMap.DistrictSearch({
					extensions: 'all',
					subdistrict: 0,
					level: 'district',
				}),
				districts = [
					'江干区',
					'上城区',
					'下城区',
					'拱墅区',
					'西湖区',
					'滨江区',
					'萧山区',
					'余杭区',
					'富阳区',
					'临安区',
					'桐庐县',
					'淳安县',
					'建德市',
				];
			this.regionPolyGonArr = [];
			districts.forEach(area => {
				district.search(area, (status, result) => {
					var bounds = result.districtList[0].boundaries;
					if (bounds) {
						for (var i = 0, l = bounds.length; i < l; i++) {
							let ploygon = new window.AMap.Polygon({
								path: bounds[i],
								map,
								strokeWeight: 2,
								fillOpacity: 0.8,
								fillColor: '#002276',
								strokeOpacity: '1',
								strokeStyle: 'dashed',
								strokeColor: '#509CE1',
							});
							this.regionPolyGonArr.push(ploygon);
						}
					}
				});
			});
		},
		//加载管线
		drawLine(data, lineName) {
			var line = new window.AMap.GeoJSON({
				geoJSON: data,
				getPolyline: function(geojson, lnglats) {
					return new AMap.Polyline({
						path: lnglats,
						strokeWeight: 3,
						strokeColor: '#04F499',
					});
				},
			});
			line.setMap(this.map);
			this[lineName] = line;
		},
		//绘制线路
		drawPathNavigators() {
			var data = [];
			this.taskList.forEach(item => {
				let {
					content,
					lat: endLat,
					lng: endLng,
					assignment,
					status,
				} = item;
				if (status === 0) return false;
				let { lat: startLat, lng: startLng } = assignment;
				data.push({
					name: assignment.name + ' - ' + content,
					path: this.PathSimplifier.getGeodesicPath(
						[startLng, startLat],
						[endLng, endLat],
						100
					),
				});
			});
			this.pathSimplifierIns.setData(data);
			this.startMove(data.length);
		},
		startMove(Len) {
			for (var i = 0; i < Len; i++) {
				var nav = this.pathSimplifierIns.createPathNavigator(i, {
					loop: true,
					speed: 3000,
					pathNavigatorStyle: {
						width: 24,
						height: 24,
						strokeStyle: null,
						fillStyle: null,
						//经过路径的样式
						pathLinePassedStyle: {
							lineWidth: 6,
							strokeStyle: null,
							dirArrowStyle: {
								stepSpace: 15,
								strokeStyle: '#FFD200',
							},
						},
					},
				});
				nav.start();
			}
		},
		handleHomeLegendClick(val, isShow) {
			//val 说明是绘制的线条
			if (this[val]) {
				if (isShow) {
					this[val].show();
				} else {
					this[val].hide();
				}
			}
			if (this.activeOverlay && this.activeOverlay.overlayType === val) {
				this.handleCloseOverlayDetail();
			}
		},
		handleMapOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.overlayTypeInfo = OVERLAYINFOMAP[overlayType];
			this.showOverlayDetail = true;
			this.map.setZoom(14);
			if (isCenter) {
				this.$nextTick(() => {
					this.map.panTo([lng, lat]);
				});
			}
		},
		handleCloseOverlayDetail() {
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.overlayTypeInfo = {};
			this.$emit('close');
			this.map && this.map.setZoom(11);
		},
		initHomeRoute(val) {
			this.changeViewMode('routePlan');
			if (this.isMapUIComplete) {
				this.resetHomeRoute(val);
			} else {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
				this.timer = setInterval(() => {
					if (this.isMapUIComplete) {
						this.timer = null;
						this.resetHomeRoute(val);
					}
				}, 1000);
			}
		},
		changeViewMode(val) {
			if (val == 'main') {
				this.clearRoutePlanMap();
				setTimeout(() => {
					this.initOverview();
				}, 100);
			} else {
				this.clearMainMap();
			}
			this.viewMode = val;
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
		//绘制线路
		makePathAndTrack(pathData, passedData, isComplete = false) {
			// 绘制规划的线路
			const polyline = new AMap.Polyline({
				map: this.map,
				path: pathData,
				showDir: true,
				strokeColor: isComplete ? '#BDBDBD' : '#FFD200',
				strokeOpacity: 1,
				strokeWeight: 10,
				strokeStyle: 'solid',
				lineJoin: 'round',
				zIndex: 999,
			});
			polyline.setMap(this.map);
			let { northeast, southwest } = polyline.getBounds();
			console.log(northeast, southwest);
			this.setRouteFitMap(northeast, southwest);
			if (isComplete) {
				return false;
			}
			setTimeout(() => {
				//绘制已行驶的线路
				this.pathSimplifierIns = this.pathSimplifierIns;
				this.pathSimplifierIns.setData([
					{
						name: '已行驶的路线',
						path: passedData,
					},
				]);
				this.nav = this.pathSimplifierIns.createPathNavigator(0, {
					loop: false,
					speed: 3000,
					pathNavigatorStyle: {
						autoRotate: false,
						width: 40,
						height: 40,
						//使用图片
						content: this.PathSimplifier.Render.Canvas.getImageContent(
							'@/assets/amap/car.png',
							() => {
								this.pathSimplifierIns.renderLater();
							}
						),
						strokeStyle: null,
						fillStyle: null,
						//经过路径的样式
						pathLinePassedStyle: {
							strokeStyle: '#BDBDBD',
							borderStyle: '#BDBDBD',
							lineWidth: 6,
							dirArrowStyle: false,
						},
					},
				});
				this.nav.start();
			}, 400);
		},
		handleViewDetail(data) {
			let { timeInSeconds, id, taskId, overlayType } = data;
			console.log(data, 'data');
			if (overlayType === 'INSPECTIONCAR' && taskId) {
				let task = this.taskList.find(task => {
					return task.id === taskId;
				});
				this.initHomeRoute(task);
			}
			this.initHomeRoute(data);
		},
		clearMainMap() {
			if (this.map) this.map.clearMap();
			this.clearPathNavigators();
		},
		clearPathNavigators() {
			this.pathSimplifierIns &&
				this.pathSimplifierIns.clearPathNavigators();
		},
		clearRoutePlanMap() {
			if (this.nav) {
				this.nav.destroy();
				this.pathSimplifierIns.setData([]);
				this.pathSimplifierIns.clearPathNavigators();
			}
		},
		handleMapZoomChange() {
			let operateName = this.map.getZoom() > 12 ? 'hide' : 'show';
			this.regionPolyGonArr.forEach(polygon => {
				polygon[operateName]();
			});
		},
	},
	beforeDestroy() {
		this.map.off('zoomend', this.handleMapZoomChange);
		let { viewMode } = this;
		if (viewMode === 'main') {
			this.clearMainMap();
		} else {
			this.clearRoutePlanMap();
		}
		this.map.clearMap();
	},
};
</script>

 <style lang="scss" scoped>
.destination {
	text-align: center;
	cursor: pointer;
	.destination-icon {
		font-size: 48px;
	}
	.destination-gif {
		display: block;
		width: 100px;
		height: 35px;
		margin-top: -14px;
	}
}
.station-name {
	font-size: 24px;
}
.content {
	font-size: 18px;
	margin-top: 8px;
	color: '#FFD200';
}
.btn {
	padding: 0px 8px;
	line-height: 32px;
	background: #0057a9;
	border-radius: 4px;
	display: inline-block;
	cursor: pointer;
	margin-top: 16px;
	&:hover {
		opacity: 0.8;
	}
}
</style>

