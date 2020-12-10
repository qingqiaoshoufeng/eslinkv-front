<template>
	<div class="process-warning">
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
						item.priority == '已处理'
							? 'iconzhengchang'
							: 'iconyichang'
					"
					class="panel-type-icon"
				></SvgIcon>
				<div class="content">
					{{ item.description }}
					<div
						class="level"
						:class="{
							first: item.level === 1,
							second: item.level === 2,
							third: item.level === 3,
						}"
					>
						{{ item.level }}
					</div>
				</div>
			</div>
			<div class="row">
				<div class="station-name">
					{{ item.address }}
				</div>
				<div>
					{{ item.alarmTime }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { SvgIcon } from '../../../../../components/';
import VueSeamLess from 'vue-seamless-scroll';
import GoldChart from '@/openApi';
import {
	INDEXSCENEMAP,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
	AIRSUPPLY_WARN_MODEL_SCENEINDEX,
	AIRSUPPLY_WARN__MODEL_COMPONENTINDEX,
} from '../../../../../config/scene';
export default {
	name: 'ProcessWarningList',
	components: {
		SvgIcon,
		VueSeamLess,
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
	async created() {
		this.getData();
		this.timer = setInterval(() => {
			this.getData();
		}, 120000);
	},
	computed: {
		active() {
			return this.$parent.active;
		},
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
		handleClick(listItem, index) {
			let { address, time } = listItem;
			listItem.status = listItem.priority == '已处理' ? 0 : 1;
			listItem.overlayType = 'WarningList';
			this.$emit('change', listItem);
			//实时报警弹出
			// GoldChart.scene.createSceneInstance(
			// 	AIRSUPPLY_WARN_MODEL_SCENEINDEX,
			// 	'fadeIn',
			// 	'none'
			// );
			// this.$nextTick(() => {
			// 	AIRSUPPLY_WARN__MODEL_COMPONENTINDEX.forEach(item => {
			// 		GoldChart.instance.updateComponent(item, {
			// 			data: {
			// 				time: time,
			// 				title: address,
			// 			},
			// 		});
			// 	});
			// });
			// setTimeout(() => {
			// 	GoldChart.scene.destroyScene(AIRSUPPLY_WARN_MODEL_SCENEINDEX);
			// }, 3000);
		},
		async getData() {
			this.list = await this.$sysApi.map.airSupply.getProcessWarningList();
		},
		handleClick(item, index) {
			this.activeIndex = index;
			item.status = item.stateName == '处理完成' ? 0 : 1;
			item.overlayType = 'WarningList';
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
.process-warning {
	color: #fff;
	font-size: 16px;
	height: 800px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	.list-item {
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
			margin-top: 8px;
		}
		.row {
			display: flex;
			// align-items: center;
			.content {
				flex: 1;
				font-size: 24px;
				display: flex;
				align-items: center;
				margin-left: 12px;
				display: flex;
				align-items: center;
				.level {
					width: 20px;
					height: 24px;
					line-height: 24px;
					margin-left: 8px;
					text-align: center;
				}
				.first {
					background: #9e1a14;
				}
				.second {
					background: #be4a18;
				}
				.third {
					background: #cf8900;
				}
			}
			.station-name {
				font-size: 18px;
				flex: 1;
				color: rgba(255, 255, 255, 0.8);
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
