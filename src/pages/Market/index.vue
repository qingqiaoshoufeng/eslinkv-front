<template lang="pug">
    .container
        Table(:columns="columns" :data="tableData")
            template(#createTime="{ row }")
                span {{$format(new Date(row.createTime),'yyyy-MM-dd HH:mm:ss')}}
            template(#componentImage="{ row }")
                ImageView.avatar(:images="[row.componentImage]")
            template(#action="{ row }")
                Button.mr10(type="primary" size="small" @click="changeVersion(row)" style="margin-bottom: 4px;") 切换版本
                Button.mr10(type="primary" size="small" @click="edit(row)") 编辑
                Button(type="error" size="small" @click="remove(row)") 删除
        .page
            page(:total="total" show-elevator show-total :page-size="pageSize" :current="pageNum" @on-change="pageChange")

        editDialog(v-model="editDialogShow" :detail="currentRow" @reload="reload")
        versionDialog(v-model="versionDialogShow" :detail="currentRow" @reload="reload")

</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {Table, Page, Button} from 'view-design'
    import {getCompListAll, destroyComponent} from '@/api/bussiness.api'
    import ImageView from '@/components/ImageView/index.vue'
    import editDialog from './editDialog.vue'
    import versionDialog from './versionDialog.vue'

    @Component({
        components: {
            Table,
            Button,
            Page,
			versionDialog,
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
                title: '当前版本号',
                key: 'componentVersion'
            },
            {
                title: '略缩图',
                slot: 'componentImage'
            },
            {
                title: 'js地址',
				key: 'componentJsUrl'
            },
            {
                title: '创建时间',
                slot: 'createTime'
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
        editDialogShow: boolean = false
		versionDialogShow: boolean = false
        currentRow: any = null

        async search() {
            const res = await getCompListAll({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            })
            this.tableData = res.rows
            this.total = res.count
        }

        reload() {
            this.pageNum = 1
            this.pageSize = 10
            this.search()
        }

        remove(row) {
            this.$Modal.confirm({
                title: '确定删除吗',
                onOk: async () => {
                    await destroyComponent({componentId: row.componentId})
                    this.$Message.success('操作成功')
                    this.reload()
                }
            })
        }

		changeVersion(row) {
            this.currentRow = row
            this.versionDialogShow = true
        }

        edit(row) {
            this.currentRow = row
            this.editDialogShow = true
        }

        create() {
            this.currentRow = {
                componentTitle: '',
                componentImage: '',
                componentJsUrl: '',
                componentEnTitle: '',
                componentTypeId: '',
                sort: ''
            }
            this.editDialogShow = true
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
    .container {
        width: 100vw;
        height: 100vh;
        background: #fff;
        padding: 15px;

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
