<template>
	<div class="detail-container">
		<div class="close-btn">
			<SvgIcon icon-name="iconbaseline-close-px"></SvgIcon>
		</div>
		<div class="station-name">{{ data.address }}</div>
		<div class="content">{{ data.content }}</div>
		<div class="btn">查看详情</div>
	</div>
</template>

<script>
import { SvgIcon } from '@/business-components/Example/diy-amap/components/';

export default {
	name: 'StationDetailDialog',
	components: {
		SvgIcon,
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.detail-container {
	position: relative;
	width: 240px;
	padding: 16px;
	font-size: 16px;
	background: rgba(0, 11, 37, 0.8);
	border: 1px solid #00ddff;
	box-sizing: border-box;
	color: #fff;
	margin: -150px 0 0 -80px;
	transition: all linear 0.3s;
	.station-name {
		font-size: 24px;
	}
	.content {
		font-size: 18px;
		margin-top: 8px;
	}
	.btn {
		padding: 0px 8px;
		line-height: 32px;
		background: #0057a9;
		border-radius: 4px;
		display: inline-block;
		margin-top: 16px;
		&:hover {
			opacity: 0.8;
		}
	}
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
		&:active {
			opacity: 0.8;
		}
	}
}
</style>
