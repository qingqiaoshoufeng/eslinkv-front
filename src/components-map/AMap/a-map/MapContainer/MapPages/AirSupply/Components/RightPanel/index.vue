<template>
	<DashboardPanel
		:delay="0"
		:show="ready"
		:speed="300"
		:transition="true"
		class="right-panel"
		enter="animate__animated animate__fadeInRight"
	>
		<Tabs class="tabs-container" v-model="currentTab">
			<TabPanel key="realTime" name="realTime" label="态势感知" lazy>
				<realTime @change="handleClick" />
			</TabPanel>
			<TabPanel
				key="overlayList"
				name="overlayList"
				label="点位列表"
				lazy
			>
				<overlayList @change="handleClick" />
			</TabPanel>
		</Tabs>
	</DashboardPanel>
</template>

<script>
import { DashboardPanel } from '../../../../../components/';
import { Tabs, TabPanel } from '../../../Components/Tabs/';
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
			this.activeIndex = index;
			this.$emit('overlay-click', item, 'WARN');
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
}
.tabs-container {
	max-height: calc(100vh - 160px);
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
