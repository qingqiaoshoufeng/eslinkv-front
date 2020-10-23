<template>
	<div class="import-widgets pos-a fn-flex">
		<div class="wrapper">
			<header class="wrapper-header fn-flex">
				导入小工具
				<div class="close pointer" title="关闭" @click="$emit('close')">×</div>
			</header>
			<Form ref="importForm" class="import-edit fn-flex" :label-width="80">
				<label
					v-if="!widgets"
					:data-name="originFile ? originFile.name || '请选择文件' : '请选择文件'"
					for="originFile"
					class="select-file style-file-input pos-r pointer text-center"
				>
					<input class="pos-a" id="originFile" type="file" accept="application/json" @change="handleFile"/>
				</label>
				<div v-if="widgets" class="widget-list fn-flex">
					<div class="widgets-confirm-header fn-flex">
						<strong>请勾选要导入的小工具</strong>
						<span class="count">{{ checkedNumber }} / {{ widgets.length }}</span>
						<Checkbox :value="isAllChecked" :indeterminate="!isAllChecked && !isAllUnChecked"
								  @on-change="handleAllCheck">全选
						</Checkbox>
					</div>
					<div class="scroller">
						<div v-for="item in widgets" :key="item.id" :class="{ 'is-child-widget': item.combinationTo }"
							 class="style-checkbox pos-r pointer" @click="handleWidgetCheck(item)">
							<Icon :color="widgetCheckedState[item.id] ? '#2d8cf0' : 'gray'"
								  :type="`ios-checkbox${widgetCheckedState[item.id] ? '' : '-outline'}`" size="18"/>
							<span class="id">{{ item.id }}</span>
							<span class="type">{{ item.type }}</span>
							<span class="name">{{ item.name }}</span>
						</div>
					</div>
				</div>
			</Form>
			<footer class="wrapper-footer fn-flex">
				<Button @click="$emit('close')">取消导入</Button>
				<Button @click="handleReset">重置</Button>
				<Button type="primary" @click="startImport" :disabled="!this.config" :loading="loading">执行导入</Button>
			</footer>
		</div>
	</div>
