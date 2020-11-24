<!--杭燃码热力图选择器 -->
<template>
	<div class="hangrancode_switch_Box">
		<div>
			累计联码数量热力
			<i-switch
				v-model="data.switch1"
				@on-change="change(1)"
				true-color="#0057A9"
				false-color="#0057A9"
			/>{{ data.switch1 ? 'no' : 'off' }}
		</div>
		<div>
			月操作数量热力
			<i-switch
				v-model="data.switch2"
				@on-change="change(2)"
				true-color="#0057A9"
				false-color="#0057A9"
			/>{{ data.switch2 ? 'no' : 'off' }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'SwitchBox',
	data() {
		return {
			data: {
				switch1: true,
				switch2: false,
			},
		};
	},
	methods: {
		change(e) {
			if (e === 1) {
				this.data.switch1 && (this.data.switch2 = false);
			} else {
				this.data.switch2 && (this.data.switch1 = false);
			}
			this.$emit('switch-change', this.data);
		},
	},
	mounted() {},
};
</script>
<style lang="scss" scoped>
.hangrancode_switch_Box {
	position: fixed;
	width: 251px;
	height: 88px;
	left: 32px;
	bottom: 32px;
	z-index: 99999;
	display: flex;
	flex-direction: column;
	border: 1px solid #00ddff;
	border-radius: 8px;
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
</style>

