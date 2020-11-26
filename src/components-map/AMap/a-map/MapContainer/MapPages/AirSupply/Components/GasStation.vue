<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		@click="marker => $emit('overlay-click', marker, 'GasStation')"
	>
		<template slot-scope="{ data }">
			<div :class="[{ active: active }, data.inletDirection]">
				<div class="arrow" v-if="data.inletDirection && data.inlet">
					{{ data.inlet }}
				</div>
				<p class="stationName">{{ data.name }}</p>
				<div class="wave"></div>
			</div>
		</template>
	</BaseOverlay>
</template>
<script>
import { BaseOverlay } from '../../Components/index';
export default {
	name: 'GasStation',
	components: {
		BaseOverlay,
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
		overlayIcon: {
			type: String,
			default: '',
		},
		overlayType: {
			type: String,
			default: '',
		},
		active: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		let apiFun = this.$sysApi.map.home.getGasStationList;
		return {
			apiFun: apiFun,
		};
	},
};
</script>
<style lang="scss" scoped>
img {
	width: 100%;
}

.active {
	z-index: 999;
	padding: 0;

	.wave {
		animation: wave 2s infinite;
	}
}

.right {
	.arrow {
		left: 100%;
		top: 50%;
		margin-top: -44px;
		background: url('/static/amap/arrow-right.svg');
		line-height: 88px;
		padding-left: 5px;
		width: 100px;
		background-repeat: no-repeat;
		animation: fade-left-fade-out 5s infinite;
	}
}

.down {
	.arrow {
		left: 50%;
		margin-left: -44px;
		width: 88px;
		top: 100%;
		background: url('/static/amap/arrow-down.svg');
		padding-top: 20px;
		background-repeat: no-repeat;
		animation: fade-up-fade-out 5s infinite;
	}

	.stationName {
		bottom: 100%;
		top: auto;
	}
}

.up {
	.arrow {
		bottom: 100%;
		width: 88px;
		left: 50%;
		background: url('/static/amap/arrow-up.svg');
		margin-left: -44px;
		padding-top: 20px;
		background-repeat: no-repeat;
		box-sizing: border-box;
		height: 66px;
		animation: fade-down-fade-out 5s infinite;
	}
}

.stationIcon {
	width: 100%;
}

.stationName {
	color: #fff;
	white-space: nowrap;
	transform: translateX(-50%);
	left: 50%;
	font-size: 20px;
    font-weight: 500;
	position: absolute;
}

.arrow {
	position: absolute;
	width: 33px;
	height: 88px;
	color: #62FFF5;
	font-size: 26px;
}
// }

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


