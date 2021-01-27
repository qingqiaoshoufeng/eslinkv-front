<template lang="pug">
	d-right-modal.d-scene-modal(title="场景切换" ref="modal" :width="360" icon="logo-buffer" :top="105" @show="$emit('show')")
		header
			span 场景切换
			span 当前：场景{{store.scene.index}}
		ul
			li.pointer.fn-flex.pos-r.flex-row(@click="changeScene(0)" :class="[{active:store.scene.index===0}]")
				span 主场景
				p ID：0
			li.pointer.fn-flex.pos-r.flex-row(v-for="(item,index) in store.scene.list" :class="[{active:store.scene.index===item}]" @click="changeScene(item)" :key="item")
				input(@input="e=>handleSceneName(item,e)" :value="store.scene.obj[item].name")
				p ID：{{item}}
				Icon.destroy(type="ios-trash-outline" @click="e=>destroyScene(e,index)")
			li.pointer.create.fn-flex(@click="createScene") +
</template>
<script lang="ts">
	import dRightModal from '../d-right-modal'
	import {Component, Vue} from 'vue-property-decorator'
	import {Icon} from 'view-design'

	@Component({
		components: {
			dRightModal, Icon
		},
	})
	export default class extends Vue {
		store: any = window.GoldChart.store
		sceneModal: boolean = false

		handleSceneName(key, e) {
			window.GoldChart.mutations.setSceneName(key, e.target.value)
		}

		changeScene(index) {
			window.GoldChart.mutations.setSceneIndex(index)
			this.store.events.list.widgetUnActived()
		}

		handleClose() {
			this.$refs.modal.rightModal = false
		}

		createScene() {
			window.GoldChart.mutations.createScene()
		}

		destroyScene(e, index) {
			e.stopPropagation()
			this.$Modal.confirm({
				title: '提示',
				content: '是否删除当前场景？',
				onOk: () => {
					if (window.GoldChart.store.scene.index === window.GoldChart.store.scene.list[index]) {
						window.GoldChart.mutations.setSceneIndex(window.GoldChart.store.scene.list[0])
					}
					window.GoldChart.mutations.deleteScene(index)
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	.d-scene-modal {
		ul {
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
			margin: 10px 0;
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
