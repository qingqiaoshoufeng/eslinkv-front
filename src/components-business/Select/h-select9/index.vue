<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select5 fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row">
				<span
					class="pos-r pointer"
					:class="{ active: selectValue === 'year' }"
					@click="handleChange('year')"
				>
					年
				</span>
				<span
					class="pos-r pointer"
					:class="{ active: selectValue === 'month' }"
					@click="handleChange('month')"
				>
					月
				</span>
			</h2>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	data() {
		return {
			showOptions: false,
			selectValue: 'month',
		}
	},
	mixins: [widgetMixin],
	methods: {
		handleChange(index) {
			this.selectValue = index
			this.emitComponentUpdate({ type: this.selectValue })
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	mounted() {
		this.emitComponentUpdate({ type: this.selectValue })
	},
}
</script>
<style lang="scss" scoped>
.h-select5 {
	height: 100%;

	h2 {
		align-items: center;
		justify-content: center;
		font-weight: normal;

		span {
			margin-right: 16px;
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
			transition: all 0.3s;

			&:last-child {
				margin-right: 0;
			}

			&::before {
				position: absolute;
				bottom: -5px;
				left: 0;
				width: 100%;
				height: 4px;
				content: '';
				background: transparent;
				transition: all 0.3s;
			}

			&.active {
				color: #fff;

				&::before {
					background: #0df;
				}
			}
		}
	}
}
</style>
