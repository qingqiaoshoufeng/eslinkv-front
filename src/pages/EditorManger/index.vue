<template lang="pug">
e-layout
	.list-container
		.search.fn-flex.flex-row
			i-input(
				v-model="query.screenName",
				placeholder="大屏标题",
				style="width: 200px",
				clearable)
			i-date-picker(
				type="daterange",
				placeholder="创建日期",
				placement="bottom-end",
				v-model="date",
				style="margin-left: 10px")
			i-button(
				icon="ios-search",
				type="primary",
				style="margin-left: 15px",
				@click="search")
			i-button(type="primary", @click="handleNew", style="margin-left: auto") 新建
		e-page(@init="init", :total="total", ref="page", :loaded="loaded")
			ul.list-item-card-box
				item-card(
					v-for="item in list",
					v-bind="item",
					:key="item.screenId",
					@reload="reload")
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import itemCard from './item-card.vue'
import format from 'date-fns/format'
import { Page, Button, Input, DatePicker, Select, Option } from 'view-design'

@Component({
	components: {
		itemCard,
		'i-page': Page,
		'i-button': Button,
		'i-input': Input,
		'i-date-picker': DatePicker,
		'i-select': Select,
		'i-option': Option,
	},
})
export default class EditManger extends Vue {
	list: any[] = []
	total = 0
	loaded = false
	date: any = []
	query: any = {
		screenName: '',
		beginTime: '',
		endTime: '',
	}

	@Watch('date')
	dateChange(val) {
		if (!val[0] || !val[1]) return
		this.query.beginTime = format(val[0], 'yyyy-MM-dd')
		this.query.endTime = format(val[1], 'yyyy-MM-dd')
	}

	handleNew() {
		this.$router.push('/editor/new')
	}

	reload() {
		;(this.$refs.page as any).reload()
	}

	search() {
		this.init({
			pageSize: 10,
			pageNum: 1,
		})
	}

	async init({ pageSize, pageNum }) {
		const data = {
			pageSize,
			pageNum,
			screenType: 'CUSTOM',
			...this.query,
		}
		const result = {}
		for (const key in data) {
			if (data[key]) {
				result[key] = data[key]
			}
		}
		const res = await this.$api.screen.list(result)
		this.loaded = true
		this.list = res.list
		this.total = res.count
	}
}
</script>
<style lang="scss" scoped>
.list-container {
	padding: 15px 0 15px 15px;
	min-height: calc(100vh - 50px);
	.search {
		margin-right: 15px;
	}
}
</style>
