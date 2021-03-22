<template lang="pug">
	e-layout
		.market-container
			.btn-box
				i-button.mr10(type="primary" @click="check" :disabled="!selectOne") 新增
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
	export default class MarketComponentType extends Vue {
		list = []
		columns = [
			{
				title: '分类名',
				key: 'componentTypeName'
			},
      {
        title: '父级分类名',
        key: 'componentTypeParentName'
      },
			{
				title: '创建时间',
				slot: 'createTime'
			}
		]

		total: number = 0
		dialogCheckShow: boolean = false
		currentRow: any = null
		selectMore: any = false
		selectOne: any = false

    init ({ pageSize, pageNum }) {
			this.$api.marketComponentType.list({
        pageSize,
        pageNum
      }).then(res => {
        this.list = res.list
        this.total = res.count
      })
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
