区域边界线
<script>
import overlayMixin from '../../../../mixins/overlayMixin.js';
import axios from 'axios';
export default {
	name: 'SaleAreaBoundary',
	mixins: [overlayMixin],
	props: {
		selectAreaChange: {
			type: Function,
		},
		value: {
			type: String,
			default: '杭州钱江燃气有限公司',
		},
	},
	watch: {
		value: {
			handler(val, valOld) {
				if (val === valOld) {
					return false;
				}
				if (valOld) {
					let instanceIndexOld = this._instanceMap[valOld];
					this.instanceArr[instanceIndexOld].setOptions({
						fillOpacity: 0,
					});
				}
				if (val) {
					let instanceIndex = this._instanceMap[val];
					this.instanceArr[instanceIndex].setOptions({
						fillOpacity: 0.6,
					});
				}
			},
		},
	},
	methods: {
		init() {
			this.drawSaleAreaBoundary(this.$amap);
		},
		drawSaleAreaBoundary(map) {
			axios.get('/static/amap/json/saleArea.json').then(res => {
				let saleAreaJson = res.data || [];
				this._instanceMap = {};
				Object.keys(saleAreaJson).forEach((area, index) => {
					this._instanceMap[area] = index;
					let instance = new window.AMap.Polygon({
						path: saleAreaJson[area],
						map,
						zIndex: 2000,
						strokeWeight: 2,
						fillOpacity: 0,
						fillColor: '#0085FF',
						strokeOpacity: 1,
						strokeStyle: 'dashed',
						strokeColor: '#FFDC45',
						extData: {
							area: area,
						},
					});
					// if (this.selectAreaChange) {
					instance.on('mouseover', e => {
						let areaData = e.target._opts.extData || {};
						let { area } = areaData;
						if (this.value !== area) {
							instance.setOptions({
								fillOpacity: 0.6,
							});
						}
					});
					instance.on('click', e => {
						let areaData = e.target._opts.extData || {};
						let { area } = areaData;
						this.$emit('input', area);
					});
					instance.on('mouseout', e => {
						let areaData = e.target._opts.extData || {};
						let { area } = areaData;
						if (this.value !== area) {
							instance.setOptions({
								fillOpacity: 0,
							});
						}
					});
                    this.instanceArr.push(instance);
                    //默认选中
					if (this.value) {
						let instanceIndex = this._instanceMap[this.value];
						this.instanceArr[instanceIndex].setOptions({
							fillOpacity: 0.6,
						});
					}
				});
			});
		},
	},
	render() {
		return null;
	},
};
</script>

