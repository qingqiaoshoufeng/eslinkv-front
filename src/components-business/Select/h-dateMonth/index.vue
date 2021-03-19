<template lang="pug">
	.widget-part.pos-r(:style="styles")
		.h-dateMonth.fn-flex.flex-row.pos-r
			h2.fn-flex.flex-row
				.h-dateMonth-left(@click="handleChange(-1)")
				span {{now}}
				.h-dateMonth-right(:class="{disabled}" @click="handleChange(1)")
</template>
<script lang="ts">
	import mx from 'eslinkv-npm/mixins'
	import { Component, Watch } from 'vue-property-decorator'
	import { mixins } from 'vue-class-component'
	import addMonths from 'date-fns/addMonths'
	import isSameMonth from 'date-fns/isSameMonth'
	import format from 'date-fns/format'
	import { customConfig, value } from './index.component'
	import instance from 'eslinkv-npm/src/store/instance.store'

	@Component
	class HDateMonth extends mixins(mx) {
		lastDay: Date = new Date()
		showOptions: Boolean = false
		selectValue: Date = addMonths(new Date(), -1)
		instance = instance.state

		@Watch('data', { immediate: true, deep: true })
		onDataChange (val) {
			if (val) {
				this.lastDay = new Date(val[0].month_id)
				this.selectValue = new Date(val[0].month_id)
			}
		}

		get disabled () {
			if (new Date().getDate() === 1) {
return true
}
			return isSameMonth(this.lastDay, this.selectValue)
		}

		get now () {
			return format(this.selectValue, 'yyyy.MM')
		}

		handleChange (index) {
			if (index > 0) {
				if (isSameMonth(new Date(this.lastDay), this.selectValue)) {
					return
				}
			}
			this.selectValue = addMonths(this.selectValue, index)
			this.emitComponentUpdate({ month: format(this.selectValue, 'yyyy-MM') })
			if (this.config.config.links) {
				const links = JSON.parse(this.config.config.links)
				links.forEach(ref => {
					let dom
					if (this.kanboardEditor.$refs[ref]) {
						dom = this.kanboardEditor.$refs[ref][0].$refs.widgets
					} else {
						if (this.instance.createKanboard) {
							if (instance.actions.createKanboard.$refs[ref]) {
								dom = instance.actions.createKanboard.$refs[ref][0].$refs.widgets
							}
						}
					}
					if (typeof dom.updateComponent === 'function') {
dom.updateComponent({ month: format(this.selectValue, 'yyyy-MM') })
}
					dom.updateAjax({ month: format(this.selectValue, 'yyyy-MM') })
				})
			}
		}

		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}

		mounted () {
			this.emitComponentUpdate({ month: format(this.selectValue, 'yyyy-MM') })
			if (this.config?.config?.links) {
				const links = JSON.parse(this.config.config.links)
				links.forEach(ref => {
					let dom
					if (this.kanboardEditor.$refs[ref]) {
						dom = this.kanboardEditor.$refs[ref][0].$refs.widgets
					} else {
						if (this.instance.createKanboard) {
							if (instance.actions.createKanboard.$refs[ref]) {
								dom = instance.actions.createKanboard.$refs[ref][0].$refs.widgets
							}
						}
					}
					if (typeof dom.updateComponent === 'function') {
dom.updateComponent({ month: format(this.selectValue, 'yyyy-MM') })
}
					dom.updateAjax({ month: format(this.selectValue, 'yyyy-MM') })
				})
			}
		}
	}

	export default HDateMonth
</script>
<style lang="scss" scoped>
	.h-dateMonth-left {
		width: 8px;
		height: 32px;
		cursor: pointer;
		background-image: url('/static/icons/h-dateMonth-1.svg');
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0.6;

		&:hover {
			opacity: 1;
		}
	}

	.h-dateMonth-right {
		width: 8px;
		height: 32px;
		cursor: pointer;
		background-image: url('/static/icons/h-dateMonth-1.svg');
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0.6;
		transform: rotate(180deg);

		&:hover {
			opacity: 1;
		}

		&.disabled {
			filter: grayscale(100%);
		}
	}

	.h-dateMonth {
		height: 100%;

		h2 {
			align-items: center;
			justify-content: center;
			font-weight: normal;

			span {
				width: 79px;
				height: 32px;
				margin: 0 12px;
				font-size: 18px;
				line-height: 32px;
				color: #fff;
				background: #0057a9;
				border-radius: 4px;
			}

			img {
				margin-right: 8px;
			}
		}
	}

</style>

