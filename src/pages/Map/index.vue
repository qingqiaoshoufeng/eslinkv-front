<template>
	<div ref="kanboardWrapper" class="preview-wrapper">
		<div class="scene-menu">
			<div
				v-for="(scene, sceneIndex) in sceneMap"
				:key="sceneIndex"
				@click="changeScene(sceneIndex)"
			>
				{{ scene }}
			</div>
		</div>
		<!-- <amap class="amap-wrapper" /> -->
		<amap
			class="amap-wrapper"
			:style="`transform:scale(${actualScaleRatio});overflow: hidden;`"
		/>
	</div>
</template>

<script>
import amap from '@/components-map/AMap/a-map/MapContainer';
export default {
	components: {
		amap,
	},
	data() {
		return {
			sceneMap: {
				'8iyxp8u3gtu': 'AirSupplyLowPressure', //供气-管网
				'9n1zur7e4l': 'AirSupplyUCAN', //供气-泛能
				nn16rowdl5r: 'AirSupplyHighPressure', //供气-场站
				p2wovclspks: 'AirSupplyLNG', //供气-场站
				'6gouq223fze': 'ServiceCustomer',
				a70wh40bnz9: 'ServiceNineteen',
				'6u1qhjs14ws': 'ServiceMarket',
				bavv56kietf: 'ServiceHangranCode',
				e40ml4vtfa6: 'serviceICcustomer',
			},
			kanboardSize: {
				width: 3500,
				height: 1050,
			},
			actualScaleRatio: 1,
		};
	},
	methods: {
		changeScene(sceneIndex) {
			let event = new CustomEvent('SceneIndex', {
				detail: { index: sceneIndex },
			});
			document.dispatchEvent(event);
		},
		updateKanboardSize(val) {
			const { clientWidth, clientHeight } = document.body;
			const { width, height } = this.kanboardSize;
			let ratio = Math.min(clientWidth / width, clientHeight / height);
			// this.actualScaleRatio = ratio < 1 ? ratio : 1;
		},
	},
	computed: {
		scaleRatio() {
			if (!this.fitScreen) return 1;
			const ratio = this.actualScaleRatio;
			return ratio < 1 ? ratio : 1;
		},
	},
	mounted() {
		this.updateKanboardSize();
	},
};
</script>

<style lang="scss" scoped>
.preview-wrapper {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	background: #0f3b69;
	z-index: 99999;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	.scene-menu {
		position: absolute;
		top: 0;
		display: flex;
		color: #fff;
		font-size: 20px;
        z-index:2000;
		> div {
			margin-right: 20px;
		}
	}
	.amap-wrapper {
		width: 3500px;
		height: 1050px;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		flex-shrink: 0;
		flex-grow: 0;
	}

	&.active {
		overflow: auto;
	}

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	/deep/ {
		#kanban {
			position: relative;
			outline: rgba(255, 255, 255, 0.2) 1px dotted;
			flex-shrink: 0;
			flex-grow: 0;
			/*margin: auto;*/
		}
	}

	&.fit-mode {
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
}

.action-bar {
	position: fixed;
	right: 15px;
	bottom: 15px;
	display: flex;
	z-index: 100000;

	.action {
		padding: 10px 18px;
		color: white;
		border: 1px solid currentColor;
		opacity: 0.5;
		background-color: rgba(0, 0, 0, 0.4);
		cursor: pointer;

		&:hover {
			opacity: 0.8;
		}

		&:not(:first-child) {
			margin-left: 10px;
		}
	}
}
</style>
