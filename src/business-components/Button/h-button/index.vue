<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-button">
			<div style="height: 100px" @click="handleClick(0)">场景1</div>
			<div style="height: 100px" @click="handleClick(1)">场景2</div>
		</div>
	</div>
</template>
<script>
	import {mutations} from '../../../../lib/store'
	import mixins from '../../mixins'
	export default {
		mixins: [mixins],
		methods: {
			handleClick(index) {
				mutations.setSceneIndex(index)
			}
		},
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValue()
		}
	}
</script>
<style lang="scss">
	.h-button{
		height: 100%;
		color: #fff;
	}
</style>

