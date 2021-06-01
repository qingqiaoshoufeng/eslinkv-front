<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-switch fn-flex flex-row">
			<li
				class="pos-r pointer fn-flex"
				v-for="item in data ? data.value : []"
				:class="{ active: item.indexOf(screen.sceneIndex) !== -1 }"
				@click="changeScene(item[0])"
			></li>
		</ul>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	data() {
		return {
			screen: {},
		}
	},
	mixins: [widgetMixin],
	methods: {
		changeScene(index) {
			this.screen.setSceneIndex(index)
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	mounted() {
		this.screen = this.$screen
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
