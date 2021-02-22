<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-tab fn-flex flex-row">
			<li class="pos-r pointer fn-flex" v-for="item in data?data.value:[]"
				:class="{active:item.index.indexOf(store.scene.index)!==-1,disabled:data.disabled?data.disabled.indexOf(item.title)!==-1:false}"
				@click="changeScene(item.title,item.index[0])">
				{{item.title}}
			</li>
		</ul>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {config, value} from './index.component'
	import scene from '../../../../lib/store/scene.store'

	export default {
		data() {
			return {
				store: window.GoldChart.store
			}
		},
		mixins: [mixins],
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
			}
		},
		created() {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">
	.h-tab {
		li {
			font-size: 20px;
			align-items: center;
			padding: 0 16px;
			justify-content: center;
			height: 32px;
			border: 1px solid #0057A9;
			color: rgba(255, 255, 255, 0.75);
			background: #001F6D;

			&.active {
				border: 1px solid #00DDFF;
				color: #FEFFFF;
				background: #0057A9;
			}

			&.disabled {
				border: 1px solid #0057A9;
				color: rgba(255, 255, 255, 0.3);
				background: #001F6D;
				cursor: inherit;
			}
		}
	}

</style>

