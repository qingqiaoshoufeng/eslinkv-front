<script>
import { SvgIcon } from '../../../../components/index.js';
import { AMapMarker } from '../../../../lib';
export default {
	name: 'Overlay',
	functional: true,
	components: {
		SvgIcon,
		AMapMarker,
	},
	render: (h, { props, data, listeners,scopedSlots }) => {
		let { active, marker, visible = true } = props;
		let { lat, lng, name, status, icon } = marker;
		icon = icon ? icon.replace('tuli', '') : icon;
		if (!lat || !lng) {
			return null;
        }
                    // <div class="sample-name">{name}</div>
		return (
			<AMapMarker visible={visible} position={[lng, lat]} vid={name}>
				<div class={['sample', { active: active }]} on={listeners}>
					{icon && (
						<SvgIcon class="sample-icon" icon-name={icon}></SvgIcon>
                    )}
                    {scopedSlots}
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
.sample-icon {
	font-size: 44px;
}
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

