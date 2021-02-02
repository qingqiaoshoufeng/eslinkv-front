<template lang="pug">
	d-right-modal.d-widget-modal(title="小工具清单" :width="360" icon="ios-apps" :top="107")
		header
			span 小工具清单
		ul.d-scrollbar
			li.pointer.pos-r(v-for="item in list" :class="[{active:platform.chooseWidgetId===item.id}]" :key="item.id" @click="handleChoose(item.id)")
				.d-widget-line.fn-flex.flex-row
					i-icon(:type="`md-eye${item.config.widget.hide ? '-off' : ''}`" :title="!item.config.widget.hide ? '隐藏' : '显示'" @click="handleTaggerHide(item.id)")
					i-icon(:type="`md-${item.config.widget.locked ? '' : 'un'}lock`" :title="!item.config.widget.locked ? '锁定' : '解锁'" @click="handleTaggerLock(item.id)")
					i-icon(type="md-trash" title="删除" @click="handleDelete(item.id)")
					h3 TYPE: {{item.config.widget.name}}
				//i-input(v-if="scene.index===item" size="small" @on-change="e=>handleSceneName(item,e)" :value="scene.obj[item].name")
				.d-widget-line.fn-flex.flex-row
					h2 {{item.type}}
					p ID: {{item.id}}
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
	export default class DRightWidget extends Vue {
		scene: any = scene.state
		platform: any = platform.state

		get list() {
			let list = []
			for (let key in this.platform.widgetAdded) {
				const item = this.platform.widgetAdded[key]
				if (item.scene === this.scene.index)
					list.push(item)
			}
			return list
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
	}
</script>
<style lang="scss" scoped>
	@import "../../../src/scss/conf";

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
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			border-bottom: 1px solid $borderColor;
		}

		.d-widget-line {
			align-items: center;
		}

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
</style>
