<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-button">
			<div style="height: 100px" @click="handleClick(0)">场景1</div>
			<div style="height: 100px" @click="handleClick(1)">场景2</div>
		</div>
	</div>
</template>

<script>
	import {styleParser, widgetMixin} from '../../../../lib'
	import {mutations} from '../../../../lib/store'

	export default {
		mixins: [widgetMixin],
		computed: {
			styles() {
				const {layout} = this.config
				return styleParser(layout)
			},
			mergedConfig() {
				if (!this.config.config) return false
				return {...this.config.config}
			}
		},
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

