区域边界线
<script>
import overlayMixin from '../../mixins/overlayMixin.js';
export default {
	name: 'RegionBoundary',
	mixins: [overlayMixin],
	created() {
		//根据缩放比例控制显示隐藏
		this.$amap.on('zoomend', this.handleMapZoomChange);
	},
	props: {
		selectAreaChange: {
			type: Function,
		},
	},
	methods: {
		init() {
			this.drawRegionBoundary(this.$amap);
		},
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
			this.instanceArr = [];
			districts.forEach(area => {
				district.search(area, (status, result) => {
					var bounds = result.districtList[0].boundaries;
					if (bounds) {
						for (var i = 0, l = bounds.length; i < l; i++) {
							let instance = new window.AMap.Polygon({
								path: bounds[i],
								strokeWeight: 1,
								fillOpacity: 0.6,
								fillColor: '#0054B7',
								strokeOpacity: '1',
								strokeStyle: 'dashed',
								// strokeColor: '#FFDC45',
								strokeColor: '#509CE1',
								strokeDasharray: [3, 6],
								extData: {
									area: area,
								},
							});

							if (this.instanceArr) {
                                //选中区域
								if (this.selectAreaChange) {
									instance.on('mouseover', e => {
										let areaData = e.target._opts.extData;
										this.selectAreaChange(areaData);
										instance.setOptions({
											fillColor: '#0085FF',
										});
									});
									instance.on('mouseout', () => {
										this.selectAreaChange();
										instance.setOptions({
											fillColor: '#0054B7',
										});
									});
								}
								map.add(instance);
								this.instanceArr.push(instance);
							}
						}
					}
				});
			});
		},
		handleMapZoomChange() {
			if (!this.visible) return false;
			let operateName = this.$amap.getZoom() > 12 ? 'hide' : 'show';
			this.instanceArr.forEach(instance => {
				instance[operateName]();
			});
		},
	},
	render() {
		return null;
	},
	beforeDestroy() {
		this.$amap.off('zoomend', this.handleMapZoomChange);
	},
};
</script>

