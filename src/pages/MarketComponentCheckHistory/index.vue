<template lang="pug">
    .container
        Table(:columns="columns" :data="tableData")
            template(#status="{ row }")
                span {{status[row.status]}}
            template(#createTime="{ row }")
                span {{$format(new Date(row.createTime),'yyyy-MM-dd HH:mm:ss')}}
        .page
            page(:total="total" show-elevator show-total :page-size="pageSize" :current="pageNum" @on-change="pageChange")
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Table, Page, Button } from 'view-design'
	// import { getCheckHistoryList } from 'eslinkv-sdk/src/api/bussiness.api'

    @Component({
        components: {
            Table,
            Button,
            Page
        }
    })
	export default class Market extends Vue {
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
                title: '组件版本号',
                key: 'componentVersion'
            },
            {
                title: '审核状态',
                slot: 'status'
            },
            {
                title: '创建时间',
                slot: 'createTime'
            }
        ]

        total: number = 0
        pageNum: number = 1
        pageSize: number = 10
        status: any = {
            error: '审核失败',
            pending: '待审核',
            success: '审核通过'
        }

        async search () {
            // const res = await getCheckHistoryList({
            //     pageNum: this.pageNum,
            //     pageSize: this.pageSize
            // })
            // this.tableData = res.rows
            // this.total = res.count
        }

        pageChange (page) {
            this.pageNum = page
            this.search()
        }

        created () {
            this.search()
        }
	}
</script>
<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		padding: 15px;
		background: #fff;

		.page {
			margin-top: 10px;
			text-align: center;
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
