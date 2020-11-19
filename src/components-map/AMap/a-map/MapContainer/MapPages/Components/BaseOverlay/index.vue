<template>
	<div v-if="isRendered">
		<Overlay
			v-for="(item, index) in list || []"
			:key="overlayType + index"
			:marker="{
				icon: overlayIcon,
				...item,
			}"
            :active="item.active"
			:visible="visible"
			@click="$emit('click', item)"
		>
			<slot :data="item">
				<!-- 默认显示图标的名字 -->
				<div class="sample-name" v-if="showOverlayName">
					{{ item.name }}
				</div>
			</slot>
		</Overlay>
	</div>
</template>
<script>
import overlayMixin from '../../mixins/overlayMixin.js';
import Overlay from '../Overlay/';
function findAmapRoot() {
	if (this.$amap) return this.$amap;
	let parent = this.$parent;
	if (parent) {
		let fun = findAmapRoot.bind(parent);
		return fun();
	}
}
export default {
	name: 'BaseOverlay',
	mixins: [overlayMixin],
	components: {
		Overlay,
	},
	props: {
		apiFun: Function,
		visible: {
			type: Boolean,
			default: true,
		},
		query: {
			type: Object,
			default: function () {
				return {};
			},
		},
		overlayIcon: String,
		overlayType: String,
		showOverlayName: {
			type: Boolean,
			default: true,
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
	},
	created() {
		let fun = findAmapRoot.bind(this);
		this.$amap = fun();
		this.getData(this.query);
	},
	data() {
		return {
			list: [],
			isRendered: false,
		};
	},
	methods: {
		async getData(query) {
			try {
				this.list = await this.apiFun(query);
			} catch (err) {
				console.log(err, 'err');
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.sample-name {
	font-size: 18px;
	color: #fff;
	position: absolute;
	white-space: nowrap;
	bottom: -20px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
