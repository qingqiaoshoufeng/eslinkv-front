<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-tab fn-flex flex-row">
			<li class="pos-r pointer fn-flex" v-for="item in data?data.value:[]"
				:class="{active:item.index.indexOf(store.scene.index)!==-1}"
				@click="changeScene(item.index[0])">
				{{item.title}}
			</li>
		</ul>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart, {store} from '../../../openApi'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				value: [
					{title: '场站', index: ['nn16rowdl5r', 'p2wovclspks']},
					{title: '管网', index: ['8iyxp8u3gtu', 'phugmfxir4d']},
					{title: '泛能', index: ['9n1zur7e4l', 'j2nq2ycw0er']}
				]
			})
		}
	}
	export default {
		data() {
			return {
				store
			}
		},
		mixins: [mixins],
		methods: {
			changeScene(index) {
				GoldChart.scene.setSceneIndex(index)
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
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
		}
	}

</style>

