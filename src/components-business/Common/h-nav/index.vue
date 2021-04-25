<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-nav fn-flex flex-row">
			<li
				class="pos-r pointer fn-flex"
				v-for="item in data ? data.value : []"
				:class="{
					active: item.index.indexOf(scene.index) !== -1,
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
<script>
const { widgetMixin, scene } = eslinkV
import { value } from './index.component'

export default {
	data() {
		return {
			scene: scene.state,
		}
	},
	mixins: [widgetMixin],
	methods: {
		changeScene(title, index) {
			if (this.data.disabled) {
				if (this.data.disabled.indexOf(title) !== -1) {
					return false
				} else {
					scene.actions.setSceneIndex(index)
				}
			} else {
				scene.actions.setSceneIndex(index)
			}
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss">
.h-nav {
	height: 100%;

	li {
		justify-content: center;
		height: 50px;
		margin-right: 80px;
		font-size: 32px;
		line-height: 32px;
		color: rgba(255, 255, 255, 0.75);

		&:last-child {
			margin-right: 0;
		}

		&.active {
			color: #fff;

			&::before {
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 100%;
				height: 4px;
				content: '';
				background: #0df;
				border-radius: 4px;
				transform: translateX(-50%);
			}
		}

		&.disabled {
			color: rgba(255, 255, 255, 0.3);
		}
	}
}
</style>
