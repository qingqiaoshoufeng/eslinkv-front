<template lang="pug">
	.container
		iTable(:columns="columns" :data="tableData")
			template(#image="{ row }")
				img.avatar(:src="row.image")
		.page
			page(:total="total" show-elevator show-total :page-size="pageSize" :current="pageNum" @on-change="pageChange")

</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { Table, Page } from 'view-design'
import { getCompListAll } from '@/api/bussiness.api'

@Component({ components: { iTable: Table, Page } })
class Market extends Vue {
	tableData = []
	columns = [
		{
			title: '组件名',
			key: 'title'
		},
		{
			title: '组件英文名',
			key: 'componentId'
		},
		{
			title: '略缩图',
			slot: 'image'
		},
	]
	total: number = 0
	pageNum: number = 1
	pageSize: number = 10

	async search () {
		const res = await getCompListAll({
			pageNum: this.pageNum,
			pageSize: this.pageSize,
		})
		this.tableData = res.rows
		this.total = res.count
	}

	pageChange (page) {
		this.pageNum = page
		this.search()
	}

	created () {
		this.search()
	}
}

export default Market

</script>
<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	background: #fff;
	.page {
		text-align: center;
		margin-top: 10px;
	}
	.avatar {
		width: 100px;
		height: 60px;
		vertical-align: middle;
	}
}
</style>
