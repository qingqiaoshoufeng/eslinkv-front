<template lang="pug">
	e-layout
		.market-container
			.btn-box
				i-button.mr10(type="primary" @click="check" :disabled="!selectOne") 审核
			i-table(:columns="columns" :data="list" @on-selection-change="selectHandle")
				template(#status="{ row }")
					span {{status[row.status]}}
				template(#createTime="{ row }")
					span {{$format(new Date(row.createTime),'yyyy-MM-dd HH:mm:ss')}}
			e-page(@init="init" :total="total" ref="page")
			dialogCheck(v-model="dialogCheckShow" :detail="currentRow" @reload="reload")
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Table, Button } from 'view-design'
	import dialogCheck from './dialogCheckComponent.vue'
	import commonConfigValue from 'eslinkv-npm/common-config-value.js'
	import { configMerge } from 'eslinkv-npm/mixins'
	import platform from 'eslinkv-npm/src/store/platform.store.js'

	@Component({
		components: {
			'i-table': Table,
			'i-button': Button,
			dialogCheck
		}
	})
	export default class Market extends Vue {
		list = []
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
				title: '当前版本号',
				key: 'currentVersion'
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
		dialogCheckShow: boolean = false
		currentRow: any = null
		selectMore: any = false
		selectOne: any = false
		status: any = {
			error: '审核失败',
			pending: '待审核',
			success: '审核通过'
		}

		async init ({ pageNum, pageSize }) {
			const res = await this.$api.marketComponent.list({
				pageNum,
				pageSize
			})
			this.list = res.rows
			this.total = res.count
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
			const id = +new Date()
			const value = JSON.parse(this.selectOne.componentConfig)
			value.widget.componentVersion = this.selectOne.componentVersion
			const config = configMerge(value, commonConfigValue())
			platform.state.widgetAdded = {
				[id]: {
					id,
					type: this.selectOne.componentEnTitle,
					config,
					scene: 0,
					market: true
				}
			}
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
