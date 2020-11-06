<script>
import { SvgIcon } from '@/business-components/Example/diy-amap/components/';
import { AMapMarker } from '@/business-components/Example/diy-amap/lib';
export default {
	name: 'GasStationOverlay',
	functional: true,
	components: {
		SvgIcon,
		AMapMarker,
	},
	render: (h, { props, data, listeners }) => {
		let { active, marker, visible = true } = props;
		let { lat, lng, name, inletDirection, inlet } = marker;
		return (
			<AMapMarker visible={visible} position={[lng, lat]} vid={name}>
				<div
					class={['sample', { active: active }, inletDirection]}
					on={listeners}
				>
					<SvgIcon
						class="station-icon"
						icon-name="iconmenzhan"
					></SvgIcon>

					<p class="stationName">{name}</p>
				</div>
			</AMapMarker>
		);
	},
};
</script>

<style lang="scss" scoped>
.sample {
	width: 52px;
	position: absolute;
	text-align: center;
	cursor: pointer;
	padding: 5px;
	box-sizing: border-box;

	.wave {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		border: 3px solid #58cef2;
		border-radius: 50%;
		opacity: 0;
	}
	.stationName {
		color: #fff;
		position: absolute;
		top: 100%;
		width: 200px;
		left: 50%;
		margin-top: 5px;
		// margin-left: -100px;
		transform: translateX(-50%);
		text-align: center;
		font-size: 20px;
	}

	img {
		width: 100%;
	}

	&.active {
		z-index: 999;
		padding: 0;

		.wave {
			animation: wave 2s infinite;
		}
	}

	// &.right {
	//     .arrow {
	//         left: 100%;
	//         top: 50%;
	//         margin-top: -44px;
	//         background: url('~@assets/images/arrow-right.svg');
	//         line-height: 88px;
	//         padding-left: 5px;
	//         width: 100px;
	//         background-repeat: no-repeat;
	//         animation: fade-left-fade-out 5s infinite;
	//     }
	// }

	// &.down {
	//     .arrow {
	//         left: 50%;
	//         margin-left: -44px;
	//         width: 88px;
	//         top: 100%;
	//         background: url('~@assets/images/arrow-down.svg');
	//         padding-top: 20px;
	//         background-repeat: no-repeat;
	//         animation: fade-up-fade-out 5s infinite;
	//     }

	//     /deep/ .stationName {
	//         bottom: 100%;
	//         top: auto;
	//     }
	// }

	// &.up {
	//     .arrow {
	//         bottom: 100%;
	//         width: 88px;
	//         left: 50%;
	//         background: url('~@assets/images/arrow-up.svg');
	//         margin-left: -44px;
	//         padding-top: 20px;
	//         background-repeat: no-repeat;
	//         box-sizing: border-box;
	//         height: 66px;
	//         animation: fade-down-fade-out 5s infinite;
	//     }
	// }

	.station-icon {
		font-size: 44px;
	}

	.arrow {
		position: absolute;
		width: 33px;
		height: 88px;
		color: #62fff5;
		font-size: 26px;
	}
}

@keyframes fade-down-fade-out {
	0% {
		transform: translateY(-50px);
		opacity: 0;
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		transform: translateY(0);
		opacity: 0;
	}
}

@keyframes fade-up-fade-out {
	0% {
		transform: translateY(50px);
		opacity: 0;
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		transform: translateY(0);
		opacity: 0;
	}
}

@keyframes fade-left-fade-out {
	0% {
		transform: translateX(50px);
		opacity: 0;
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		transform: translateX(0);
		opacity: 0;
	}
}

@keyframes fade-right-fade-out {
	0% {
		transform: translateX(-50px);
		opacity: 0;
	}

	30% {
		opacity: 1;
	}

	45% {
		opacity: 1;
	}

	55% {
		opacity: 1;
	}

	100% {
		transform: translateX(0);
		opacity: 0;
	}
}

@keyframes wave {
	0% {
		opacity: 0;
		transform: scale(1);
	}

	50% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: scale(1.5);
	}
}
</style>
