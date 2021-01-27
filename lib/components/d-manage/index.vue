<template lang="pug">
	d-right-modal.d-manage-modal(title="组件配置" ref="modal" @show="$emit('show')")
		.d-manage-modal-tab.fn-flex.flex-row
			h2.pointer(v-for="(item,index) in list" :class="tabIndex===index?'active':''" @click="handleChangeTab(index)") {{item.title}}
			h2.pointer(:class="tabIndex===list.length?'active':''" @click="handleChangeTab(list.length)") 看板配置
		template(v-for="(item,index) in list")
			itemList(:list="item.list" v-if="tabIndex===index")
</template>
<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator'
	import itemList from './item-list.vue'
	import dRightModal from '../d-right-modal'

	@Component({
		components: {
			itemList, dRightModal
		},
	})
	export default class DManage extends Vue {
		tabIndex: number = 0
		list: any = [
			{
				title: '基础配置', list: [
					{
						prop: 'id',
						label: '组件id',
						type: 'func-input',
						disabled: true
					},
					{
						prop: 'type',
						label: '组件类型',
						type: 'func-input',
						disabled: true
					},
					{
						prop: 'config.layout.size.width',
						label: '宽',
						type: 'func-input'
					},
					{
						prop: 'config.layout.size.height',
						label: '高',
						type: 'func-input'
					}
				]
			},
			{
				title: '样式配置', list: []
			},
			{
				title: '数据配置', list: []
			},
			{
				title: '自定义配置', list: []
			},
		]

		handleClose() {
			this.$refs.modal.rightModal = false
		}

		handleChangeTab(index) {
			this.tabIndex = index
			if (index === 3) {
				this.list[3].list = [...window.GoldChart.store.kanboard.chooseWidgetConfig]
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
