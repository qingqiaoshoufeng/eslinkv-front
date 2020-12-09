<template>
	<div class="event-warning">
		<div
			@click="handleClick(item, index, 'WarningList')"
			v-for="(item, index) in list"
			:key="index"
			class="list-item"
			:class="{ active: activeIndex === index }"
		>
			<div class="row">
				<SvgIcon
					:icon-name="
						item.stateName == '处理完成'
							? 'iconzhengchang'
							: 'iconyichang'
					"
					class="panel-type-icon"
				></SvgIcon>
				<div class="content">
					{{ item.repairContent }}
				</div>
				<div>
					{{ item.callDate }}
				</div>
			</div>
			<div class="row">
				<div class="station-name">
					{{ item.address }}
				</div>
				<div
					:class="[
						'status',
						item.stateName == '处理完成'
							? 'status-suc'
							: 'status-err',
					]"
				>
					{{ item.stateName }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
	computed: {
		active() {
			return this.$parent.active;
		},
	},
	async created() {
		this.getData();
		this.timer = setInterval(() => {
			this.getData();
		}, 120000);
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
		async getData() {
			this.list = await this.$sysApi.map.airSupply.getEventWarningList();
		},
		handleClick(item, index) {
			this.activeIndex = index;
			item.status = item.stateName == '处理完成' ? 0 : 1;
			item.overlayType = 'WARNEVENT';
			this.$emit('change', item);
		},
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
};
</script>

<style lang="scss" scoped>
.event-warning {
	color: #fff;
	font-size: 16px;
	height: 800px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	.list-item {
		// height: 96px;
		padding: 20px 8px;
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
	.status-suc {
		color: #00ddff;
	}
	.status-err {
		color: #ff7217;
	}
}
</style>
