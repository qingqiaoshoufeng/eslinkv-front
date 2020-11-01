<template>
	<div class="d-scene-box pos-a">
		<div class="d-scene pos-a">
			<img :src="`./static/images/layout-grid.svg`" title="场景切换" @click="clickHandle"/>
		</div>
		<div class="d-scene-modal pos-a" :class="[{active:sceneModal}]">
			<header>场景切换<span>当前：场景{{store.scene.index+1}}</span></header>
			<ul>
				<li v-for="(item,index) in store.scene.list"
					class="pointer"
					:class="[{active:store.scene.index===index}]"
					@click="changeScene(index)"
					:key="index">
					场景{{index+1}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {store, mutations} from '../../store'

	export default {
		data() {
			return {
				store,
				sceneModal: false
			}
		},
		methods: {
			changeScene(index) {
				mutations.setSceneIndex(index)
			},
			clickHandle() {
				this.sceneModal = !this.sceneModal
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss">
	.d-scene-box {
		width: 24px;
		height: 24px;
		right: 15px;
		top: 105px;
	}

	.d-scene {
		right: 0;
		top: 0;
		opacity: 0.4;
		z-index: 2;
		width: 24px;
		height: 24px;
		cursor: pointer;
		mix-blend-mode: exclusion;

		img {
			width: 26px;
			height: 26px;
		}
	}

	.d-scene-modal {
		right: -380px;
		top: -70px;
		width: 360px;
		background-color: white;
		border-radius: 5px;
		overflow: hidden;
		z-index: 3;
		letter-spacing: 0;
		height: calc(100vh - 140px);
		transition: all .3s;
		visibility: hidden;
		opacity: 0;

		&.active {
			visibility: inherit;
			right: 40px;
			opacity: 1;
		}

		header {
			width: 100%;
			height: 42px;
			line-height: 42px;
			font-weight: bold;
			font-size: 14px;
			flex: 0 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			border-bottom: 1px solid #e2e2e2;
		}

		li {
			padding: 10px;
			margin: 10px;
			border: 1px solid #ddd;
			transition: all .3s;

			&.active {
				border-color: #00CBF4;
				background-color: #00CBF4;
				color: #fff;
			}
		}
	}
</style>
