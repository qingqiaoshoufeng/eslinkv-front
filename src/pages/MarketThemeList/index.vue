<template lang="pug">
e-layout
	.market-container
		.btn-box
			i-button.mr10(type="primary", @click="edit", :disabled="!selectOne") 编辑
			i-button.mr10(type="primary", @click="create", style="margin-left: auto") 创建
		i-table(
			:columns="columns",
			:data="list",
			v-if="total > 0",
			@on-selection-change="selectHandle")
			template(#createTime="{ row }")
				span {{ $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') }}
		e-page(
			@init="init",
			:total="total",
			ref="page",
			:show="false",
			:loaded="loaded")
		dialogTheme(v-model="dialogEditShow", :detail="currentRow", @reload="init")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button } from 'view-design'
import common from '../../store/common.store.js'
import dialogTheme from './dialogTheme.vue'
import { allList } from '@/api/marketTheme.api.js'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
		dialogTheme,
	},
})
export default class Market extends Vue {
	list = []
	columns = [
		{
			type: 'selection',
			width: 60,
			align: 'center',
		},
		{
			title: '主题名',
			key: 'themeName',
		},
		{
			title: '创建时间',
			slot: 'createTime',
		},
	]
	loaded = false
	total = 0
	dialogEditShow = false
	currentRow: any = {
		themeName: '',
		themeId: null,
	}
	selectMore: any = false
	selectOne: any = false

	async init() {
		const res = await allList()
		this.list = res.list
		this.total = res.count
		this.loaded = true
	}

	selectHandle(selection): void {
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

	async create() {
		this.dialogEditShow = true
		this.currentRow.themeId = null
	}

	edit(): void {
		this.currentRow = this.selectOne
		this.dialogEditShow = true
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
