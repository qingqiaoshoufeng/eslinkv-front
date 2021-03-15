<template lang="pug">
	e-layout
		.list-container
			ul.fn-flex.flex-row.list-item-card-box
				item-card(v-for="item in list" v-bind="item" :key="item.id" @init="init")
			Page(:total="total" :show-sizer="true" :show-elevator="true" :show-total="true" @on-change="handleChange" @on-page-size-change="handlePageSize")
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import itemCard from './item-card.vue'
	import { Page, Button, Input, DatePicker, Select, Option } from 'view-design'

	@Component({
		components: { itemCard, Page, Button, Input, DatePicker, Select, Option }
	})
	export default class Template extends Vue {
		list: any[] = []
		total: number = 0
		pageNum: number = 1
		pageSize: number = 10
		date: any = []
		
		handleChange (pageNum) {
			this.pageNum = pageNum
			this.init()
		}

		handlePageSize (pageSize) {
			this.pageSize = pageSize
			this.init()
		}

		init () {
			this.$api.panel.list({
				pageSize: this.pageSize,
				type: 1,
pageNum: this.pageNum,
				...this.query
			}).then(res => {
				this.list = res.list
				this.total = res.total
			})
		}

		mounted () {
			this.init()
		}
	}
</script>
<style lang="scss" scoped>
	.list-container {
		min-width: 930px;
		height: 100%;
		padding: 15px;

		.ml20 {
			margin-left: 20px;
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
