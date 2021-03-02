<template lang="pug">
	e-layout
		.market-container
			div
				i-button(type="warning" @click="handleCheck") 组件审核
				i-button(type="warning" :style="{marginLeft:'10px'}" @click="handleType") 组件分类
			.search
			e-page(@init="init" :total="total" ref="page")
				ul.fn-flex.flex-row.list-item-card-box
					item-card(v-for="item in list" :item="item" :key="item.id" @reload="reload")
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import {Table, Page, Button} from 'view-design'
	import {getCompListAll} from 'eslinkv-npm/src/api/bussiness.api.js'
	import itemCard from './item-card.vue'

	@Component({
		components: {
			'i-table': Table,
			'i-button': Button,
			'i-page': Page,
			itemCard
		}
	})
	export default class MarketComponentList extends Vue {
		list = []
		total: number = 0

		async init({pageNum, pageSize}) {
			const res = await getCompListAll({pageNum, pageSize,})
			this.list = res.rows
			this.total = res.count
		}

		handleCheck() {
			this.$router.push('/market/componentCheckList')
		}

		handleType() {
			this.$router.push('/')
		}

		reload() {
			this.$refs.page.reload()
		}
	}
</script>
<style lang="scss">
	.market-container {
		padding: 15px;

		/deep/ {
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

	.list-item-card-box {
		flex-wrap: wrap;
		margin-top: 15px;
	}
</style>
