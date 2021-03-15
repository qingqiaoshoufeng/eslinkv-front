<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div
			class="item"
			:class="{active:item.index.indexOf(scene.index) !== -1}"
			@click="switchTab(item.index[0])"
			v-for="item in data ? data.value : []"
		>
			<img :src="item.img">
			<span>{{ item.title }}</span>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { value } from './index.component'
	import scene from 'eslinkv-npm/src/store/scene.store'

	export default {
		mixins: [mixins],
		data () {
			return {
				scene: scene.state
			}
		},
		methods: {
			switchTab (n) {
				scene.actions.setSceneIndex(n)
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 198px;
			height: 80px;
			font-size: 24px;
			font-weight: 600;
			line-height: 24px;
			color: #fff;

			&.active {
				background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.5) 100%);
				border-top: 2px solid #0df;
			}

			> img {
				width: 48px;
				height: 48px;
				margin-right: 16px;
			}
		}
	}
</style>

