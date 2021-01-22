<template lang="pug">
	.d-manage-box.pos-a
		.d-manage.pos-a.pointer
			Icon(type="ios-construct" title="组件配置" @click="handleClick" size="28" :class="[{active:manageModal}]")
		.d-manage-modal.pos-a(:class="[{active:manageModal}]")
			.d-manage-modal-tab.fn-flex.flex-row
				h2.pointer(v-for="(item,index) in list" :class="tabIndex===index?'active':''" @click="handleChangeTab(index)") {{item.title}}
			template(v-for="(item,index) in list")
				itemList(:list="item.list" v-if="tabIndex===index")
</template>
<script lang="ts">
	import {Icon} from 'view-design'
	import {Component, Vue} from 'vue-property-decorator'
	import itemList from './item-list.vue'

	@Component({
		components: {
			Icon, itemList
		},
	})
	export default class extends Vue {
		manageModal: boolean = false
		tabIndex: number = 0
		list: any = [
			{
				title: '基础配置', list: ['id','type']
			},
			{
				title: '数据配置', list: []
			}
		]

		handleClick() {
			this.manageModal = !this.manageModal
			this.$emit('show')
		}

		handleChangeTab(index) {
			if (this.tabIndex !== index)
				this.tabIndex = index
		}
	}
</script>
<style lang="scss" scoped>
	.d-manage-box {
		width: 24px;
		height: 24px;
		right: 15px;
		top: 253px;
	}

	.d-manage {
		right: 0;
		top: 0;
		z-index: 2;
		width: 24px;
		height: 24px;

		.ivu-icon {
			opacity: .6;

			&:hover, &.active {
				opacity: 1;
			}
		}
	}

	.d-manage-modal {
		right: -380px;
		top: -218px;
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
		overflow-y: auto;
		padding: 10px;

		&.active {
			visibility: inherit;
			right: 40px;
			opacity: 1;
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
		}
	}
</style>
