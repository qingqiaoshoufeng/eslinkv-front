<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-nav fn-flex flex-row">
			<li class="pos-r pointer fn-flex"
				v-for="item in data?data.value:[]"
				:class="{active:item.index.indexOf(store.scene.index)!==-1,disabled:data.disabled?data.disabled.indexOf(item.title)!==-1:false}"
				@click="changeScene(item.title,item.index[0])">
				{{item.title}}
			</li>
		</ul>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import {value} from './index.component'
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
	.h-nav {
		height: 100%;

		li {
			margin-right: 80px;
			font-size: 32px;
			line-height: 32px;
			color: rgba(255, 255, 255, 0.75);
			height: 50px;
			justify-content: center;

			&:last-child {
				margin-right: 0;
			}

			&.active {
				color: #fff;

				&:before {
					content: '';
					position: absolute;
					background: #00DDFF;
					border-radius: 4px;
					width: 100%;
					height: 4px;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
				}
			}

			&.disabled {
				color: rgba(255, 255, 255, .3)
			}
		}
	}

</style>

