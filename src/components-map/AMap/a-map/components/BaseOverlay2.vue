<template>
	<div v-if="isRendered">
		<Overlay
			v-for="(item, index) in data"
			:key="overlayType + index"
			:marker="{
				icon: item.alarming ? overlayWarmIcon : overlayIcon,
				...item,
				iconSize,
			}"
			:active="item.active"
			:visible="visible || activeItemName === item[overlayName]"
			@click="handleClick(item)"
			@mouseover="handleMouseOver(item)"
			@mouseleave="handleMouseLeave(item)"
		>
			<slot :data="item">
				<!-- 默认显示图标的名字 -->
				<div
					class="sample-name"
					:style="sampleNamePoseMap[item.pose] || {}"
					v-if="showOverlayName"
				>
					{{ item[overlayName] }}
				</div>
			</slot>
		</Overlay>
	</div>
</template>
<script>
import overlayMixin from '../mixins/overlayMixin.js'
import Overlay from './Overlay/'
export default {
	mixins: [overlayMixin],
	components: {
		Overlay,
	},
	props: {
		data: {
			type: Array,
		},
		overlayName: {
			type: String,
			default: 'name',
		},
		iconSize: {
			type: Number,
			default: 44,
		},
		apiFun: Function,
		visible: {
			type: Boolean,
			default: true,
		},
		query: {
			type: Object,
			default: function () {
				return {}
			},
		},
		overlayIcon: String,
		overlayType: String,
		overlayWarmIcon: String,
		showOverlayName: {
			type: Boolean,
			default: true,
		},
		activeItem: {
			type: Object,
			defaut() {
				return {}
			},
		},
	},
	watch: {
		visible: {
			async handler(val) {
				const { isRendered } = this
				if (val && !isRendered) {
					this.isRendered = true
					this.$nextTick(() => {
						this.$emit('initComplete')
					})
				}
			},
			immediate: true,
		},
		// 外部传入需要 activeItem  监听active自动触发click事件, 如果legend隐藏了覆盖物设置activeItemName 显示单个active的覆盖物
		async activeItem(val) {
			if (val && JSON.stringify(val) !== '{}') {
				this.activeItemName = val[this.overlayName]
				if (!this.isRendered) {
					this.isRendered = true
				}
				this.handleClick(val)
			} else {
				this.activeItemName = ''
			}
		},
	},
	data() {
		return {
			list: [],
			position: 'bottom',
			isRendered: false,
			activeItemName: '',
			sampleNamePoseMap: {
				top: {
					top: '-30px',
				},
				right: {
					transform: `translate(${
						this.iconSize / 2 + 4
					}px,calc(-50% - ${this.iconSize / 2}px)`,
				},
				left: {
					transform: `translate(calc(-100% - ${
						this.iconSize / 2 + 4
					}px),calc(-50% - ${this.iconSize / 2}px)`,
				},
			},
		}
	},
	methods: {
		handleClick(item) {
			this.$emit('click', item)
		},
		handleMouseOver(item) {
			this.$emit('mouseover', item)
		},
		handleMouseLeave(item) {
			this.$emit('mouseleave', item)
		},
	},
}
</script>

<style lang="scss" scoped>
.sample-name {
	position: absolute;
	left: 50%;
	font-size: 20px;
	color: #fff;
	white-space: nowrap;
	transform: translateX(-50%);
	backface-visibility: hidden;
}
</style>
