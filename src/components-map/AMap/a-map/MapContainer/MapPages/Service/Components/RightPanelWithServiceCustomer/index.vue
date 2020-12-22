<template>
	<Tabs
		class="tabs-container animate__animated animate__fadeInRight"
		v-model="currentTab"
	>
		<TabPanel key="realTime" name="realTime" label="任务工单" lazy>
			<realTime @change="handleClick" :activeOverlay="activeOverlay" />
		</TabPanel>
		<TabPanel key="overlayList" name="overlayList" label="三社联动" lazy>
			<overlayList @change="handleClick" :activeOverlay="activeOverlay" />
		</TabPanel>
	</Tabs>
</template>

<script>
import { DashboardPanel } from '../../../../../components/';
import { Tabs, TabPanel } from '../../../../../components/Tabs/';
import overlayList from './overlayList';
import realTime from './realTime';
export default {
	name: 'RightlistPanel',
	data() {
		return {
			// activeIndex: null,
			ready: false,
			currentTab: 'realTime',
		};
	},
	props: {
		activeOverlay: {
			Type: Object,
			default() {
				return {};
			},
		},
	},
	components: {
		Tabs,
		TabPanel,
		overlayList,
		realTime,
		DashboardPanel,
	},
	mounted() {
		this.ready = true;
	},
	watch: {
		activeItem(val) {
			if (JSON.stringify(val) == '{}') {
				return (this.activeIndex = null);
			}
			let index = this.data.findIndex(item => {
				let { id } = item;
				return val.id === id;
			});
			this.activeIndex = index > -1 ? index : null;
		},
	},
	methods: {
		handleClick(item, index) {
			// debugger;
			this.geocoder = new AMap.Geocoder({
				city: '330100', //杭州市范围内查询
			});
			// console.log(item.lat);
			if (!item.lat) {
				this.geocoder.getLocation(item.address, (status, result) => {
					if (status === 'complete' && result.geocodes.length) {
						var lnglat = result.geocodes[0].location;
						let { lng, lat } = lnglat;
						item.lat = lat;
						item.lng = lng;

						console.log(lat, lng);
						this.activeIndex = index;
						this.$emit('list-click', item);
					} else {
						//查询失败则默认杭然地址
						item.lat = 30.273297;
						item.lng = 120.151562;
						this.activeIndex = index;
						this.$emit('list-click', item);
					}
				});
			} else {
				this.$emit('list-click', item);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.right-panel {
	position: absolute;
	right: 32px;
	top: 148px;
	width: 480px;
	z-index: 100;
	max-height: 860px;
}
.tabs-container {
	max-height: 846px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
