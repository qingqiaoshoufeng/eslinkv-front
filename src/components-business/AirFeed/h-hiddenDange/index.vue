<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div
			class="container"
			:style="{
				transform: `translateX(-${100 * tabSwitch}%)`,
			}"
		>
			<dangerList :data="data.data1"></dangerList>
			<dangerTable :data="data.data2"></dangerTable>
		</div>
		<div class="icon-right" @click="changeTab"></div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import dangerList from './dangerList'
import dangerTable from './dangerTable'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	components: {
		dangerList,
		dangerTable,
	},
	data() {
		return {
			tabSwitch: false,
		}
	},
	methods: {
		changeTab() {
			this.tabSwitch = !this.tabSwitch
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	position: relative;
	overflow: hidden;

	.container {
		display: flex;
		transition: transform 0.4s;
	}

	.icon-right {
		position: absolute;
		top: 74px;
		right: 0;
		width: 20px;
		height: 40px;
		cursor: pointer;
		background: url('./img/page.svg') no-repeat;
		background-size: 100% 100%;
	}
}
</style>
