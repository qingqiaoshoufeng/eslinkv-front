<template lang="pug">
e-layout
	.market-container
		.btn-box
			i-button.mr10(type="primary", @click="check", :disabled="!selectOne") 审核
		i-table(
			:columns="columns",
			:data="list",
			v-if="total > 0",
			@on-selection-change="selectHandle")
			template(#status="{ row }")
				span {{ status[row.status] }}
			template(#createTime="{ row }")
				span {{ $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') }}
		e-page(@init="init", :total="total", ref="page", :loaded="loaded")
		dialogCheck(
			v-model="dialogCheckShow",
			:detail="currentRow",
			@reload="reload")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button } from 'view-design'
import dialogCheck from './dialogCheckComponent.vue'
import { Editor } from '@eslinkv/core'
import common from '../../store/common.store.js'
import { list } from '@/api/marketComponent.api.js'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
		dialogCheck,
	},
})
export default class Market extends Vue {
	editor = Editor.Instance()
	list = []
	columns = [
		{
			type: 'selection',
			width: 60,
			align: 'center',
		},
		{
			title: '组件名',
			key: 'componentTitle',
		},
		{
			title: '组件英文名',
			key: 'componentEnTitle',
		},
		{
			title: '组件版本号',
			key: 'componentVersion',
		},
		{
			title: '审核状态',
			slot: 'status',
		},
		{
			title: '创建时间',
			slot: 'createTime',
		},
	]
	loaded = false
	total = 0
	dialogCheckShow = false
	currentRow: any = null
	selectMore: any = false
	selectOne: any = false
	status: any = {
		ERROR: '审核失败',
		PENDING: '待审核',
		SUCCESS: '审核通过',
	}

	async init({ pageNum, pageSize }) {
		const res = await list({
			pageNum,
			pageSize,
			status: 'PENDING',
		})
		this.list = res.list
		this.total = res.count
		this.loaded = true
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

	check(): void {
		this.currentRow = this.selectOne
		this.dialogCheckShow = true
		const data = {
			config: this.selectOne.componentConfig,
			market: true,
			type: this.selectOne.componentEnTitle,
			componentVersion: this.selectOne.componentVersion,
			startX: 0,
			startY: 0,
		}
		this.editor.createWidget(0, 0, data)
	}

	reload(): void {
		;(this.$refs.page as any).reload()
	}

	mounted(): void {
		common.actions.setNavIndex('/market/componentList')
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
