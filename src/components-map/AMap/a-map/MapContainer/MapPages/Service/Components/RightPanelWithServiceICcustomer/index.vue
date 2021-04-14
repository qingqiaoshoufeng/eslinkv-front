<template>
	<Tabs
		class="tabs-container-ic animate__animated animate-fadeInRight"
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
import { Tabs, TabPanel } from '../../../../../components/Tabs/'
import ICCustomerList from './ICCustomerList'
export default {
	name: 'RightlistPanel',
	data() {
		return {
			activeIndex: null,
			ready: false,
			currentTab: 'ICCustomerList',
		}
	},
	props: {
		activeOverlay: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	components: {
		Tabs,
		TabPanel,
		ICCustomerList,
	},
	mounted() {
		this.ready = true
	},
	watch: {
		activeItem(val) {
			if (JSON.stringify(val) == '{}') {
				return (this.activeIndex = null)
			}
			const index = this.data.findIndex(item => {
				const { id } = item
				return val.id === id
			})
			this.activeIndex = index > -1 ? index : null
		},
	},
	methods: {
		handleClick(item, index) {
			this.activeIndex = index
			this.$emit('overlay-click', item)
		},
	},
}
</script>

<style lang="scss" scoped>
.tabs-container-ic {
	backface-visibility: hidden;
}

.right-panel {
	position: absolute;
	top: 148px;
	right: 32px;
	z-index: 100;
	width: 480px;
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
