<template lang="pug">
	.container
		.tabs
			.tab(@click="tab=0" :class="{active: tab===0}") 工艺预警
			.tab(@click="tab=1" :class="{active: tab===1}") 事件预警
			.tab(@click="tab=2" :class="{active: tab===2}") 调压器预警
			.icon-wrap.tab(:class="{active: tab===3}")
				img.icon(src="./img/pos-active.svg" v-if="tab===3")
				img.icon(src="./img/pos.svg" @click="tab=3" v-else)
		.content
			processWarning(
				v-show="tab === 0"
				:activeItem="rightListActiveItemMap['processWarning'] || {}"
				@change="handleClick"
				ref="processWarning"
			)
			eventWarning(
				v-show="tab === 1"
				:activeItem="rightListActiveItemMap['eventWarning'] || {}"
				@change="handleClick"
				ref="eventWarning"
			)
			overlayList(
				v-show="tab === 3"
				:activeItem="rightListActiveItemMap['overlayList'] || {}"
				@change="handleClick"
				ref="overlayList"
				:stationList="stationList"
			)
</template>

<script>
import { Tabs, TabPanel } from '../../../../../components/Tabs/'
import overlayList from './overlayList'
import eventWarning from './eventWarning'
import processWarning from './processWarning'

export default {
	name: 'RightlistPanel',
	data() {
		return {
			ready: false,
			tab: 0,
		}
	},
	props: {
		stationList: {
			type: Array,
			default() {
				return []
			},
		},
		rightListActiveItemMap: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	components: {
		Tabs,
		TabPanel,
		overlayList,
		eventWarning,
		processWarning,
	},
	mounted() {
		this.ready = true
	},
	methods: {
		handleClick(item, eventType) {
			this.geocoder = new AMap.Geocoder({
				city: '330100', // 杭州市范围内查询
			})
			// 普通报警地点，调用高德地址查询地址
			if (!item.lat) {
				this.geocoder.getLocation(item.address, (status, result) => {
					if (status === 'complete' && result.geocodes.length) {
						const lnglat = result.geocodes[0].location
						const { lng, lat } = lnglat
						item.lat = lat
						item.lng = lng
					} else {
						// 查询失败则默认杭然地址
						item.lat = 30.273297
						item.lng = 120.151562
						console.log('根据地址查询位置失败')
					}
					this.$emit('overlay-click', item)
				})
			} else {
				this.$emit('overlay-click', item, eventType)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	top: 148px;
	right: 32px;
	z-index: 100;
	width: 480px;
	max-height: 860px;
}
.tabs {
	background: rgba(0, 87, 169, 0.5);
	border: 1px solid #1773c9;
	width: 480px;
	height: 48px;
	font-size: 24px;
	color: rgba(255, 255, 255, 0.75);
	display: flex;
	align-items: center;
	padding: 0 7px 0 16px;
	.tab {
		position: relative;
		height: 100%;
		line-height: 48px;
		flex: 1;
		cursor: pointer;
		&.active {
			font-weight: bold;
			color: #ffffff;
			&:after {
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 0;
				height: 0;
				content: '';
				border-color: transparent transparent #0df;
				border-style: solid;
				border-width: 0 8px 4px;
				transform: translateX(-50%);
			}
		}
	}
	.icon-wrap {
		flex: 0 0 30px;
		display: flex;
		align-items: center;
	}
	.icon {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
}
.content {
	max-height: 846px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
