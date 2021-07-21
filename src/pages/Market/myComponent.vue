<template lang="pug">
div
	.search.fn-flex.flex-row
		i-input(
			v-model="query.componentTitle",
			placeholder="组件标题",
			style="width: 200px",
			size="small",
			clearable)
		i-select(
			:style="{ width: '100px', marginLeft: '10px' }",
			v-model="query.componentTypeId",
			placeholder="组件分类",
			size="small",
			clearable)
			i-option(
				v-for="item in typeList",
				:value="item.componentTypeId",
				:key="item.componentTypeId") {{ item.componentTypeName }}
		i-button(
			icon="ios-search",
			size="small",
			style="margin-left: 15px",
			@click="search")
	i-table(
		:border="true",
		size="small",
		row-key="componentId",
		:columns="columns",
		@on-sort-change="sortChange",
		:data="list",
		v-if="total > 0")
		template(#componentAvatar="{ row }")
			.component-avatar(
				:style="{ backgroundImage: `url(${row.componentAvatar})` }")
		template(#createTime="{ row }")
			span {{ row.createTime ? $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') : '' }}
		template(#action="{ row }")
			a.mr10 编辑
			a.mr10 切换版本
			a 删除
	e-page(@init="init", :total="total", ref="page", :loaded="loaded")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Input, Option, Select } from 'view-design'
import { list } from '@/api/marketComponent.api.js'
import { levelList } from '@/api/marketComponentType.api'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
	},
})
export default class MarketComponentList extends Vue {
	list = []
	typeList = []
	total = 0
	orderKey = ''
	orderType = ''
	loaded = false
	query: any = {
		componentTitle: '',
		componentTypeId: '',
	}
	columns = [
		{
			title: '组件名称',
			key: 'componentTitle',
			sortable: 'custom',
		},
		{
			title: '缩略图',
			slot: 'componentAvatar',
		},
		{
			title: '组件版本号',
			key: 'componentVersion',
		},
		{
			title: '分类名称',
			key: 'componentTypeName',
		},
		{
			title: '创建时间',
			key: 'createTime',
			slot: 'createTime',
			sortable: 'custom',
		},
		{
			title: '操作',
			slot: 'action',
		},
	]
	sortChange(obj): void {
		this.orderKey = obj.key
		this.orderType = obj.order
		this.search()
	}
	search(): void {
		this.init({
			pageSize: 10,
			pageNum: 1,
		})
	}

	async init({ pageNum, pageSize }) {
		const data = {
			pageNum,
			pageSize,
			status: 'SUCCESS',
			isCurrentVersion: true,
			...this.query,
			orderKey: this.orderKey,
			orderType: this.orderType,
		}
		const result = {}
		for (const key in data) {
			if (data[key]) {
				result[key] = data[key]
			}
		}
		const res = await list(result)
		this.loaded = true
		this.list = res.list
		this.total = res.count
	}

	reload(): void {
		;(this.$refs.page as any).reload()
	}

	mounted(): void {
		levelList().then(res => {
			this.typeList = res
		})
	}
}
</script>
<style lang="scss" scoped>
.component-avatar {
	width: 64px;
	height: 64px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
}
.list-item-card-box {
	padding-right: 0;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
/deep/ {
	.viewer-canvas {
		background-color: rgba(0, 0, 0, 0.5);
	}
}

.avatar {
	width: 100px;
	height: 60px;
	vertical-align: middle;
}

.mr10 {
	margin-right: 10px;
}

.btn-box {
	margin-bottom: 10px;
}

.search {
	align-items: center;
	margin-bottom: 10px;
	&::v-deep {
		.ivu-input,
		.ivu-select-selected-value,
		.ivu-select-placeholder {
			font-size: 12px;
		}
	}
}
</style>
