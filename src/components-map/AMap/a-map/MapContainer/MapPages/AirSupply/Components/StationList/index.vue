<template>
	<div>
		<!-- 图标 -->
		<Overlay
			key="StationList"
			ref="StationList"
			:marker="{
				icon: overlayIcon,
				iconSize: 38,
				...data,
			}"
			:visible="visible"
		>
		</Overlay>
		<!-- 详情弹窗 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			v-bind="{
				showMore,
				data,
				...OverlayDetailProp,
			}"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="400"
		>
		</OverlayDetail>
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
export default {
	name: 'StationList',
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
		},
		overlayInfoConfigMap: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		let iconList = {
			GasStation: 'icontulimenzhan', // '门站',
			PressureRegulatingStation: 'icontulitiaoyazhan', // '调压站',
			EmergencyAirSourceStation: 'icontuliqiyuanzhan', // '应急气源站',
			ServiceStation: 'icontulizonghefuwuzhan1', // '综合服务站',
			PipeManageMentStation: 'icontuliguanwangyunhangguanlizhan', // '管网运行管理站',
			UndergroundRepairStation: 'icontulidixiaqiangxiudian', // '地下抢修点',
			OngroundRepairStation: 'icontulidishangqiangxiudian', // '地上抢修点',
			LNGStation: 'icontulilNG', // 'LNG站',
			LiquefiedGasStation: 'icontuliyehuaqi', // '液化气站',
			NaturalGasStation: 'icontulijiaqizhan', // '加气站',
			DistributedEnergyResource: 'icontulinengyuanzhan', // '分布式能源',
		};
		return {
			icon: 'iconshijian1',
			showOverlayDetail: true,
			showRoutePlan: false,
			showMore: true,
			visible: false,
			overlayIcon: '',
			OverlayDetailProp: {},
		};
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
				console.log(overlayType, 'overlayType');
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
				this.showMore = overlayType === 'WARNEVENT';
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
			console.log(this.data);
		});
	},
	methods: {
		viewOverlayDetail() {
			let { repairContent, address, callDate } = this.data;
		},
		closeOverlayDetail(done) {
			// this.$refs.RightPanel1.$refs.overlayList.searchName = '';
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