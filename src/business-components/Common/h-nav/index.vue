<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-nav fn-flex flex-row">
			<li class="pos-r pointer" :class="{active:store.scene.index==='tbc8uqyrkze'}"
				@click="changeScene('tbc8uqyrkze')">
				首页
			</li>
			<li class="pos-r pointer" :class="{active:store.scene.index==='nn16rowdl5r'}"
				@click="changeScene('nn16rowdl5r')">
				供气
			</li>
			<li class="pos-r pointer" :class="{active:store.scene.index==='g199smrdh4r'}"
				@click="changeScene('g199smrdh4r')">
				服务
			</li>
			<li class="pos-r pointer" :class="{active:store.scene.index==='6gouq223fze'}"
				@click="changeScene('6gouq223fze')">
				工程
			</li>
			<li class="pos-r pointer" :class="{active:store.scene.index==='o8tkm981qdh'}"
				@click="changeScene('o8tkm981qdh')">
				优家
			</li>
			<li class="pos-r pointer" :class="{active:store.scene.index==='vxoiljh5my9'}"
				@click="changeScene('vxoiljh5my9')">
				体验
			</li>
		</ul>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {store, mutations} from '../../../../lib/store'

	export default {
		data() {
			return {
				store
			}
		},
		mixins: [mixins],
		methods: {
			changeScene(index) {
				mutations.setSceneIndex(index)
			}
		},
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValue()
		}
	}
</script>
<style lang="scss">
	.h-nav {
		li {
			margin-right: 80px;
			font-size: 32px;
			line-height: 32px;
			color: rgba(255, 255, 255, 0.75);
			height: 50px;

			&:last-child {
				margin-right: 0;
			}

			&.active {
				&:before {
					content: '';
					position: absolute;
					background: #00DDFF;
					border-radius: 4px;
					width: 64px;
					height: 4px;
					bottom: 0;
					left: 50%;
					margin-left: -32px;
				}
			}
		}
	}

</style>

