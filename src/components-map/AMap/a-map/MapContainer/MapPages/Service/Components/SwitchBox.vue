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
			/>{{ item.value ? 'ON' : 'OFF' }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'SwitchBox',
	props: {
		data: {
			type: Array,
			default() {
				return [];
			},
		},
		className: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	watch: {
		data: {
			handler(val) {
				this.data = val;
			},
			deep: true,
			immediate: true,
		},
	},
	data() {
		return {};
	},
	methods: {
		change(type) {
			this.$emit('switch-change', this.data, type);
		},
	},
	mounted() {
		console.log(this.data);
	},
};
</script>
<style lang="scss" scoped>
.hangrancode_switch_Box {
	padding: 4px 16px;
	position: fixed;
	left: 32px;
	bottom: 32px;
	z-index: 99999;
	display: flex;
	flex-direction: column;
	border: 1px solid #00ddff;
	border-radius: 8px;
	.item {
		margin-top: 1px;
	}
	.label {
		display: inline-block;
		width: 145px;
	}

	.ivu-switch-default:after {
		background-color: rgba(255, 255, 255, 0.4) !important;
		.ivu-switch-inner:after {
			background-color: rgba(255, 255, 255, 0.4) !important;
		}
	}
	.ivu-switch-checked:after {
		background-color: rgba(255, 255, 255, 1) !important;
		.ivu-switch-inner:after {
			background-color: rgba(255, 255, 255, 1) !important;
		}
	}
	div {
		display: flex;
		height: 44px;
		line-height: 44px;
		justify-items: center;
		align-items: center;
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 24px;
		padding-left: 8px;
		/* identical to box height, or 133% */

		/* 辅助色/绿色 */

		color: #00ffcf;
		.ivu-switch {
			margin-left: 12px;
			margin-right: 8px;
		}
	}
}
.left {
	left: 2695px;
}
</style>

