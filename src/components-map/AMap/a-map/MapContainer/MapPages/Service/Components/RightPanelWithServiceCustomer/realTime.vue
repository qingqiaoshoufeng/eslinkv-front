<template>
	<div class="list">
		<NoData :show="!list.length" />
		<i-icon
			type="ios-loading"
			size="54"
			class="demo-spin-icon-load"
			v-show="isShow"
		></i-icon>
		<div
			@click="handleClick(item, index)"
			v-for="(item, index) in list"
			:key="index"
			class="list-item"
			:class="{
				active:
					activeIndex === index &&
					activeOverlay.activeIndex === index,
			}"
			v-show="!isShow"
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
				<div class="time">
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
import { SvgIcon, NoData } from '../../../../../components/';

export default {
	name: 'HomeRealTimeList',
	components: {
		SvgIcon,
		NoData,
	},
	data() {
		return {
			activeIndex: null,
			list: [],
			clickNumber: 0,
			isShow: true,
		};
	},
	props: {
		activeItem: {
			type: Object,
			default() {
				return {};
			},
		},
		activeOverlay: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	async created() {
		// this.list = await this.$sysApi.map.home.getWarningList();
		this.isShow = true;
		this.list = await this.$sysApi.map.serve.getServiceCustomerTaskList();
		this.isShow = false;
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
/deep/.demo-spin-icon-load {
	animation: ani-demo-spin 1s linear infinite;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%);
}
@keyframes ani-demo-spin {
	from {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	to {
		transform: rotate(360deg);
	}
}
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
			.status {
				font-size: 20px;
			}
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
			.time {
				font-size: 20px;
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
