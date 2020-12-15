<template>
	<div class="list">
		<div
			@click="handleClick(item, index)"
			v-for="(item, index) in list"
			:key="index"
			class="list-item"
			:class="{ active: activeIndex === index }"
		>
			<div class="row">
				<SvgIcon
					:icon-name="
						item.status == 0 ? 'iconzhengchang' : 'iconyichang'
					"
					class="panel-type-icon"
				></SvgIcon>
				<div class="content">
					{{ item.content }}
				</div>
				<div>
					{{ item.time }}
				</div>
			</div>
			<div class="row">
				<div class="station-name">
					{{ item.address }}
				</div>
				<div
					:class="[
						'status',
						item.status == 0 ? 'status-suc' : 'status-err',
					]"
				>
					{{ item.statusText }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { TaskList } from '..';
import { SvgIcon } from '../../../../../components/';

export default {
	name: 'HomeRealTimeList',
	components: {
		SvgIcon,
	},
	data() {
		return {
			activeIndex: null,
			list: [],
			clickNumber: 0,
		};
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	async created() {
		// this.list = await this.$sysApi.map.home.getWarningList();
		this.list = await this.$sysApi.map.serve.getServiceCustomerTaskList();
	},
	watch: {
		activeItem(val) {
			if (JSON.stringify(val) == '{}') {
				return (this.activeIndex = null);
			}
			let index = this.list.findIndex(item => {
				let { id } = item;
				return val.id === id;
			});
			this.activeIndex = index > -1 ? index : null;
		},
	},
	methods: {
		handleClick(item, index) {
			item.activeIndex = index;
			this.activeIndex = index;
			item.overlayType = 'TaskList';
			this.$emit('change', item);
		},
	},
};
</script>

<style lang="scss" scoped>
.list {
	height: 799px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	color: #fff;
	font-size: 16px;
	.list-item {
		// height: 96px;
		padding: 16px 8px;
		box-sizing: border-box;
		cursor: pointer;
		&:hover,
		&.active {
			background: rgba(23, 115, 201, 0.4);
		}
		.panel-type-icon {
			width: 24px;
			height: 24px;
		}
		.row {
			display: flex;
			align-items: center;
			.status-err {
				color: #ffdc45;
			}
			.status-suc {
				color: #00ddff;
			}
			.content {
				flex: 1;
				font-size: 24px;
				display: flex;
				align-items: center;
				margin-left: 12px;
			}
			.station-name {
				font-size: 20px;
				flex: 1;
				color: rgba(255, 255, 255, 0.8);
				margin-left: 36px;
			}
		}
	}
}
</style>
