<template>
	<div class="widget-part" :style="styles" @click="back">
		<div class="h-back pointer fn-flex flex-row">
			<img src="/static/icons/back.svg" />
			<div class="txt">返回</div>
		</div>
	</div>
</template>
<script lang="ts">
import { widgetMixin } from '@eslinkv/vue2'
import { Editor } from '@eslinkv/core'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	created(): void {
		this.configValue = this.parseConfigValue(value)
	},
	methods: {
		back(): void {
			if (!this.data.sceneId) return
			this.editor.closeScene(this.data.sceneId)
		},
	},
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
