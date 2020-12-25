<template>
	<div v-if="isRendered">
		<Overlay
			v-for="(item, index) in list"
			:key="overlayType + index"
			:marker="{
				icon: overlayIcon,
				...item,
				iconSize,
			}"
			:active="item.active"
			:visible="visible || activeItemName === item[overlayName]"
			@click="handleClick(item)"
			@mouseover="handleMouseOver(item)"
			@mouseleave="handleMouseLeave(item)"
		>
			<!-- 默认显示配置的icon -->
			<template slot="icon">
				<slot name="icon"></slot>
			</template>
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
import overlayMixin from '../../mixins/overlayMixin.js';
import Overlay from '../Overlay/';
export default {
	name: 'BaseOverlay',
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
			default: function() {
				return {};
			},
		},
		overlayIcon: String,
		overlayType: String,
		showOverlayName: {
			type: Boolean,
			default: true,
		},
		activeItem: {
			type: Object,
			defaut() {
				return {};
			},
		},
	},
	watch: {
		visible: {
			async handler(val) {
				let { isRendered } = this;
				if (val && !isRendered) {
					await this.getData(this.query);
					this.isRendered = true;
					this.$nextTick(() => {
						this.$emit('initComplete');
					});
				}
			},
			immediate: true,
		},
		//外部传入需要 activeItem  监听active自动触发click事件, 如果legend隐藏了覆盖物设置activeItemName 显示单个active的覆盖物
		async activeItem(val) {
			if (val && JSON.stringify(val) !== '{}') {
				this.activeItemName = val[this.overlayName];
				if (!this.isRendered) {
					await this.getData(this.query);
					this.isRendered = true;
				}
				this.handleClick(val);
			} else {
				this.activeItemName = '';
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
					top: `-30px`,
				},
				right: {
					transform: `translate(${this.iconSize / 2 +
						4}px,calc(-50% - ${this.iconSize / 2}px)`,
				},
				left: {
					transform: `translate(calc(-100% - ${this.iconSize / 2 +
						4}px),calc(-50% - ${this.iconSize / 2}px)`,
				},
			},
		};
	},
	methods: {
		//外部有传入数据则使用外部传入数据，or 调用接口
		async getData(query) {
			if (this.data) {
				return (this.list = this.data);
			}
			try {
				this.list = await this.apiFun(query);
			} catch (err) {
				console.log(err, 'err');
			}
		},
		handleClick(item) {
			this.$emit('click', item);
		},
		handleMouseOver(item) {
			this.$emit('mouseover', item);
		},
		handleMouseLeave(item) {
			this.$emit('mouseleave', item);
		},
	},
};
</script>

<style lang="scss" scoped>
.sample-name {
	backface-visibility: hidden;
	font-size: 20px;
	color: #fff;
	position: absolute;
	white-space: nowrap;
	left: 50%;
	transform: translateX(-50%);
}
</style>
