<template>
	<div class="hangrancode_switch_Box"></div>
</template>
<script>
export default {
	name: 'TipDetial',
	props: {
		data: {
			Type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {};
	},
	methods: {},
	mounted() {},
};
</script>
<style lang="scss" scoped>
.hangrancode_switch_Box {
	display: flex;
	width: 251px;
	height: 88px;
	left: 32px;
	top: 930px;
	background-color: #fff;
}
</style>

