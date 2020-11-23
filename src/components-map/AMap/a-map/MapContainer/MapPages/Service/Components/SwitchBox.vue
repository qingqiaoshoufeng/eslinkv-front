<template>
	<div class="hangrancode_switch_Box">
		<div>
			累计联码数量热力
			<i-switch
				:value="data.switch1"
				@on-change="change(1)"
				true-color="#13ce66"
				false-color="#ff4949"
			/>{{ data.switch1 ? 'no' : 'off' }}
		</div>
		<div>
			月操作数量热力
			<i-switch
				:value="data.switch2"
				@on-change="change(2)"
				true-color="#13ce66"
				false-color="#ff4949"
			/>{{ data.switch2 ? 'no' : 'off' }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'TipDetial',
	props: {
		data: {
			Type: Object,
			default() {
				return {
					switch1: true,
					switch2: false,
				};
			},
		},
	},
	data() {
		return {};
	},
	methods: {
		change(e) {
			console.log(e);
			this.$emit('update:visible', false);
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
	left: 800px;
	bottom: 800px;
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
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 24px;
		/* identical to box height, or 133% */

		/* 辅助色/绿色 */

		color: #00ffcf;
	}
}
</style>

