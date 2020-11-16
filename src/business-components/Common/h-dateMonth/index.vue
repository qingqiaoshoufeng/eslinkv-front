<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-dateMonth fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row">
				<div class="h-dateMonth-left" @click="handleChange(-1)"/>
				<span>{{now}}</span>
				<div :class="{disabled}" class="h-dateMonth-right"
					 @click="handleChange(1)"/>
			</h2>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import addMonths from 'date-fns/addMonths'
	import isSameMonth from 'date-fns/isSameMonth'
	import format from 'date-fns/format'

	const config = {animation: true}

	const value = {
		api: {
			bind: {
				enable: true,
				role: ['provider']
			}
		}
	}
	export default {
		data() {
			return {
				showOptions: false,
				selectValue: new Date()
			}
		},
		computed: {
			disabled() {
				return isSameMonth(new Date(), this.selectValue)
			},
			now() {
				return format(this.selectValue, 'yyyy.MM')
			}
		},
		mixins: [mixins],
		methods: {
			handleChange(index) {
				if (index > 0) {
					if (isSameMonth(new Date(), this.selectValue)) {
						return
					}
				}
				this.selectValue = addMonths(this.selectValue, index)
				this.emitComponentUpdate({value: this.selectValue, label: this.now})
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss" scoped>
	.h-dateMonth-left {
		background-image: url('/static/icons/h-dateMonth-1.svg');
		width: 8px;
		height: 32px;
		background-repeat: no-repeat;
		background-position: center;
	}

	.h-dateMonth-right {
		transform: rotate(180deg);
		background-image: url('/static/icons/h-dateMonth-1.svg');
		width: 8px;
		height: 32px;
		background-repeat: no-repeat;
		background-position: center;

		&.disabled {
			filter: grayscale(100%)
		}
	}

	.h-dateMonth {
		height: 100%;

		h2 {

			align-items: center;
			font-weight: normal;
			justify-content: center;

			span {
				color: #fff;
				width: 79px;
				height: 32px;
				background: #0057A9;
				border-radius: 4px;
				font-size: 18px;
				line-height: 32px;
				margin: 0 12px;
			}

			img {
				margin-right: 8px;
			}
		}
	}

</style>

