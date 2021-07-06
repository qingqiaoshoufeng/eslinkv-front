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
	e-page(
		@init="init",
		:total="total",
		ref="page",
		:loaded="loaded",
		:pageSize="20")
		ul.list-item-card-box
			item-card(
				v-for="(item, i) in list",
				:item="item",
				:key="i",
				@reload="reload")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Input, Option, Select } from 'view-design'
import itemCard from './item-card.vue'
import { list } from '@/api/marketComponent.api.js'
import { levelList } from '@/api/marketComponentType.api'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
		itemCard,
	},
})
export default class MarketComponentList extends Vue {
	list = []
	typeList = []
	total = 0
	loaded = false
	query: any = {
		componentTitle: '',
		componentTypeId: '',
	}

	search(): void {
		this.init({
			pageSize: 20,
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
	&::v-deep {
		.ivu-input,
		.ivu-select-selected-value,
		.ivu-select-placeholder {
			font-size: 12px;
		}
	}
}
</style>
