<template lang="pug">
.widget-part(:style="styles")
	.fn-flex.flex-row.h-title-6
		.h-title-6-icon
		h2.pos-r.pointer(
			v-for="item in data ? data : []",
			:class="{ active: editor.currentSceneIndex === item.sceneId }",
			@click="handleClick(item.sceneId)") {{ item.title }}
</template>
<script lang="ts">
import { widgetMixin, Editor } from '@eslinkv/vue2'
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { value } from './index.component'

@Component
export default class HTitle6 extends mixins(widgetMixin) {
	editor: Editor = Editor.Instance()
	handleClick(index: number | string): void {
		this.editor.selectSceneIndex(index)
	}

	created(): void {
		this.configValue = this.parseConfigValue(value)
	}
}
</script>
<style lang="scss">
.h-title-6-icon {
	width: 34px;
	height: 34px;
	margin-right: 9px;
	background-image: url('/static/icons/h-title1-1.svg');
}

.h-title-6 {
	align-items: center;
	padding-bottom: 8px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.4);

	h2 {
		margin-right: 24px;
		font-size: 24px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.75);

		&.active {
			color: rgba(255, 255, 255, 1);

			&::before {
				position: absolute;
				bottom: -15px;
				width: 100%;
				height: 4px;
				color: rgba(255, 255, 255, 1);
				content: '';
				background: #0df;
			}
		}
	}
}
</style>
