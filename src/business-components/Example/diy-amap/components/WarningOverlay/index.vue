<script>
import { SvgIcon } from '@/business-components/Example/diy-amap/components/';
import { AMapMarker } from '@/business-components/Example/diy-amap/lib';

let eventTypeIconMap = {
	0: 'iconbaoguanshijian',
	1: 'iconxieloushijian',
};
export default {
	name: 'WarningOverlay',
	functional: true,
	components: {
		SvgIcon,
		AMapMarker,
	},
	props: {
		marker: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			active: false,
		};
	},
	render: (h, { props, data, listeners }) => {
		let { active, marker, visible = true } = props;
		let { lat, lng, content, status, statusText } = marker;
		let icon = eventTypeIconMap[status];
		if (status === 0) {
			icon = icon + '-suc';
		}
		return (
			<AMapMarker visible={visible} position={[lng, lat]} vid={name}>
				<div class={['warnoverlay', { active: active }]} on={listeners}>
					<SvgIcon
						class="warnoverlay-icon"
						icon-name={icon}
					></SvgIcon>
					{status !== 0 && (
						<img
							src={require('@/assets/amap/images/qiangxiu.gif')}
							class="warnoverlay-gif"
						/>
					)}
				</div>
			</AMapMarker>
		);
	},
};
</script>

<style lang="scss" scoped>
.warnoverlay {
	width: 54px;
	height: 54px;
	position: absolute;
	cursor: pointer;
	text-align: center;
	padding: 3px;
	box-sizing: border-box;
	.warnoverlay-icon {
		font-size: 48px;
	}
	.warnoverlay-gif {
		display: block;
		width: 100px;
		height: 35px;
		margin-top: -14px;
		margin-left: -23px;
	}

	img {
		width: 100%;
	}

	&.active {
		z-index: 999;
		padding: 0;
	}
}
.station-icon {
	font-size: 44px;
}

// .stationName {
//     color: #fff;
//     position: absolute;
//     top: 100%;
//     width: 100px;
//     left: 50%;
//     margin-top: 5px;
//     font-weight: 400;
//     margin-left: -50px;
//     font-size: 18px;
//     text-align: center;
// }
</style>

