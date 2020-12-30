<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-switch fn-flex flex-row">
			<li class="pos-r pointer fn-flex" v-for="item in data?data.value:[]"
				:class="{active:item .indexOf(store.scene.index)!==-1}"
				@click="changeScene(item[0])">
			</li>
		</ul>
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				value: [
					['nn16rowdl5r'],
					['p2wovclspks'],
				]
			})
		}
	}
	export default {
		data() {
			return {
				store: window.GoldChart.store
			}
		},
		mixins: [mixins],
		methods: {
			changeScene(index) {
				window.GoldChart.scene.setSceneIndex(index)
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.h-switch {
		height: 100%;

		li {
			font-size: 20px;
			width: 55px;
			height: 12px;
			background: rgba(255, 255, 255, 0.4);
			margin-right: 8px;

			&:last-child {
				margin-right: 0;
			}

			&.active {
				background: #0057A9;
				border: 1px solid #00DDFF;
			}
		}
	}

</style>

