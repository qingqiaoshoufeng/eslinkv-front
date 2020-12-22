<template>
	<Tabs
		class="tabs-container-ic animate__animated animate__fadeInRight"
		v-model="currentTab"
	>
		<TabPanel
			key="ICCustomerList"
			name="ICCustomerList"
			label="上月工商户排行TOP20"
			lazy
		>
			<ICCustomerList
				@change="handleClick"
				:activeOverlay="activeOverlay"
			/>
		</TabPanel>
	</Tabs>
</template>
<script>
import { DashboardPanel } from '../../../../../components/';
import { Tabs, TabPanel } from '../../../../../components/Tabs/';
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
