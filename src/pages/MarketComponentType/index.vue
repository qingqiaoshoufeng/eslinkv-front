<template lang="pug">
	e-layout
		.market-container
			.btn-box
				i-button.mr10(type="primary" @click="check" :disabled="!selectOne") 审核
			i-table(:columns="columns" :data="list")
			e-page(@init="init" :total="total" ref="page")
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Table, Button } from 'view-design'

	@Component({
		components: {
			'i-table': Table,
			'i-button': Button
		}
	})
	export default class Market extends Vue {
		list = []
		columns = [
			// {
			// 	type: 'selection',
			// 	width: 60,
			// 	align: 'center'
			// },
			{
				title: '组件分类名',
				key: 'componentTypeName'
				// tree: true
			}
			// {
			// 	title: '创建时间',
			// 	slot: 'createTime'
			// },
		]

		total: number = 0
		dialogCheckShow: boolean = false
		currentRow: any = null
		selectMore: any = false
		selectOne: any = false
		status: any = {
			error: '审核失败',
			pending: '待审核',
			success: '审核通过'
		}

		async init () {
			const res = await this.$api.marketComponentType.getAllComponentType()
			this.list = res
			this.total = res.length
		}

		selectHandle (selection) {
			if (selection.length > 1) {
				this.selectMore = selection
			} else {
				this.selectMore = false
			}
			if (selection.length === 1) {
				this.selectOne = selection[0]
			} else {
				this.selectOne = false
			}
		}

		check () {
			this.currentRow = this.selectOne
			this.dialogCheckShow = true
		}

		reload () {
			this.$refs.page.reload()
		}
	}
</script>
<style lang="scss" scoped>

	.btn-box {
		margin-bottom: 10px;
	}

	.market-container {
		padding: 15px;

		.mr10 {
			margin-right: 10px;
		}
	}
</style>
