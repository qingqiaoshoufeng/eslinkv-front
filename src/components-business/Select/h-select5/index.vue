<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select5 fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row">
				<span class="pos-r pointer" :class="{active:selectValue==='year'}" @click="handleChange('year')">年</span>
				<span class="pos-r pointer" :class="{active:selectValue==='month'}" @click="handleChange('month')">月</span>
				<span class="pos-r pointer" :class="{active:selectValue==='day'}" @click="handleChange('day')">日</span>
			</h2>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

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
				selectValue: 'month'
			}
		},
		mixins: [mixins],
		methods: {
			handleChange(index) {
				this.selectValue = index
				this.emitComponentUpdate({type: this.selectValue})
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		},
		mounted() {
			this.emitComponentUpdate({type: this.selectValue})
		}
	}
</script>
<style lang="scss" scoped>

	.h-select5 {
		height: 100%;

		h2 {
			align-items: center;
			font-weight: normal;
			justify-content: center;

			span {
				font-size: 18px;
				line-height: 24px;
				margin-right: 16px;
				color: rgba(255, 255, 255, 0.75);
				transition: all .3s;

				&:last-child {
					margin-right: 0;
				}

				&:before {
					content: '';
					position: absolute;
					width: 100%;
					height: 4px;
					background: transparent;
					bottom: -5px;
					left: 0;
					transition: all .3s;
				}

				&.active {
					color: #FFFFFF;

					&:before {
						background: #00DDFF;
					}
				}

			}
		}
	}

</style>

