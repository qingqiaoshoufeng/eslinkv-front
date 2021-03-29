<template lang="pug">
  e-layout
    i-table(:columns="columns" :data="tableData")
      template(#createTime="{row}")
        span {{$format(new Date(row.createTime),'yyyy-MM-dd HH:mm:ss')}}
      template(#appKey="{row}")
        .secret
          .secret-row
            label appKey:
            .content {{row.appKey}}
          .secret-row
            label appSecret:
            .content {{ row.isSecretKeyShow ? row.appSecret : row.appSecret.replaceAll(/./g, '*') }}
              .show(@click="row.isSecretKeyShow = !row.isSecretKeyShow") {{ row.isSecretKeyShow ? '隐藏' : '显示' }}
      template(#isUsed="{row}")
        span.use(v-if="row.isUsed") 使用中
        span.stop(v-else) 已停用
      template(#action="{row}")
        i-button(type="warning" @click="handleUse(row)" v-if="row.isUsed") 停用
        i-button(type="info" @click="handleUse(row)" v-else) 启用
    .create
      i-button(type="primary" @click="create") 创建密钥
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
	export default class SecretKey extends Vue {
    tableData = []
    columns = [
      {
        width: 170,
        title: '创建时间',
        slot: 'createTime'
      },
      {
        minWidth: 300,
        title: 'appKey/appSecret',
        slot: 'appKey'
      },
      {
        title: '状态',
        slot: 'isUsed'
      },
      {
        title: '操作',
        slot: 'action'
      }
    ]

    async getList () {
      const res = await this.$api.secretKey.getAllSecretKey()
      res.forEach(v => {
        v.isSecretKeyShow = false
      })
      this.tableData = res
    }

    async create () {
      await this.$api.secretKey.createSecretKey()
      await this.getList()
    }

    async handleUse (row) {
      if (row.isUsed) {
        await this.$api.secretKey.stopSecretKey({
          appKey: row.appKey,
          appSecret: row.appSecret
        })
      } else {
        await this.$api.secretKey.useSecretKey({
          appKey: row.appKey,
          appSecret: row.appSecret
        })
      }
      this.$Message.success('操作成功')
      this.getList()
    }

		async mounted () {
      await this.getList()
      if (this.tableData.length === 0) {
        this.$Message.success({
          background: true,
          content: '让我们创建第一个密钥吧'
        })
      }
		}
	}
</script>
<style lang="scss" scoped>
.secret {
  .secret-row {
    display: flex;
    align-items: center;
    height: 40px;
    label {
      width: 70px;
      flex: none;
      margin-right: 6px;
      text-align: right;
    }
    .content {
      position: relative;
      width: 244px;
      font-size: 12px;
      height: 32px;
      background-color: #f5f7fa;
      color: #ADBCD9;
      border-radius: 4px;
      padding: 6px 12px;
      border: 1px solid #E9EDF4;

      .show {
        position: absolute;
        z-index: 2;
        right: 4px;
        top: 7px;
        width: 33px;
        height: 18px;
        line-height: 18px;
        color: #fff;
        font-size: 12px;
        padding: 0;
        text-align: center;
        background-color: #b8c7e6;
        border-radius: 3px;
      }
    }
  }
}
.create {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
