<template lang="pug">
    .container
        .btn-box
            Button.mr10(type="primary" @click="changeVersion" :disabled="!selectOne") 切换版本
            Button.mr10(type="primary" @click="edit" :disabled="!selectOne") 编辑
            Button(type="error" @click="remove" :disabled="!selectOne") 删除
        Table(:columns="columns" :data="tableData" @on-selection-change="selectHandle")
            template(#createTime="{ row }")
                span {{$format(new Date(row.createTime),'yyyy-MM-dd HH:mm:ss')}}
            template(#componentImage="{ row }")
                ImageView.avatar(:images="[row.componentImage]")
        .page
            page(:total="total" show-elevator show-total :page-size="pageSize" :current="pageNum" @on-change="pageChange")
        dialogEdit(v-model="dialogEditShow" :detail="currentRow" @reload="reload")
        dialogVersion(v-model="dialogEditVersionShow" :detail="currentRow" @reload="reload")
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {Table, Page, Button} from 'view-design'
    import {getCompListAll, destroyComponent} from '../../../lib/api/bussiness.api'
    import ImageView from '@/components/ImageView/index.vue'
    import dialogEdit from './dialogEditComponent.vue'
    import dialogVersion from './dialogEditComponentVersion.vue'

    @Component({
        components: {
            Table,
            Button,
            Page,
            dialogEdit,
            ImageView,
            dialogVersion
        }
    })
    export default class Market extends Vue {
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
                title: '略缩图',
                slot: 'componentImage'
            },
            {
                title: '创建时间',
                slot: 'createTime'
            },
        ]
        total: number = 0
        pageNum: number = 1
        pageSize: number = 10
        dialogEditShow: boolean = false
        dialogEditVersionShow: boolean = false
        currentRow: any = null
        selectMore: any = false
        selectOne: any = false

        async search() {
            const res = await getCompListAll({
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

        remove() {
            this.$Modal.confirm({
                title: '确定删除吗',
                onOk: async () => {
                    await destroyComponent({componentId: this.selectOne.componentId})
                    this.$Message.success('操作成功')
                    this.reload()
                }
            })
        }

        changeVersion() {
            this.currentRow = this.selectOne
            this.dialogEditVersionShow = true
        }

        edit() {
            this.currentRow = this.selectOne
            this.dialogEditShow = true
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
            this.dialogEditShow = true
        }

        pageChange(page) {
            this.pageNum = page
            this.search()
        }

        created() {
            this.search()
        }
    }
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
