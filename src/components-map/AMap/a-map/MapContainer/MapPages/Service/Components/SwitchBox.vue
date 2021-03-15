<!--杭燃码热力图选择器 -->
<template>
	<div class="hangrancode_switch_Box" :class="className">
		<div class="item" v-for="(item, index) in data" :key="index">
			<span class="label">{{ item.label }}</span>
			<i-switch
				v-model="item.value"
				@on-change="change(item.type)"
				true-color="#0057A9"
				false-color="#0057A9"
			/>
			<div class="desc">{{ item.value ? 'ON' : 'OFF' }}</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'SwitchBox',
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			},
			className: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		watch: {
			data: {
				handler (val) {
					this.data = val
				},
				deep: true,
				immediate: true
			}
		},
		data () {
			return {}
		},
		methods: {
			change (type) {
				this.$emit('switch-change', this.data, type)
			}
		},
		mounted () {}
	}
</script>
<style lang="scss" scoped>
.hangrancode_switch_Box {
	position: fixed;
	bottom: 32px;
	left: 32px;
	z-index: 99999;
	display: flex;
	flex-direction: column;
	padding: 4px 16px;
	border: 1px solid #0df;
	border-radius: 8px;

	.item {
		margin-top: 1px;
	}

	.label {
		display: inline-block;
		min-width: 145px;
	}

	.ivu-switch-default::after {
		background-color: rgba(255, 255, 255, 0.4) !important;

		.ivu-switch-inner::after {
			background-color: rgba(255, 255, 255, 0.4) !important;
		}
	}

	.ivu-switch-checked::after {
		background-color: rgba(255, 255, 255, 1) !important;

		.ivu-switch-inner::after {
			background-color: rgba(255, 255, 255, 1) !important;
		}
	}

	.desc {
		width: 40px;
	}

	div {
		display: flex;
		align-items: center;
		justify-items: center;
		height: 44px;
		padding-left: 8px;
		font-size: 18px;
		font-style: normal;
		font-weight: normal;
		line-height: 44px;
		line-height: 24px;

		/* identical to box height, or 133% */

		/* 辅助色/绿色 */

		color: #00ffcf;

		.ivu-switch {
			margin-right: 8px;
			margin-left: 12px;
		}
	}
}

.left {
	left: 2695px;
}
</style>

