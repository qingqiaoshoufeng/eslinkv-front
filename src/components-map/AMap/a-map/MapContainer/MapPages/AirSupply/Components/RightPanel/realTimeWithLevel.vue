<template>
	<div class="list">
		<div
			@click="handleClick(item, index, 'WARN')"
			v-for="(item, index) in list"
			:key="index"
			class="list-item"
			:class="{ active: activeIndex === index }"
		>
			<div class="row">
				<SvgIcon
					:icon-name="
						item.priority == '已处理' ? 'iconzhengchang' : 'iconyichang'
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
						item.priority == '已处理' ? 'status-suc' : 'status-err',
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

export default {
	name: 'realTimeWithLevel',
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
	async created() {
		this.list = await this.$sysApi.map.airSupply.getProcessWarningList();
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
			this.$emit('change', item, 'WARN');
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
