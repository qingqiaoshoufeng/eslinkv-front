<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select6 fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row">
<!--				<span class="pos-r pointer" :class="{active:selectValue==='day'}" @click="handleChange('day')">日对比</span>-->
				<span class="pos-r pointer" :class="{active:selectValue==='month'}" @click="handleChange('month')">月对比</span>
				<span class="pos-r pointer" :class="{active:selectValue==='year'}" @click="handleChange('year')">年对比</span>
			</h2>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import { value } from './index.component'

	export default {
		data() {
			return {
				selectValue: 'year'
			}
		},
		mixins: [mixins],
		methods: {
			handleChange(index) {
				this.selectValue = index
				this.emitComponentUpdate({compareType: this.selectValue})
			},
		},
		created() {
			this.configValue = this.parseConfigValue(value)
		},
		mounted() {
			this.emitComponentUpdate({compareType: this.selectValue})
		}
	}
</script>
<style lang="scss" scoped>

	.h-select6 {
		height: 100%;

		h2 {
			align-items: center;
			font-weight: normal;
			justify-content: center;

			span {
				width: 88px;
				height: 32px;
				font-size: 18px;
				line-height: 32px;
				margin-right: 8px;
				color: rgba(255, 255, 255, 0.75);
				background: #0057A9;
				border-radius: 4px;
				border: 1px solid #0057A9;
				transition: all .3s;

				&:last-child {
					margin-right: 0;
				}

				&.active {
					color: #FFFFFF;
					border: 1px solid #00DDFF;
				}

			}
		}
	}

</style>

