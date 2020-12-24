<template>
	<div class="widget-layers pos-a"
		 @click.stop
		 @keyup.46.stop
		 @mouseleave="$emit('hover-widget', null)">
		<header class="header text-center" @mousemove.stop>
			小工具清单
			<!--			<div>-->
			<!--				<Button size="small" type="default" class="import" @click="$emit('import-widgets')">导入小工具</Button>-->
			<!--			</div>-->
		</header>
		<div class="widget-list-wrapper pos-r">
			<div class="widget-list pos-r" v-if="filteredWidgets.length">
				<template v-for="widget in filteredWidgets">
					<widget :key="widget.id" v-bind="widget" v-if="widget.scene===store.scene.index"
							:config="config(widget.id)">
						<template v-if="widget.isCombinationWidget">
							<widget v-for="child in widget.children" :key="child.id" v-bind="child"
									:config="config(widget.id)"/>
						</template>
					</widget>
				</template>
			</div>
			<div v-else class="no-item text-center">空空如也</div>
		</div>
	</div>
</template>
<script>
	import widget from './widget.vue'
	import widgetsTypes from '../../views/core/widgets/widget-type-list'
	import {Select, Option, Button, Icon} from 'view-design'
	import {store} from '../../store'

	export default {
		components: {widget, Select, Option, Button, Icon},
		inject: ['kanboardEditor'],
		props: {
			widgets: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				store,
				widgetsTypes: Object.keys(widgetsTypes).map(type => {
					return {
						type,
						label: widgetsTypes[type]
					}
				}),
				widgetType: null
			}
		},
		computed: {
			config() {
				return (id) => {
					if (this.kanboardEditor) {
						const data = this.kanboardEditor.widgetAdded
						const item = data[id]
						return item.config
					}
					return {}
				}
			},
			filteredWidgets() {
				if (!this.widgetType) return this.widgets
				return this.widgets.filter(widget => {
					if (!widget.children) return widget.type === this.widgetType
					const children = widget.children.filter(widget => widget.type === this.widgetType)
					if (children.length) {
						widget.children = children
						return true
					}
					return false
				})
			}
		}
	}
</script>

<style lang="scss">
	.widget-layers {
		right: 55px;
		top: 34px;
		bottom: 55px;
		width: 360px;
		background-color: white;
		border-radius: 5px;
		filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.15));
		overflow: hidden;
		z-index: 3;
		letter-spacing: 0;

		.header {
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

			.filter {
				max-width: 120px;
				height: 24px;

				/deep/ .ivu-select-selection {
					min-height: 22px;
				}
			}

			.import {
				border-radius: 3px;
				margin-right: 5px;
			}
		}

		.widget-list-wrapper {
			width: 100%;
			height: calc(100% - 42px);

			&:before,
			&:after {
				position: absolute;
				content: '';
				width: 100%;
				height: 15px;
				z-index: 2;
			}

			&:before {
				top: 0;
				background: linear-gradient(to bottom, white, transparent);
			}

			&:after {
				bottom: 0;
				background: linear-gradient(to top, white, transparent);
			}
		}

		.widget-list {
			width: 100%;
			height: 100%;
			overflow-x: hidden;
			padding: 15px 10px;
			z-index: 1;
			user-select: none;
		}

		.no-item {
			line-height: 4;
			font-size: 15px;
			opacity: 0.5;
		}
	}
</style>
