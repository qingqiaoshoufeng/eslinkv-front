<template lang="pug">
	ul.VoltageRegulator
		NoData(:show="!list.length")
		li(v-for="(k, i) in list" :key="i" v-if="list.length" @click="handleClick(k)")
			img(src="./img/press.svg")
			.main
				.main-1
					.title {{ k.name }}
					.time {{ k.time }}
				.main-2
					.address {{ k.address }}
					.status(:class="{ normal: !k.alarming }")
						.color
						span {{ k.status }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NoData } from '../../../../../components'
import { getPressAlarmList } from '@/components-map-api/map.airSupply.api.js'

@Component({ components: { NoData } })
export default class PressureRegulating extends Vue {
	list: any = []

	handleClick(item) {
		this.$emit('change', {
			...item,
			overlayType: 'VoltageRegulator',
		})
	}

	async mounted() {
		const res = await getPressAlarmList()
		this.list = res.list
	}
}
</script>
<style lang="scss" scoped>
.VoltageRegulator {
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
			cursor: pointer;
		}
		.main {
			flex: 1;
		}
		> img {
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
				color: #feffff;
				width: 234px;
				flex: none;
			}
			.time {
				flex: none;
				font-size: 16px;
				color: #ffffff;
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
				width: 234px;
				flex: none;
			}
			.status {
				display: flex;
				align-items: center;
				font-size: 20px;
				color: #ffdc45;
				width: 170px;
				flex: none;
				.color {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background: #ffdc45;
					margin-right: 8px;
				}
				&.normal {
					color: #fff;
					.color {
						background: #fff;
					}
				}
			}
		}
	}
}
</style>
