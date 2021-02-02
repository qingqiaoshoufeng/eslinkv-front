<template lang="pug">
	d-right-modal.d-widget-modal(title="小工具清单" :width="360" icon="ios-apps" :top="107")
		header.fn-flex.flex-row
			i-input(:value="scene.obj[scene.index].name" @on-change="handleSceneName" v-if="editScene")
				i-icon(type="md-checkmark" slot="suffix" @click="editScene=false")
			i-select(v-model="scene.index" v-if="!editScene")
				i-option(:value="0") 主场景
				i-option(:value="key" v-for="(item,key) in scene.obj" :key="key") {{item.name}}
				i-option(:value="-1") 场景回收站
			i-dropdown(@on-click="handleSetScene" v-if="!editScene")
				a
					span {{have}}/{{total}} 设置
					i-icon(type="ios-arrow-down")
				i-dropdown-menu(slot="list")
					i-dropdown-item(name="create")
						span 新增场景
					i-dropdown-item(name="edit" :disabled="scene.index===0")
						span 编辑场景
					i-dropdown-item(name="destroy")
						span 删除场景
		ul.d-scrollbar.d-widget-list
			li.pointer.pos-r(v-for="item in list" :class="[{active:platform.chooseWidgetId===item.id}]" :key="item.id" @click="handleChoose(item.id)")
				.d-widget-line.fn-flex.flex-row
					i-icon(:type="`md-eye${item.config.widget.hide ? '-off' : ''}`" :title="!item.config.widget.hide ? '隐藏' : '显示'" @click="handleTaggerHide(item.id)")
					i-icon(:type="`md-${item.config.widget.locked ? '' : 'un'}lock`" :title="!item.config.widget.locked ? '锁定' : '解锁'" @click="handleTaggerLock(item.id)")
					i-icon(type="md-trash" title="删除" @click="handleDelete(item.id)")
					h3 TYPE: {{item.config.widget.name}}
				.d-widget-line.fn-flex.flex-row
					h2 {{item.type}}
					p ID: {{item.id}}
</template>
<script lang="ts">
	import dRightModal from '../d-right-modal'
	import {Component, Vue} from 'vue-property-decorator'
	import {Icon, Input, Select, Option, DropdownMenu, DropdownItem, Dropdown} from 'view-design'
	import scene from '../../store/scene.store'
	import platform from '../../store/platform.store'

	@Component({
		components: {
			dRightModal,
			'i-icon': Icon,
			'i-input': Input,
			'i-select': Select,
			'i-option': Option,
			'i-dropdown-menu': DropdownMenu,
			'i-dropdown-item': DropdownItem,
			'i-dropdown': Dropdown,
		},
	})
	export default class DRightWidget extends Vue {
		scene: any = scene.state
		platform: any = platform.state
		total: nunber = 0
		have: nunber = 0
		editScene: boolean = false

		get list() {
			let list = [], total = 0, have = 0
			for (let key in this.platform.widgetAdded) {
				total++
				const item = this.platform.widgetAdded[key]
				if (item.scene === this.scene.index) {
					list.push(item)
					have++
				}
			}
			this.total = total
			this.have = have
			return list
		}

		handleSetScene(name) {
			switch (name) {
				case 'create':
					this.createScene()
					break;
				case 'edit':
					this.editScene = true
					break;
				case 'destroy':
					this.destroyScene()
					break;
			}
		}

		handleChoose(id) {
			this.platform.chooseWidgetId = id
		}

		handleDelete(id) {
			this.$Modal.confirm({
				title: '提示',
				content: '是否删除当前组件？',
				onOk: () => {
					// this.removeCombinationChild(id)
					this.$delete(this.platform.widgetAdded, id)
					// this.$delete(this.zIndexMap, id)
					// this.$delete(this.sizeMap, id)
					// this.$delete(this.positionMap, id)
					this.platform.chooseWidgetId = null
				}
			})
		}

		handleTaggerHide(id) {
			this.platform.widgetAdded[id].config.widget.hide = !this.platform.widgetAdded[id].config.widget.hide
		}

		handleTaggerLock(id) {
			this.platform.widgetAdded[id].config.widget.locked = !this.platform.widgetAdded[id].config.widget.locked
		}

		createScene() {
			scene.actions.createScene()
		}

		handleSceneName(e) {
			scene.actions.setSceneName(this.scene.index, e.target.value)
		}

		destroyScene() {
			this.$Modal.confirm({
				title: '提示',
				content: '是否删除当前场景？该场景未删除的组件将自动进入场景回收站！',
				onOk: () => {
					const index = this.scene.index
					scene.actions.setSceneIndex(0)
					scene.actions.deleteScene(index)
					for (let key in this.platform.widgetAdded) {
						const item = this.platform.widgetAdded[key]
						if (item.scene === index) {
							item.scene = -1
						}
					}
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../../src/scss/conf";

	.d-widget-list {
		li {
			padding: 10px;
			margin: 10px 0;
			border: 1px solid #ddd;
			transition: all .3s;
			height: 60px;
			align-items: center;
			justify-content: center;
			font-size: 12px;

			/deep/ {
				.ivu-input {
					font-size: 12px;
				}
			}

			.ivu-icon {
				font-size: 14px;
				margin-right: 4px;

				&:hover {
					color: $themeColor;
				}
			}

			h3, p {
				font-weight: normal;
				margin-left: auto;
				font-size: 12px;
			}

			h2 {
				font-weight: normal;
				font-size: 14px;
			}

			&.active {
				border-color: $themeColor;
				background-color: $themeColor;
				color: #fff;
			}

			&:hover {
				border-color: $themeColor;
			}
		}
	}

	.d-widget-modal {
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
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $borderColor;

			.ivu-select {
				width: 180px;
			}

			span {
				margin-left: auto;
			}
		}

		.d-widget-line {
			align-items: center;
		}
	}
</style>
