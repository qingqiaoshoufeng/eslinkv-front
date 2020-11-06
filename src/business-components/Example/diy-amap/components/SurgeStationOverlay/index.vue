<script>
import { SvgIcon } from '@/business-components/Example/diy-amap/components/';
import { AMapMarker } from '@/business-components/Example/diy-amap/lib';

export default {
	name: 'SurgeStationOverlay',
	components: {
		SvgIcon,
		AMapMarker,
	},
	functional: true,
	render: (h, { props, data, listeners }) => {
		let { active, marker, visible = true } = props;
		let { lat, lng, name } = marker;
		return (
			<AMapMarker visible={visible} position={[lng, lat]} vid={name}>
				<div class={['sample', { active: active }]} on={listeners}>
					<SvgIcon
						class="station-icon"
						icon-name="icontiaoyazhan"
					></SvgIcon>
				</div>
			</AMapMarker>
		);
	},
};
</script>

<style lang="scss" scoped>
.sample {
	width: 54px;
	height: 54px;
	position: absolute;
	cursor: pointer;
	padding: 3px;
	box-sizing: border-box;

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
</style>

