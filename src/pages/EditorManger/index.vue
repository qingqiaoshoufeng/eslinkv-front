<template lang="pug">
e-layout.market-container(:padding="false")
	.fn-flex.flex-row
		ul.market-left
			li.pointer(
				v-for="(item, index) in list",
				@click="select(index)",
				:key="item.title",
				:class="{ active: index === selectIndex }") {{ item.title }}
		component(
			:is="currentComponent",
			:style="{ flex: 1, paddingTop: '20px', paddingLeft: '20px' }")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import itemCard from './item-card.vue'
import { Page, Button, Input, DatePicker, Select, Option } from 'view-design'

@Component({
	components: {
		itemCard,
		'i-page': Page,
		'i-button': Button,
		'i-input': Input,
		'i-date-picker': DatePicker,
		'i-select': Select,
		'i-option': Option,
	},
})
export default class EditManger extends Vue {
	currentComponent = null
	selectIndex = 0
	list = [
		{
			title: '大屏编辑',
			component: () => import('./screenEditorListPage.vue'),
		},
		{
			title: '已发布大屏',
			component: () => import('./screenEditorPublishedListPage.vue'),
		},
	]
	async select(index: number) {
		this.selectIndex = index
		this.currentComponent = this.list[index].component
	}
	mounted(): void {
		this.select(this.selectIndex)
	}
}
</script>
<style lang="scss" scoped>
.search {
	align-items: center;
	&::v-deep {
		.ivu-input {
			font-size: 12px;
		}
	}
}
.market-container {
	&::v-deep {
		.e-layout-content {
			padding: 0 20px 20px 0;
		}
	}
}
.market-left {
	width: 200px;
	background: #fff;
	box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.08);
	min-height: calc(100vh - 50px);
	min-width: 200px;
	li {
		height: 48px;
		line-height: 48px;
		color: #666;
		font-size: 14px;
		padding: 0 16px;
		&.active {
			color: var(--themeColor);
			border-left: 3px solid var(--themeColor);
			background-color: #f2f9ff;
		}
	}
}
</style>
