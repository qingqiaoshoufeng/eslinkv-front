<template>
	<div class="panel-container">
		<div class="panel-header">
			<img src="@/assets/amap/images/taishiganzhi.png" alt="" />
			<span>{{ title }}</span>
		</div>
		<div class="panel-content">
			<div
				@click="handleClick(item, index)"
				v-for="(item, index) in data"
				:key="index"
				class="panel-item"
				:class="{ active: activeIndex === index }"
			>
				<slot :item="item"> </slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SituationAwarenessPanel',
	data() {
		return {
			activeIndex: null,
		};
	},
	props: {
		title: {
			type: String,
			default: '态势感知',
		},
		data: {
			type: Array,
			default() {
				return [];
			},
		},
		activeItem: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	watch: {
		activeItem(val) {
			if (JSON.stringify(val) == '{}') {
				return (this.activeIndex = null);
			}
			let index = this.data.findIndex(item => {
				let { id } = item;
				return val.id === id;
			});
			this.activeIndex = index > -1 ? index : null;
		},
	},
	methods: {
		handleClick(item, index) {
			this.activeIndex = index;
			this.$emit('change', item);
		},
	},
};
</script>

<style lang="scss" scoped>
.panel-container {
	color: #fff;
	font-size: 16px;
	.panel-header {
		font-size: 24px;
		position: relative;
		font-weight: 600;
		padding-bottom: 6px;
		img {
			vertical-align: bottom;
			margin-right: 10px;
		}
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			right: 0;
			left: 0;
			bottom: 0;
			height: 1px;
			background: rgba(255, 255, 255, 0.4);
		}
	}
	.panel-content {
		max-height: calc(100vh - 260px);
		overflow-y: auto;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.panel-item {
		height: 96px;
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
