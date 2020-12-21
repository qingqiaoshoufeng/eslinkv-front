<template>
	<div class="list">
		<NoData :show="!list.length" />
		<div
			@click="handleClick(item, index)"
			v-for="(item, index) in list"
			:key="index"
			class="list-item"
			:class="{ active: activeIndex === index }"
		>
			<div class="row">
				<img
					:src="iconList[index]"
					alt=""
					v-if="index > 2"
					class="panel-type-icon"
				/>
				<div class="panel-type-desc">
					{{ index + 1 }}
				</div>
				<!-- <SvgIcon
					:icon-name="
						item.status == 0 ? 'iconzhengchang' : 'iconyichang'
					"
					class="panel-type-icon"
				></SvgIcon> -->
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
import { SvgIcon } from '../../../../../components/';
import { SERVICE_SERVICEICCUSTOMER_LEGEND_MAP } from '../../serviceICcustomer/config';

export default {
	name: 'overlayList',
	components: {
		SvgIcon,
	},
	data() {
		return {
			activeIndex: null,
			list: [],
			iconList,
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
		try {
			this.list = await this.$sysApi.map.serve.getICcustomerSituationAwareness();
		} catch (error) {}
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
			this.activeIndex = index;
			let {
				detailList,
				component: overlayType,
			} = SERVICE_SERVICEICCUSTOMER_LEGEND_MAP['WarningICcustomer'];

			this.$emit('change', {
				...item,
				detailList,
				overlayType,
				activeIndex: this.activeIndex,
			});
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
		.panel-type-desc {
			width: 24px;
			height: 24px;
			border-radius: 50%;
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;

			text-align: center;

			color: #ffffff;
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
