<template lang="pug">
div
	.pos-a.h-right-bg1(
		v-if="showMapPage === 'AirSupplyHighPressure' || showMapPage === 'AirSupplyLowPressure' || showMapPage === 'AirSupplyUCAN' || showMapPage === 'AirSupplyLNG' || showMapPage === 'ServiceCustomer' || showMapPage === 'serviceICcustomer'")
	.pos-a.h-left-bg2(
		v-if="showMapPage === 'ServiceNineteen' || showMapPage === 'ServiceHangranCode'")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MapBg extends Vue {
	@Prop() showMapPage
}
</script>
<style lang="scss" scoped>
.h-left-bg2 {
	width: 400px;
	height: 1050px;
	top: 0;
	left: 0;
	pointer-events: none;
	background: linear-gradient(
		90deg,
		rgba(0, 4, 98, 1) 0%,
		rgba(0, 4, 98, 0) 100%
	);
}
.h-right-bg1 {
	width: 1024px;
	top: 0;
	right: 0;
	height: 1050px;
	pointer-events: none;
	background-image: -webkit-linear-gradient(
		0deg,
		rgba(0, 4, 98, 0),
		rgba(0, 4, 98, 1)
	);

	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: block;
		content: '';
		background-image: -webkit-linear-gradient(
			0deg,
			rgba(0, 4, 98, 0),
			rgba(0, 4, 98, 1)
		);
	}
}
</style>
