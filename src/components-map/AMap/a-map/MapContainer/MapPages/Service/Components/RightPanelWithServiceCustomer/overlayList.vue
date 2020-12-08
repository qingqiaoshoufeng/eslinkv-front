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
					v-if="item.icon"
					:icon-name="item.icon"
					class="panel-type-icon"
				></SvgIcon>
				<div class="content">
					<div>
						{{ item.name }}
					</div>

					<div class="time">
						{{ item.time }}
					</div>
				</div>
			</div>
			<div class="row">
				<div class="station-name">
					<div>
						{{ item.address }}
					</div>
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
import { SvgIcon } from '../../../../../components/';
import { SERVICE_SERVICECUSTOMER_LEGEND_MAP } from '../../serviceCustomer/config';
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
	created() {
		console.log(1111111111111111111, 68);
		this.getData();
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
			let res = await this.$sysApi.map.serve.getServiceCustomerThreeSocialList();
			this.list = res.map(item => {
				let { stationType } = item;
				console.log(stationType);
				let config = SERVICE_SERVICECUSTOMER_LEGEND_MAP[stationType];
				if (config) {
					item.icon = config.legendIcon;
				}
				return item;
			});

			// let list = await this.$sysApi.map.serve.getAllTypeStationList();
			// this.list = list
			// 	.map(item => {
			// 		let { stationType } = item;
			// 		console.log(stationType);
			// 		let config =
			// 			SERVICE_SERVICECUSTOMER_LEGEND_MAP[stationType];
			// 		if (config) {
			// 			item.icon = config.legendIcon;
			// 		}
			// 		return item;
			// 	})
			// 	.filter(itm => 'ThreeSocialLinkage' === itm.stationType);
		},
		handleClick(item, index) {
			this.activeIndex = index;
			item.overlayType = 'ThreeSocialLinkage';
			this.$emit('change', item);
		},
	},
};
</script>

<style lang="scss" scoped>
.list {
	color: #fff;
	font-size: 16px;
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
				justify-content: space-between;
				.time {
					font-family: PingFang SC;
					font-style: normal;
					font-weight: normal;
					font-size: 16px;
					line-height: 16px;
					color: #fff;
				}
			}
			.station-name {
				font-size: 18px;
				flex: 1;
				color: rgba(255, 255, 255, 0.75);
				margin-left: 36px;
			}
		}
	}
}
</style>
