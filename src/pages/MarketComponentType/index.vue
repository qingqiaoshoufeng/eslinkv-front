<template lang="pug">
  e-layout
    .market-container
      .btn-box
        i-button.mr10(type="primary" @click="create") 新增
        i-button.mr10(type="primary" @click="edit" :disabled="!selectOne") 编辑
      i-table(row-key="componentTypeId" :columns="columns" :data="list" @on-selection-change="selectHandle" :load-data="handleLoadData")
        template(#componentTypeParentName="{ row }")
          span {{row.componentTypeParentName?row.componentTypeParentName:'无'}}
        template(#createTime="{ row }")
          span {{$format(new Date(row.createTime),'yyyy-MM-dd HH:mm:ss')}}
      e-page(@init="init" :total="total" ref="page" :show="false")
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
        type: 'selection',
        width: 60,
        align: 'center'
      },
			{
				title: '分类名',
				key: 'componentTypeName',
        tree: true
			},
			{
				title: '创建时间',
				slot: 'createTime'
			}
		]

		total: number = 0
    dialogEditShow: boolean = false
		currentRow: any = null
		selectMore: any = false
		selectOne: any = false

    handleLoadData (item, callback) {
      this.$api.marketComponentType.level({ componentTypeParentId: item.componentTypeId }).then(res => {
        callback(res)
      })
    }

    init () {
			this.$api.marketComponentType.level().then(res => {
			  res.map(item => {
			    item.children = []
          item._loading = false
          return item
			  })
        this.list = res
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

    create () {

    }

    edit () {
			this.currentRow = this.selectOne
			this.dialogEditShow = true
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
