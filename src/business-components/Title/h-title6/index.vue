<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-title-6">
			<div class="h-title-6-icon"/>
			<h2 class="pos-r pointer" v-for="item in data?data:[]"
				:class="{active:store.scene.index===item.sceneId}"
				@click="handleClick(item.sceneId)">{{item.title}}</h2>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import GoldChart, {store} from '../../../openApi'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify([
				{
					title: '标题',
					sceneId: ''
				},
				{
					title: '标题',
					sceneId: ''
				}
			])
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
			handleClick(index) {
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
	.h-title-6-icon {
		background-image: url('/static/icons/h-title1-1.svg');
		height: 34px;
		width: 34px;
		margin-right: 9px;
	}

	.h-title-6 {
		align-items: center;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);

		h2 {
			font-weight: 600;
			font-size: 24px;
			color: rgba(255, 255, 255, 0.75);
			margin-right: 24px;

			&.active {
				&:before {
					position: absolute;
					content: '';
					height: 4px;
					width: 100%;
					background: #00DDFF;
					bottom: -15px;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}

</style>

