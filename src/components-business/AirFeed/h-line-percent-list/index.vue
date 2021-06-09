<template>
	<div class="h-line-percent-list widget-part" :style="styles">
		<h-line-percent-item
			class="h-line-percent-list__item"
			v-for="(item, index) in computedList"
			:maxAmout="maxAmout"
			:item="item"
			:key="index"
		/>
	</div>
</template>
<script>
import { widgetMixin } from '@eslinkv/vue2'
import HLinePercentItem from './HLinePercentItem'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	components: {
		HLinePercentItem,
	},
	data() {
		return {
			list: [],
		}
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	computed: {
		maxAmout() {
			const list = this.list || []
			const amoutList = list.reduce((initVal, val) => {
				initVal.push(val?.amount || 0)
				return initVal
			}, [])
			return Math.max(...amoutList)
		},
		computedList() {
			if (this.list.length) {
				return this.list.map((item, index) => {
					const startColor = !index ? '#FF7217' : '#00DDFF'
					const endColor = !index
						? 'rgba(255, 114, 23, 0)'
						: 'rgba(0, 221, 255, 0)'
					let NOBg
					if (index === 0) {
						NOBg = '#FF7217'
					} else if (index === 1 || index === 2) {
						NOBg = '#0057A9'
					} else {
						NOBg = 'rgba(255, 255, 255, 0.2)'
					}

					item.styles = { NOBg, startColor, endColor }
					return item
				})
			} else {
				return []
			}
		},
	},
	methods: {
		initList(_list = []) {
			if (_list.length) {
				return _list.map((item, index) => {
					item.NO = `0${index + 1}`
					return item
				})
			} else {
				return []
			}
		},
	},
	watch: {
		data: {
			handler(val) {
				if (val) {
					this.list = this.initList(val.list)
				}
			},
		},
		immediate: true,
		deep: true,
	},
	mounted() {
		if (this.data) {
			this.list = this.initList(this.data.list)
		}
	},
}
</script>
<style lang="scss">
.h-line-percent-list {
	flex-direction: column;
	flex-wrap: wrap;
	margin-top: -16px;
	margin-left: 0;
	overflow: hidden;

	&__item {
		margin-top: 16px;
		margin-left: 0;
	}
}
</style>
