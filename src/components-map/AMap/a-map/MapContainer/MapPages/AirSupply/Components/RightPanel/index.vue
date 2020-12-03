<template>
	<Tabs
		class="tabs-container animate__animated animate__fadeInRight"
		:value="value"
		@input="val => $emit('input', val)"
	>
		<!-- <TabPanel key="statAawareness" name="statAawareness" label="态势感知">
			<statAawareness @change="handleClick" />
		</TabPanel> -->
		<TabPanel key="realTime" name="realTime" label="事件报警" lazy>
			<realTime @change="handleClick" />
		</TabPanel>
		<TabPanel
			key="realTimeWithLevel"
			name="realTimeWithLevel"
			label="事件报警"
			lazy
		>
			<realTimeWithLevel @change="handleClick" />
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
import realTimeWithLevel from './realTimeWithLevel';
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
			default: 'realTimeWithLevel',
		},
	},
	components: {
		Tabs,
		TabPanel,
		overlayList,
		realTime,
		realTimeWithLevel,
		statAawareness,
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
		handleClick(item, overlayType) {
			console.log(overlayType, 'overlayType');
			item.overlayType = overlayType;
			this.$emit('overlay-click', item, overlayType || 'WARN');
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
