<template lang="pug">
	.container
		.new
			iButton(type="primary" size="small" @click="create") 新增
		iTable(:columns="columns" :data="tableData")
			template(#componentImage="{ row }")
				ImageView.avatar(:images="[row.componentImage]")
			template(#action="{ row }")
				iButton.mr10(type="primary" size="small" @click="edit(row)") 编辑
				iButton(type="error" size="small" @click="remove(row)") 删除
		.page
			page(:total="total" show-elevator show-total :page-size="pageSize" :current="pageNum" @on-change="pageChange")

		editDialog(v-model="editDialogShow" :detail="currentRow")
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { Table, Page, Button } from 'view-design'
import { getCompListAll, destroyComponent } from '@/api/bussiness.api'
import ImageView from '@/components/ImageView/index.vue'
import editDialog from './editDialog.vue'

@Component({
	components: {
		iTable: Table,
		iButton: Button,
		Page,
		editDialog,
		ImageView
	}
})
class Market extends Vue {
	tableData = []
	columns = [
		{
			title: '组件名',
			key: 'componentTitle'
		},
		{
			title: '组件英文名',
			key: 'componentEnTitle'
		},
		{
			title: '略缩图',
			slot: 'componentImage'
		},
		{
			title: '操作',
			slot: 'action',
			width: 150,
			align: 'center'
		}
	]
	total: number = 0
	pageNum: number = 1
	pageSize: number = 10
	editDialogShow = false
	currentRow: any = null

	async search () {
		const res = await getCompListAll({
			pageNum: this.pageNum,
			pageSize: this.pageSize,
		})
		this.tableData = res.rows
		this.total = res.count
	}

	remove (row) {
		this.$Modal.confirm({
			title: '确定删除吗',
			onOk: async () => {
				await destroyComponent({ componentId: row.componentId })
				this.$Message.success('操作成功')
			}
		})
	}

	edit (row) {
		this.currentRow = row
		this.editDialogShow = true
	}

	create () {
		this.editDialogShow = true
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
	.new {
		text-align: right;
		padding: 10px;
	}
	.page {
		text-align: center;
		margin-top: 10px;
	}
	.avatar {
		width: 100px;
		height: 60px;
		vertical-align: middle;
	}
	.mr10 {
		margin-right: 10px;
	}
}
</style>
