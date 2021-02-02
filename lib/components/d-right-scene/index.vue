<template lang="pug">
	d-right-modal.d-scene-modal(title="场景切换" :width="360" icon="logo-buffer" :top="70")
		header
			span 场景切换
			span 当前：场景{{scene.index}}
		ul.d-scrollbar
			li.pointer.fn-flex.pos-r.flex-row(@click="changeScene(0)" :class="[{active:scene.index===0}]")
				span 主场景
				p ID：0
			li.pointer.fn-flex.pos-r.flex-row(v-for="(item,index) in scene.list" :class="[{active:scene.index===item}]" @click="changeScene(item)" :key="item")
				i-input(v-if="scene.index===item" size="small" @on-change="e=>handleSceneName(item,e)" :value="scene.obj[item].name")
				span(v-else) {{scene.obj[item].name}}
				p(v-if="scene.index!==item") ID：{{item}}
				i-icon.destroy(type="ios-trash-outline" @click="e=>destroyScene(e,index)")
			li.pointer.create.fn-flex(@click="createScene") +
</template>
<script lang="ts">
	import dRightModal from '../d-right-modal'
	import {Component, Vue} from 'vue-property-decorator'
	import {Icon, Input} from 'view-design'
	import scene from '../../store/scene.store'
	import platform from '../../store/platform.store'

	@Component({
		components: {
			dRightModal, 'i-icon': Icon, 'i-input': Input
		},
	})
	export default class DScene extends Vue {
		scene: any = scene.state
		platform: any = platform.state

		handleSceneName(key, e) {
			scene.actions.setSceneName(key, e.target.value)
		}

		changeScene(index) {
			scene.actions.setSceneIndex(index)
			this.platform.chooseWidgetId = null
		}

		createScene() {
			scene.actions.createScene()
		}

		destroyScene(e, index) {
			e.stopPropagation()
			this.$Modal.confirm({
				title: '提示',
				content: '是否删除当前场景？',
				onOk: () => {
					if (this.scene.index === this.scene.list[index]) {
						scene.actions.setSceneIndex(this.scene.list[0])
					}
					scene.actions.deleteScene(index)
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../../src/scss/conf";

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
			border-bottom: 1px solid $borderColor;
		}

		li {
			padding: 10px;
			margin: 10px 0;
			border: 1px solid #ddd;
			transition: all .3s;
			height: 40px;
			align-items: center;
			justify-content: center;
			font-size: 12px;

			/deep/ {
				.ivu-input {
					font-size: 12px;
				}
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
				border-color: $themeColor;
				background-color: $themeColor;
				color: #fff;
			}

			&.create {
				font-size: 20px;
				border-style: dashed;

				&:hover {
					color: $themeColor;
				}
			}

			&:hover {
				border-color: $themeColor;

				.destroy {
					width: 20px;
					margin-left: 10px;
				}
			}
		}
	}
</style>
