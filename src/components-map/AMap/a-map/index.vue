<template>
	<div class="map-box">
		<template v-if="inPreview">
			<MapContainer />
		</template>
		<template v-else>
			<div>
				<img
					class="placeholder-map"
					src="/static/amap/amap.jpg"
					alt=""
				/>
			</div>
		</template>
	</div>
</template>

<script>
import MapContainer from './MapContainer/index';
import { store } from '../../../openApi';
export default {
	name: 'HRMap',
	components: {
		MapContainer,
	},
    computed:{
        inPreview(){
            return store.scene.status === 'inPreview'
        }
    }
};
</script>


<style lang="scss" scoped>
.placeholder-map {
	width: 100%;
	height: 100%;
}
.map-box {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	width: 100%;
	height: 100%;
}
</style>

<style lang="scss">
.amap-marker-content {
	& > div {
		& > div:not(.no-hover-effect):hover {
			transform: scale(1.1);
		}
	}
}
.amap-markers {
	z-index: 1100 !important;
}
.amap-marker {
    transform:scale(0.384857) !important;
}

.amap-logo{
    display: none !important;
}
</style>



