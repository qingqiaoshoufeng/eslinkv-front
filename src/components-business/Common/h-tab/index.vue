<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-tab fn-flex flex-row">
			<li
				class="pos-r pointer fn-flex"
				v-for="item in data ? data.value : []"
				:key="item.title"
				:class="{
					active: item.index.indexOf(editor.currentSceneIndex) !== -1,
					disabled: data.disabled
						? data.disabled.indexOf(item.title) !== -1
						: false,
				}"
				@click="changeScene(item.title, item.index[0])"
			>
				{{ item.title }}
			</li>
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
		changeScene(title: string, index: string | number): void {
			if (this.data.disabled) {
				if (this.data.disabled.indexOf(title) !== -1) {
					return
				} else {
					this.editor.selectSceneIndex(index)
				}
			} else {
				this.editor.selectSceneIndex(index)
			}
		},
	},
	created(): void {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss">
.h-tab {
	li {
		align-items: center;
		justify-content: center;
		height: 32px;
		padding: 0 16px;
		font-size: 20px;
		color: rgba(255, 255, 255, 0.75);
		background: #001f6d;
		border: 1px solid #0057a9;

		&.active {
			color: #feffff;
			background: #0057a9;
			border: 1px solid #0df;
		}

		&.disabled {
			color: rgba(255, 255, 255, 0.3);
			cursor: inherit;
			background: #001f6d;
			border: 1px solid #0057a9;
		}
	}
}
</style>
