<template>
	<!-- <DashboardPanel
		:delay="300"
		:show="ready"
		:speed="300"
		:transition="true"
		class="right-panel"
		enter="animate__animated animate__fadeInRight"
	> -->
	<!-- <tabsTitle /> -->
	<Tabs
		class="tabs-container-ic animate__animated animate__fadeInRight"
		v-model="currentTab"
	>
		<TabPanel
			key="ICCustomerList"
			name="ICCustomerList"
			label="昨日非居民用户用气排行TOP20"
			lazy
		>
			<ICCustomerList
				@change="handleClick"
				:activeOverlay="activeOverlay"
			/>
		</TabPanel>
		<!-- <TabPanel
				key="overlayList"
				name="overlayList"
				label="三社联动"
				lazy
			>
				<overlayList @change="handleClick" />
			</TabPanel> -->
	</Tabs>
	<!-- </DashboardPanel> -->
</template>
<script>
import { DashboardPanel } from '../../../../../components/';
import { Tabs, TabPanel } from '../../../../../components/Tabs/';
// import tabsTitle from '../tabsTitle';
// import overlayList from './overlayList';
// import realTime from './realTime';
import ICCustomerList from './ICCustomerList';
export default {
	name: 'RightlistPanel',
	data() {
		return {
			activeIndex: null,
			ready: false,
			currentTab: 'ICCustomerList',
		};
	},
	props: {
		activeOverlay: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	components: {
		Tabs,
		TabPanel,
		// realTime,
		// DashboardPanel,
		ICCustomerList,
		// tabsTitle,
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
		activeOverlay(val) {
			console.log(val);
		},
	},
	methods: {
		handleClick(item, index) {
			this.activeIndex = index;
			this.$emit('overlay-click', item);
		},
	},
};
</script>

<style lang="scss" scoped>
// .tabs-container-ic {
// 	/deep/ .tabs__header {
// 		display: none !important;
// 	}
// }
// /deep/ .tabs-container-ic {
// 	padding-top: 0px !important;
// }

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
