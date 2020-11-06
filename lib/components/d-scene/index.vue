<template>
	<div class="d-scene-box pos-a">
		<div class="d-scene pos-a">
			<img :src="`./static/images/layout-grid.svg`" title="场景切换" @click="clickHandle"/>
		</div>
		<div class="d-scene-modal pos-a" :class="[{active:sceneModal}]">
			<header>场景切换<span>当前：场景{{store.scene.index}}</span></header>
			<ul>
				<li @click="changeScene(0)"
					class="pointer fn-flex pos-r flex-row"
					:class="[{active:store.scene.index===0}]">
					<span>主场景</span>
					<p>ID：0</p>
				</li>
				<li v-for="(item,index) in store.scene.list"
					class="pointer fn-flex pos-r flex-row"
					:class="[{active:store.scene.index===item}]"
					@click="changeScene(item)"
					:key="item">
					<input @input="e=>handleSceneName(item,e)" :value="store.scene.obj[item].name"/>
					<p>ID：{{item}}</p>
					<Icon class="destroy" type="ios-trash-outline" @click="e=>destroyScene(e,index)"/>
				</li>
				<li class="pointer create fn-flex" @click="createScene">+</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {store, mutations} from '../../store'
	import {Icon} from 'view-design'

	export default {
		components: {
			Icon
		},
		data() {
			return {
				store,
				sceneModal: false
			}
		},
		methods: {
			handleSceneName(key, e) {
				mutations.setSceneName(key, e.target.value)
			},
			changeScene(index) {
				mutations.setSceneIndex(index)
				this.store.events.list.widgetUnActived()
			},
			clickHandle() {
				this.sceneModal = !this.sceneModal
			},
			createScene() {
				mutations.createScene()
			},
			destroyScene(e, index) {
				e.stopPropagation()
				this.$Modal.confirm({
					title: '提示',
					content: '是否删除当前场景？',
					onOk: () => {
						if (store.scene.index === store.scene.list[index]) {
							mutations.setSceneIndex(store.scene.list[0])
						}
						mutations.destroyScene(index)
					}
				})
			}
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
		ul{
			height: calc(100% - 42px);
			overflow-y: auto;
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
			height: 40px;
			align-items: center;
			justify-content: center;

			input {
				border: none;
			}

			p {
				margin-left: auto;
			}

			.destroy {
				width: 0;
				right: 10px;
				font-size: 20px;
				overflow: hidden;
				transition: all .3s;
				margin-left: 0;
			}

			&.active {
				border-color: #00CBF4;
				background-color: #00CBF4;
				color: #fff;
			}

			&.create {
				font-size: 20px;
				border-style: dashed;
			}

			&:hover {
				border-color: #00CBF4;

				.destroy {
					width: 20px;
					margin-left: 10px;
				}
			}
		}
	}
</style>
