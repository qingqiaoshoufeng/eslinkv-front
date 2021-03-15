<template>
	<div class="widget-part" :style="styles" @click="back">
		<div class="h-back pointer fn-flex flex-row">
			<img src="/static/icons/back.svg"/>
			<div class="txt">返回</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { value } from './index.component'
	import scene from 'eslinkv-npm/src/store/scene.store'

	export default {
		mixins: [mixins],
		created () {
			this.configValue = this.parseConfigValue(value)
		},
		methods: {
			back () {
				if (!this.data.sceneId) return
				scene.actions.destroyScene(this.data.sceneId)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.h-back {
		height: 100%;
	}

	.widget-part {
		display: flex;
		align-items: center;

		> img {
			width: 23px;
			height: 23px;
			margin-right: 12px;
		}

		.txt {
			font-size: 32px;
			line-height: 32px;
			color: #feffff;
			white-space: nowrap;
		}
	}
</style>

