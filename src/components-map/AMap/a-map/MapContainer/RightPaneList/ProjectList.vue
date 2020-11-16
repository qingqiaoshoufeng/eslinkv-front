<template>
	<div class="panel-item-container" functional>
		<div class="row">
			<SvgIcon
				:icon-name="
					data.status == 0
						? 'icongongchengyanqi'
						: 'icongongchengyanqi-err'
				"
				class="panel-type-icon"
			></SvgIcon>
			<div class="content">
				{{ data.content }}
			</div>
			<div v-if="data.stage == '开工'">
				{{ data.status === 0 ? '剩余' : '延期'
				}}{{ data.remainday || data.outday }}天
			</div>
		</div>
		<div class="row">
			<div class="station-name">{{ data.address }}</div>
			<div
				:class="[
					'status',
					data.status == 0 ? 'status-suc' : 'status-err',
				]"
			>
				{{ data.progress }}
			</div>
		</div>
	</div>
</template>

<script>
import { SvgIcon } from '../../components/';

export default {
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
.panel-item-container {
	.panel-type-icon {
		width: 24px;
		height: 24px;
	}
	.row {
		display: flex;
		align-items: center;
		.content {
			flex: 1;
			font-size: 24px;
			display: flex;
			align-items: center;
			margin-left: 12px;
		}
		.station-name {
			font-size: 18px;
			flex: 1;
			color: rgba(255, 255, 255, 0.75);
			margin-left: 36px;
		}
	}
}
</style>
