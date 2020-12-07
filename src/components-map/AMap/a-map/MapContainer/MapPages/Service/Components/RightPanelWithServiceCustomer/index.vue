<template>
	<!-- <DashboardPanel
		:delay="300"
		:show="ready"
		:speed="300"
		:transition="true"
		class="right-panel"
		enter="animate__animated animate__fadeInRight"
	> -->
	<Tabs
		class="tabs-container animate__animated animate__fadeInRight"
		v-model="currentTab"
	>
		<TabPanel key="realTime" name="realTime" label="任务工单" lazy>
			<realTime @change="handleClick" />
		</TabPanel>
		<TabPanel key="overlayList" name="overlayList" label="三社联动" lazy>
			<overlayList @change="handleClick" />
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
			activeIndex: null,
			ready: false,
			currentTab: 'realTime',
		};
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
			console.log('list-click');
			this.activeIndex = index;
			console.log(item);
			this.$emit('list-click', item);
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
