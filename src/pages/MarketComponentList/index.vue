<template lang="pug">
e-layout
	.market-container
		.fn-flex.flex-row
			i-button(type="primary", @click="handleCheck") 组件审核
			i-button(
				type="primary",
				:style="{ marginLeft: '10px' }",
				@click="handleType") 组件分类
			i-button(
				type="primary",
				:style="{ marginLeft: '10px' }",
				@click="handleTheme") 主题配色
			i-button(type="primary", @click="handleDownload", style="margin-left: auto") 下载组件开发工具
		.search
		e-page(
			@init="init",
			:total="total",
			ref="page",
			:loaded="loaded",
			:pageSize="10")
			ul.list-item-card-box
				item-card(
					v-for="(item, i) in list",
					:item="item",
					:key="i",
					@reload="reload")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button } from 'view-design'
import itemCard from './item-card.vue'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
		itemCard,
	},
})
export default class MarketComponentList extends Vue {
	list = []
	total = 0
	loaded = false

	async init({ pageNum, pageSize }) {
		const res = await this.$api.marketComponent.list({
			pageNum,
			pageSize,
			status: 'SUCCESS',
			isCurrentVersion: true,
		})
		this.loaded = true
		this.list = res.list
		this.total = res.count
	}

	handleDownload() {
		window.open('https://www.npmjs.com/package/eslinkv-sdk')
	}

	handleTheme() {
		this.$router.push('/market/themeList')
	}

	handleCheck() {
		this.$router.push('/market/componentCheckList')
	}

	handleType() {
		this.$router.push('/market/componentType')
	}

	reload() {
		;(this.$refs.page as any).reload()
	}
}
</script>
<style lang="scss" scoped>
.market-container {
	padding: 15px;
	.list-item-card-box {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}
	&::v-deep {
		.viewer-canvas {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	.avatar {
		width: 100px;
		height: 60px;
		vertical-align: middle;
	}

	.mr10 {
		margin-right: 10px;
	}

	.btn-box {
		margin-bottom: 10px;
	}

	.search {
		margin-top: 10px;
	}
}
</style>
