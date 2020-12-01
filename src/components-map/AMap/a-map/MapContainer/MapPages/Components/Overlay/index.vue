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
	render: (h, { props, data, listeners, scopedSlots, $slots }) => {
		let { active = false, marker, visible = true } = props;
        let { lat, lng, name, status, icon, iconSize = 38 } = marker;
        let offset = [ -iconSize/2,-iconSize/2]
		if (!parseFloat(lat) || !parseFloat(lng)) {
			return null;
		}
		return (
			<AMapMarker
                visible={visible}
                offset={offset}
				position={[lng || 0, lat || 0]}
				vid={name}
			>
				<div
					class="sample"
					class={['sample', active ? 'active' : '']}
					on={listeners}
				>
					{icon && (
						<SvgIcon
							class="sample-icon"
							icon-name={icon}
							style={{ fontSize: `${iconSize}px` }}
						></SvgIcon>
					)}
					{$slots.default}
				</div>
			</AMapMarker>
		);
	},
};
</script>

<style lang="scss" scoped>
.sample {
	// width: 54px;
	// height: 54px;
	position: absolute;
	cursor: pointer;
	// padding: 3px;
	box-sizing: border-box;

	img {
		width: 100%;
	}
}
.active {
	z-index: 999;
	padding: 0;
	> .sample-icon {
		font-size: 80px !important;
	}
	/deep/ .sample-icon {
		bottom: -60px !important;
	}
}
.sample-icon {
	font-size: 44px;
}
.sample-icon:hover {
	transform: scale(1.2);
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

