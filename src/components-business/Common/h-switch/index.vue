<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-switch fn-flex flex-row">
			<li
				class="pos-r pointer fn-flex"
				v-for="item in data ? data.value : []"
				:key="item"
				:class="{
					active: item.indexOf(editor.currentSceneIndex) !== -1,
				}"
				@click="changeScene(item[0])"
			></li>
		</ul>
	</div>
</template>
<script lang="ts">
import { widgetMixin } from '@eslinkv/vue2'
import { Editor } from '@eslinkv/core'
import { value } from './index.component'

export default {
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	mixins: [widgetMixin],
	methods: {
		changeScene(index: number | string): void {
			this.editor.selectSceneIndex(index)
		},
	},
	created(): void {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss">
.h-switch {
	height: 100%;

	li {
		width: 55px;
		height: 12px;
		margin-right: 8px;
		font-size: 20px;
		background: rgba(255, 255, 255, 0.4);

		&:last-child {
			margin-right: 0;
		}

		&.active {
			background: #0057a9;
			border: 1px solid #0df;
		}
	}
}
</style>