</template>
<script>
	/**
	 * @description
	 *
	 * 该页面是 图层管理的，最上面的按钮，导入小工具
	 * 与hot-keys等同一层级，混在一起
	 * 不容易管理
	 *
	 * todo 移动目录
	 */
	import widgetTypes from '../../views/core/widgets/widget-type-list'

	export default {
		name: 'import-widgets',
		components: {},
		data() {
			return {
				originFile: null,
				config: null,
				widgetCheckedState: {},
				loading: false
			}
		},
		methods: {
			handleFile(e) {
				const file = e.target.files[0]
				const reader = new FileReader()
				this.originFile = file
				reader.onload = e => {
					try {
						const data = JSON.parse(e.target.result)
						this.config = data
					} catch (e) {
						this.$Message.error('配置文件识别失败！')
					}
				}
				reader.onerror = e => {
					this.$Message.error('配置文件识别失败！')
				}
				reader.readAsText(file)
			},
			handleReset() {
				this.$refs.importForm.$el.reset()
				this.originFile = null
				this.config = null
				this.widgetCheckedState = {}
			},
			startImport(e) {
				this.loading = true
				const data = {...this.config.data}
				const widgets = data.widgets.filter(widget => this.widgetCheckedState[widget.id])
				this.$emit('import-widgets', widgets)
			},
			handleAllCheck(state) {
				Object.keys(this.widgetCheckedState).map(id => {
					this.widgetCheckedState[id] = state
				})
			},
			handleWidgetCheck(widget) {
				const {id, widgetType, combinationTo} = widget
				const widgetCheckedState = this.widgetCheckedState
				widgetCheckedState[id] = !widgetCheckedState[id]
				if (widgetCheckedState[id]) {
					if (combinationTo) {
						widgetCheckedState[combinationTo] = true
					}
				} else {
					if (widgetType === 'combination') {
						this.widgets.filter(widget => widget.combinationTo === id).forEach(widget => {
							widgetCheckedState[widget.id] = false
						})
					}
				}
			}
		},
		computed: {
			widgets() {
				if (!this.config) return
				this.widgetCheckedState = {}
				return this.config.data.widgets.map(widget => {
					const {id, type, value} = widget
					const {name, combinationTo} = value.widget
					return {
						id,
						type: widgetTypes[type],
						widgetType: type,
						name: name || '未命名小工具',
						combinationTo
					}
				})
			},
			checkedNumber() {
				return Object.values(this.widgetCheckedState).filter(item => item).length
			},
			isAllChecked() {
				return Object.values(this.widgetCheckedState).findIndex(item => !item) === -1
			},
			isAllUnChecked() {
				return Object.values(this.widgetCheckedState).findIndex(item => item) === -1
			}
		},
		watch: {
			widgets: {
				handler: function (value) {
					if (!value) return
					value.forEach(item => {
						this.$set(this.widgetCheckedState, item.id, false)
					})
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss">
	.import-widgets {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		justify-content: center;
		align-items: center;
		z-index: 999;
		background-color: rgba(0, 0, 0, 0.2);

		.wrapper {
			width: 600px;
			height: 540px;
			margin: auto;
			background-color: white;
			border: 1px solid #e2e2e2;
			box-shadow: rgba(0, 0, 0, 0.5) 0 10px 24px;
			padding: 10px 20px 10px 25px;
		}
	}

	.import-edit {
		width: 100%;
		height: calc(100% - 120px);
		padding-right: 5px;
		justify-content: center;
		align-items: center;
	}

	.wrapper-header {
		font-size: 18px;
		line-height: 2em;
		font-weight: bold;
		justify-content: space-between;
		margin-bottom: 20px;

		.close {
			font-size: 2em;
			font-weight: normal;
		}
	}

	.style-file-input {
		overflow: hidden;
		min-width: 100px;
		padding: 10px 30px;
		border: 1px solid #dcdfe6;

		input {
			left: 0;
			top: 0;
			opacity: 0;
			pointer-events: none;
		}

		&:before {
			content: attr(data-name);
		}

		&:hover,
		&:focus {
			color: #57a3f3;
			border-color: currentColor;
		}
	}

	.style-checkbox {
		border: 1px solid #dcdfe6;
		align-items: center;
		padding: 0 8px;
		margin-bottom: 5px;
		user-select: none;
		background-color: white;
		z-index: 2;

		&:hover {
			background-color: #f2f2f2;
		}

		.type {
			width: 120px;
			padding: 0 12px;
			white-space: nowrap;
		}

		.id {
			padding-left: 10px;
		}

		&.is-child-widget {
			margin-left: 15px;
			z-index: 1;

			&:before, &:after {
				content: '';
				position: absolute;
				left: -8px;
				bottom: 0;
				margin: auto;
			}

			&:before {
				top: 2px;
				width: 7px;
				height: 0;
				border-top: 1px solid #dedede;
			}

			&:after {
				top: -32px;
				width: 0;
				height: 35px;
				border-left: 1px solid #dedede;
			}
		}
	}

	.widgets-confirm-header {
		border: 1px solid #dcdfe6;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;
		padding-left: 8px;
	}

	.wrapper-footer {
		align-items: center;
		justify-content: center;
		height: 60px;
		margin-top: 15px;

		/deep/ .ivu-btn {
			margin: 0 7px;
		}
	}

	.widget-list {
		flex-direction: column;
		width: 100%;
		height: 100%;
		line-height: 28px;

		label {
			position: sticky;
			top: 15px;
		}

		.scroller {
			overflow-x: hidden;
			padding: 0 8px 0 0;
			margin-right: -8px;
		}
	}
</style>
