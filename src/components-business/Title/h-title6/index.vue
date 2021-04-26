<template lang="pug">
.widget-part(:style="styles")
	.fn-flex.flex-row.h-title-6
		.h-title-6-icon
		h2.pos-r.pointer(
			v-for="item in data ? data : []",
			:class="{ active: scene.index === item.sceneId }",
			@click="handleClick(item.sceneId)") {{ item.title }}
</template>
<script lang="ts">
const { widgetMixin } = eslinkV
const { scene } = eslinkV.$store
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { value } from './index.component'

@Component
class HTitle6 extends mixins(widgetMixin) {
	scene = scene.state

	handleClick(index) {
		if (index) {
			scene.actions.setSceneIndex(index)
		}
	}

	created() {
		this.configValue = this.parseConfigValue(value)
	}
}

export default HTitle6
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
