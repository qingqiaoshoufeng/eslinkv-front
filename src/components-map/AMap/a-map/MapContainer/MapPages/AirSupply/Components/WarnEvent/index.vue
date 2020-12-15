<template>
	<div>
		<!-- 图标 -->
		<Overlay
			key="WarnEvent"
			ref="WarnEvent"
			:marker="{
				icon: overlayIcon,
				iconSize: 38,
				...data,
			}"
			:visible="visible"
		>
			<video
				class="warning-videO"
				src="@/assets/amap/images/warning-circle.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				v-if="data.status"
				loop
			></video>
		</Overlay>
		<!-- 详情弹窗 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			v-bind="{
				showMore:showMore,
				data,
				...OverlayDetailProp,
			}"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="400"
		>
		</OverlayDetail>
		<!-- 路线规划 -->
		<RoutePlan
			:data="data"
			v-if="showRoutePlan"
			ref="RoutePlan"
		></RoutePlan>
	</div>
</template>
<script>
import bus from '../../../../../utils/bus';
import GoldChart from '@/openApi';
import {
	INDEXSCENEMAP,
	OVERLAYINFOMAP_AIRSUPPLY,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
} from '../../../../../config';
import {WARNING_OVERLAY_MAP} from './config.js'
export default {
	name: 'WarnEvent',
	inject: ['parentInfo'],
	components: {
		Overlay: () => import('../../../../../components/Overlay'),
		OverlayDetail: () => import('../../../../../components/OverlayDetail'),
		RoutePlan: () => import('../RoutePlan'),
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		}
	},
	data() {
		return {
			icon: 'iconshijian1',
			showOverlayDetail: true,
            showRoutePlan: false,
			visible: false,
			overlayIcon: '',
            OverlayDetailProp: {},
            overlayInfoConfigMap:Object.freeze(WARNING_OVERLAY_MAP)
		};
    },
    computed:{
        showMore(){
            let {data,showRoutePlan} = this
            return !showRoutePlan && data.overlayType === 'WARNEVENT'
        }
    },
	watch: {
		data(val) {
			if (JSON.stringify(val) !== '{}') {
				let { overlayType, status } = val;
				let { overlayInfoConfigMap } = this;
				let iconMap = {
					WARNEVENT: 'iconshijian1',
					WarningList: 'icongongyiyichang',
				};
				let overlayDetailConfig =
					overlayInfoConfigMap[overlayType] || {};
				//弹窗详情
				this.OverlayDetailProp = {
					iconSize: 38,
					overlayDetailConfig,
					showCloseBtn: true,
				};
				//报警图标
				this.overlayIcon =
					iconMap[overlayType] + (status === 0 ? '-suc' : '');
				this.visible = true;
				this.showOverlayDetail = true;
			} else {
				this.visible = false;
				this.showOverlayDetail = false;
				return {};
			}
		},
	},
	mounted() {
		bus.$on('clearRoutePlan', () => {
			this.showRoutePlan = false;
			this.$emit('close');
		});
	},
	methods: {
		viewOverlayDetail() {
			let { repairContent, address, callDate } = this.data;
			this.showRoutePlan = true;
			//和场景进行交互
			GoldChart.scene.setSceneIndex(AIRSUPPLY_WARN_SCENEINDEX);
			//更新数据
			this.$nextTick(() => {
				AIRSUPPLY_WARN_COMPONENTINDEX.forEach(i => {
					GoldChart.instance.updateComponent(i, {
						data: {
							step: 8,
							value: {
								step1: {
									time: new Date(callDate) * 1,
									des: repairContent,
									name: '王磊',
									title: '报警人',
									address: address,
								},
								step2: {
									time: new Date('2020-10-30 22:21') * 1,
									name: '秦芳芳',
									title: '客服部',
								},
								step3: {
									time: new Date('2020-10-30 22:31') * 1,
									name: '林自原',
									title: '维修部',
								},
								step4: {
									time: new Date('2020-10-30 22:48') * 1,
								},
								step5: {
									time: new Date('2020-10-30 23:13') * 1,
								},
								step6: {
									time: new Date('2020-10-30 23:50') * 1,
								},
								step7: {
									time: new Date('2020-10-31 11:21') * 1,
								},
								step8: {
									time: new Date('2020-10-31 12:57') * 1,
									title: '维修处置内容',
									content:
										'部分管道老旧破损严重导致燃气泄漏，关闭上游阀门后更换泄漏段管道，已恢复供气。',
								},
							},
							videoInfo1: {
								imgList: [
									'/static/images/project/01.png',
									'/static/images/project/02.jpg',
								],
								videoList: ['/cdn/videos/test.mov'],
							},
							videoInfo2: {
								imgList: [
									'/static/images/project/01.png',
									'/static/images/project/02.jpg',
								],
								videoList: ['/cdn/videos/test.mov'],
							},
						},
					});
				});
			});
		},
		closeOverlayDetail(done) {
			this.showRoutePlan = false;
			GoldChart.scene.setSceneIndex(
				INDEXSCENEMAP[this.parentInfo.pageName]
			);
			this.$emit('close');
			done && done();
		},
	},
	beforeDestroy() {
		bus.$off(['clearRoutePlan']);
	},
};
</script>


<style lang="scss" scoped>
video::-webkit-media-controls {
	display: none !important;
}
.warning-videO {
	margin-left: -80px;
	margin-top: -40px;
	outline: none;
	position: absolute;
}
.amap-icon {
	width: 38px !important;
	height: 38px !important;
	> img {
		width: 38px !important;
		height: 38px !important;
	}
}
.warnoverlay-gif {
	transform: translateX(-50%);
	position: absolute;
	display: block;
	width: 100px;
	height: 35px;
	margin-top: -36px;
	margin-left: 19px;
}
</style>