<template lang="pug">
	d-right-modal.d-manage-modal(title="组件配置" ref="modal" @show="$emit('show')")
		.d-manage-modal-tab.fn-flex.flex-row
			h2.pointer(v-for="(item,index) in list" :class="tabIndex===index?'active':''" @click="handleChangeTab(index)") {{item.title}}
		template(v-for="(item,index) in list")
			itemList(:list="item.list" v-if="tabIndex===index")
</template>
<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator'
	import itemList from './item-list.vue'
	import dRightModal from '../d-right-modal'
	import config from './config'

	@Component({
		components: {
			itemList, dRightModal
		},
	})
	export default class DManage extends Vue {
		tabIndex: number = 0
		list: any = [
			{
				title: '基础配置', list: config.base
			},
			{
				title: '样式配置', list: config.style
			},
			{
				title: '数据配置', list: [
					{
						prop: 'config.api.url',
						label: '接口地址',
						type: 'func-input',
					},
					{
						prop: 'config.api.method',
						label: '请求方式',
						type: 'func-select',
						options: [
							{
								label: '默认',
								value: ''
							},
							{
								label: 'GET',
								value: 'GET'
							},
							{
								label: 'POST',
								value: 'POST'
							},
							{
								label: 'PUT',
								value: 'PUT'
							},
							{
								label: 'DELETE',
								value: 'DELETE'
							},
							{
								label: 'PATCH',
								value: 'PATCH'
							}
						]
					},
					{
						prop: 'config.api.params',
						label: '请求参数',
						type: 'func-textarea',
						rows: 5,
						placeholder: '支持非严格模式的JSON格式\n例：a:1,b:2\n或：{a:1,b:2}\n或：{a:some string,b:2}\n或：[{a:1,b:2}]'
					},
					{
						prop: 'config.api.path',
						label: '数据路径',
						type: 'func-input'
					},
					{
						prop: 'config.api.data',
						label: '数据测试',
						type: 'func-textarea',
						rows: 5
					},
				]
			},
			{
				title: '自定义配置', list: []
			},
			{
				title: '看板配置', list: config.config
			}
		]

		handleClose() {
			this.$refs.modal.rightModal = false
		}

		handleChangeTab(index) {
			this.tabIndex = index
			if (index === 3) {
				this.list[3].list = [...window.GoldChart.store.kanboard.chooseWidgetCustomConfig]
			}
		}
	}
</script>
<style lang="scss">
	.d-manage-modal-control {
		> label {
			display: block;
			font-size: 14px;
			margin-bottom: 10px;
		}

		.ivu-input-number {
			display: block;
			margin-bottom: 10px;
		}

		.ivu-input-wrapper, .ivu-select {
			margin-bottom: 10px;
		}

		.ivu-radio-group-button {
			display: block;
			margin-bottom: 10px;
		}
	}

	.d-manage-modal-tab {
		h2 {
			font-size: 16px;
			height: 40px;
			margin-right: 10px;
			color: rgba(0, 0, 0, .3);
			user-select: none;

			&:hover, &.active {
				color: rgba(0, 0, 0, .65);
			}

			&:last-child {
				margin-right: 0;
			}
		}
	}
</style>
