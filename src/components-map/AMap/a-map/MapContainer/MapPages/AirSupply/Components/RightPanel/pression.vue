<template lang="pug">
	ul.pression
		NoData(:show="true")
		li(v-for="(k, i) in 4" :key="i" v-if="false")
			img(src="./img/press.svg")
			.main
				.main-1
					.title 调压器GK38405030
					.time 11-03  08:23:27
				.main-2
					.address 宁围镇振宁路1400号
					.status
						.color
						span 报警类型
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { NoData } from '../../../../../components'

@Component({components: { NoData }})
export default class PressureRegulating extends Vue {
	@Prop() showMapPage

	mounted () {
	}
}
</script>
<style lang="scss" scoped>
.pression {
	position: relative;
	height: 800px;
	font-size: 20px;
	color: #fff;
	backface-visibility: hidden;
	li {
		display: flex;
		padding: 20px 8px 16px;
		&:hover {
			background: rgba(23, 115, 201, 0.54);
		}
		.main {flex: 1;}
		>img {
			width: 24px;
			height: 24px;
			margin-right: 12px;
			margin-top: 5px;
		}
		.main-1 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title {
				font-size: 24px;
				color: #FEFFFF;
			}
			.time {
				font-size: 16px;
				color: #FFFFFF;
			}
		}
		.main-2 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 12px;
			.address {
				font-size: 20px;
				color: rgba(255, 255, 255, 0.75);
			}
			.status {
				display: flex;
				align-items: center;
				font-size: 20px;
				color: #FFDC45;
				.color {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: #FFDC45;
					margin-right: 8px;
				}
			}
		}
	}
}
</style>
