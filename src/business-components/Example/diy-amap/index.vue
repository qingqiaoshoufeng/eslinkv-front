<template>
	<div class="widget-part" :style="styles">
		<div class="diy-amap" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import AMap from '../../../utils/AMap'

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValue()
		},
		mounted() {
			AMap().then(({AMap, AMapUI}) => {
				this.map = new AMap.Map(this.id, {
					zoom: 10,
					center: [120.310539, 30.587221],
					mapStyle: 'amap://styles/e0e1899c1695e012c70d0731a5cda43c',
				});
			})
		}
	}
</script>

<style lang="scss">
	.diy-amap {
		height: 100%;
		width: 100%;
	}
</style>
