<template>
	<DashboardPanel
		:delay="0"
		:show="ready"
		:speed="800"
		:transition="true"
		enter="animated fadeIn"
		leave="animated fadeOut"
	>
		<div class="pop-container" :style="{ width }">
			<div class="close-btn" @click="$emit('input', false)">
				<svg-icon icon-name="iconbaseline-close-px"></svg-icon>
			</div>
			<slot></slot>
		</div>
	</DashboardPanel>
</template>

<script>
import SvgIcon from '../SvgIcon/index';
import DashboardPanel from '../DashboardPanel/index';
export default {
	name: 'PopContainer',
	components: {
		SvgIcon,
		DashboardPanel,
	},
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		width: {
			type: String,
			default: '240px',
		},
	},
	data() {
		return {
			ready: false,
		};
	},
	mounted() {
		this.ready = true;
	},
};
</script>

<style lang="scss" scoped>
.pop-container {
	position: relative;
	padding: 16px;
	font-size: 16px;
	background: rgba(0, 11, 37, 0.8);
	border: 1px solid #00ddff;
	box-sizing: border-box;
	color: #fff;
	margin: -150px 0 0 -80px;
	.close-btn {
		background: #0057a9;
		border: 1px solid #00ddff;
		box-sizing: border-box;
		width: 24px;
		height: 24px;
		position: absolute;
		top: -32px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:active {
			opacity: 0.8;
		}
	}
}
</style>
