<!-- 中低压预警点 -->
<template>
	<div>
		<!-- 图标 -->
		<Overlay
			v-for="(item, index) in list"
			:key="index"
			:marker="{
				icon: overlayIcon,
				iconSize: 38,
				...item,
			}"
			:visible="visible"
			@click="handlerClick(item, index)"
		></Overlay>
		<!-- 详情弹窗 -->
		<OverlayDetail
			:value="isShowDetial"
			v-bind="{
				data: activeOverlay,
				...OverlayDetailProp,
			}"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="width"
			:padding="padding"
		>
			<TipDetial
				@change="handlerChange"
				:isShowList="activeIndex"
				:detailShowList="detailShowList"
			/>
		</OverlayDetail>
	</div>
</template>
<script>
export default {
	name: 'WarningStations',
	components: {
		Overlay: () => import('../../../../../components/Overlay'),
		OverlayDetail: () => import('../../../../../components/OverlayDetail'),
		TipDetial: () => import('./TipDetial'),
	},
	props: {
		data: {
			type: Array,
			default() {
				return []
			},
		},
		visible: {
			type: Boolean,
			default() {
				return true
			},
		},
		showOverlayDetail: {
			type: Boolean,
			default() {
				return true
			},
		},
	},
	data() {
		return {
			OverlayDetailProp: {},
			overlayIcon: 'iconzhongdiyayujing',
			activeOverlay: {},
			activeIndex: null,
			detailInfo: {},
			padding: 16,
			isShowDetial: false,
			width: 880,
		}
	},
	watch: {
		showOverlayDetail: {
			handler(val) {
				val && (this.isShowDetial = !val)
			},
			immediate: true,
		},
	},
	computed: {
		detailShowList() {
      return this.data.filter(
          item => item.belong === this.activeIndex
      )
		},
		list() {
			const list = {}
			this.data.forEach(v => {
			  if (!list[v.belong]) {
			    list[v.belong] = v
        }
      })
			return list
		},
	},

	methods: {
		viewOverlayDetail() {},
		closeOverlayDetail(done) {
			this.isShowDetial = false
			this.$emit('moveto', { type: 'center' })
			// done && done();
		},
		handlerClick(item, index) {
			this.activeOverlay = this.list[index]
			this.padding = index ? 0 : 16
			this.width = index ? 880 : 680
			this.isShowDetial = true
			this.activeIndex = index
			this.$emit('moveto', { type: 'WarningStations' })
		},
		handlerChange(item, index) {
			this.getDetailInfo(item, item.middleId)
		},
	},
}
</script>

<style lang="scss" scoped>
::v-deep.pop-content {
	padding: 0 !important;
}
</style>
