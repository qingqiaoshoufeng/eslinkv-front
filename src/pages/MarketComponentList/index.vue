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

@Component
export default class MarketComponentList extends Vue {
	currentComponent = null
	selectIndex = 0
	list = [
		{
			title: '我的组件',
			component: () => import('./myComponent.vue'),
		},
		{
			title: '组件审核',
			component: () => import('./checkMyComponent.vue'),
		},
		{
			title: '组件分类',
			component: () => import('./myComponentType.vue'),
		},
		{
			title: '我的收藏',
			component: () => import('./collectionComponent.vue'),
		},
		{
			title: '收藏分类',
			component: () => import('./collectionComponentType.vue'),
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
