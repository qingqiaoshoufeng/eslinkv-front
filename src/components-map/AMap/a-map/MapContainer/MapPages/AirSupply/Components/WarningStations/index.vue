<template>
	<div>
		<!-- 图标 -->
		<Overlay
			v-for="(item, index) in list"
			:key="index"
			:ref="'WarnEvent' + index"
			:marker="{
				icon: overlayIcon,
				iconSize: 38,
				...item,
			}"
			:visible="visible"
			@click="handlerClick(item, index)"
		>
		</Overlay>
		<!-- 详情弹窗 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			v-bind="{
				data: activeOverlay,
				...OverlayDetailProp,
			}"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="580"
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
import { DETAILLIST } from './config';
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
				return [];
			},
		},
		visible: {
			type: Boolean,
			default() {
				return true;
			},
		},
	},
	data() {
		return {
			OverlayDetailProp: {},
			showOverlayDetail: true,
			overlayIcon: 'iconzhongdiyayujing',
			activeOverlay: {},
			activeIndex: null,
			detailInfo: {},
			padding: 16,
		};
	},
	computed: {
		detailShowList() {
			let { activeIndex } = this;
			if (!activeIndex && activeIndex !== 0) return [];
			if (activeIndex == 0) {
				return this.data.filter(
					item => item.name === '棋院6159燃气球阀-切断装置'
				);
			}

			return this.data.filter(
				item => item.name !== '棋院6159燃气球阀-切断装置'
			);
		},
		list() {
			let list = [];
			list[0] = this.data.find(
				item => item.name === '棋院6159燃气球阀-切断装置'
			);
			list[1] = this.data.find(
				item => item.name !== '棋院6159燃气球阀-切断装置'
			);
			return list;
		},
	},

	mounted() {},

	methods: {
		viewOverlayDetail() {},
		closeOverlayDetail(done) {
			done && done();
		},
		handlerClick(item, index) {
			this.padding = index ? 0 : 16;
			this.showOverlayDetail = true;
			console.log(item);
			this.activeIndex = index;
			this.activeOverlay = this.list[index];
			console.log(this.detailShowList);
		},
		handlerChange(item, index) {
			this.getDetailInfo(item, item.middleId);
		},
		async getDetailInfo(item, id) {
			let params = {
				id,
			};
			this.detailInfo = await this.$sysApi.map.airSupply.getLowMidDevice(
				params
			);
		},
	},
	beforeDestroy() {},
};
</script>


<style lang="scss" scoped>
/deep/.pop-content {
	padding: 0px !important;
}
</style>