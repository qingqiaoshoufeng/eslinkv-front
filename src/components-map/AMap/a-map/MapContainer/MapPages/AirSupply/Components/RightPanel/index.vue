<template>
	<Tabs
		class="tabs-container animate__animated animate__fadeInRight"
		:value="value"
		@input="val => $emit('input', val)"
	>
		<TabPanel
			key="processWarning"
			name="processWarning"
			label="工艺报警"
		>
			<processWarning @change="handleClick" />
		</TabPanel>

		<TabPanel key="realTime" name="realTime" label="事件报警">
			<realTime @change="handleClick" />
		</TabPanel>

		<TabPanel key="overlayList" name="overlayList" label="点位列表" lazy>
			<overlayList @change="handleClick" />
		</TabPanel>
	</Tabs>
</template>

<script>
import { Tabs, TabPanel } from '../../../../../components/Tabs/';
import overlayList from './overlayList';
import realTime from './realTime';
import processWarning from './processWarning';
import statAawareness from './statAawareness';

export default {
	name: 'RightlistPanel',
	data() {
		return {
			activeIndex: null,
			ready: false,
		};
	},
	props: {
		value: {
			type: String,
			default: 'processWarning',
		},
	},
	components: {
		Tabs,
		TabPanel,
		overlayList,
		realTime,
		processWarning,
		statAawareness,
	},
	mounted() {
		this.ready = true;
	},
	methods: {
		handleClick(item) {
			this.geocoder = new AMap.Geocoder({
				city: '330100', //杭州市范围内查询
			});
			//普通报警地点，调用高德地址查询地址
			if (!item.lat) {
				this.geocoder.getLocation(item.address, (status, result) => {
					if (status === 'complete' && result.geocodes.length) {
						var lnglat = result.geocodes[0].location;
						let { lng, lat } = lnglat;
						item.lat = lat;
						item.lng = lng;
						this.$emit('overlay-click', item);
					} else {
						//查询失败则默认杭然地址
						item.lat = 30.273297;
						item.lng = 120.151562;
						console.log('根据地址查询位置失败');
					}
				});
			} else {
				this.$emit('overlay-click', item);
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
