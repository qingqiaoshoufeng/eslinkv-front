<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-nav fn-flex flex-row">
			<li class="pos-r pointer fn-flex"
				v-for="item in data?data.value:[]"
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
					{title: '首页', index: ['tbc8uqyrkze']},
					{
						title: '供气',
						index: ['nn16rowdl5r', 'p2wovclspks', '8iyxp8u3gtu', 'phugmfxir4d', '9n1zur7e4l', 'j2nq2ycw0er' ]
					},
					{title: '服务', index: ['g199smrdh4r']},
					{title: '工程', index: ['6gouq223fze']},
					{title: '优家', index: ['o8tkm981qdh']},
					{title: '体验', index: ['vxoiljh5my9']},
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

