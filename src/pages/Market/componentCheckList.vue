<template lang="pug">
    .container
        .btn-box
            Button.mr10(type="primary" @click="check" :disabled="!selectOne") 审核
        Table(:columns="columns" :data="tableData" @on-selection-change="selectHandle")
            template(#createTime="{ row }")
                span {{$format(new Date(row.createTime),'yyyy-MM-dd HH:mm:ss')}}
        .page
            page(:total="total" show-elevator show-total :page-size="pageSize" :current="pageNum" @on-change="pageChange")
        dialogCheck(v-model="dialogCheckShow" :detail="currentRow" @reload="reload")
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {Table, Page, Button} from 'view-design'
    import {getWaitAuditList} from '@/api/bussiness.api'
    import dialogCheck from './dialogCheckComponent.vue'

    @Component({
        components: {
            Table,
            Button,
            Page,
            dialogCheck
        }
    })
    class Market extends Vue {
        tableData = []
        columns = [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
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
                title: '创建时间',
                slot: 'createTime'
            },
        ]
        total: number = 0
        pageNum: number = 1
        pageSize: number = 10
        dialogCheckShow: boolean = false
        currentRow: any = null
        selectMore: any = false
        selectOne: any = false

        async search() {
            const res = await getWaitAuditList({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            })
            this.tableData = res.rows
            this.total = res.count
        }

        selectHandle(selection) {
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

        reload() {
            this.pageNum = 1
            this.pageSize = 10
            this.search()
        }

        check() {
            this.currentRow = this.selectOne
            this.dialogCheckShow = true
        }

        pageChange(page) {
            this.pageNum = page
            this.search()
        }

        created() {
            this.search()
        }
    }

    export default Market
</script>
<style lang="scss">
    .viewer-canvas {
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>
<style lang="scss" scoped>
    .btn-box {
        margin-bottom: 10px;
    }
    
    .container {
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 15px;
        
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
