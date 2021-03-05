<template lang="pug">
	e-layout
		.list-container
			div
				i-button(type="warning" @click="handleNew") 新建看板
			.search
				i-input(v-model="query.name" placeholder="看板标题" style="width: 200px;" clearable)
				i-date-picker(type="daterange" placeholder="创建日期" placement="bottom-end" v-model="date" style="margin-left: 10px;")
				i-select(v-model="query.status" placeholder="状态" style="width: 100px;margin-left: 10px;" clearable)
					i-option(:value="0") 未发布
					i-option(:value="1") 已发布
				i-button.ml20(type="primary" @click="handleChange(1)") 查询
			e-page(@init="init" :total="total" ref="page")
				ul.fn-flex.flex-row.list-item-card-box
					item-card(v-for="item in list" v-bind="item" :key="item.id" @reload="reload")
</template>
<script lang="ts">
	import {Vue, Component, Watch} from 'vue-property-decorator'
	import itemCard from './item-card.vue'
	import format from 'date-fns/format'
	import {Page, Button, Input, DatePicker, Select, Option} from 'view-design'

	@Component({
		components: {
			itemCard,
			'i-page': Page,
			'i-button': Button,
			'i-input': Input,
			'i-date-picker': DatePicker,
			'i-select': Select,
			'i-option': Option
		}
	})
	export default class EditManger extends Vue {
		list: any[] = []
		total: number = 0
		date: any = []
		query: any = {
			name: '',
			startDate: '',
			status: '',
			endtartDate: ''
		}

		@Watch('date')
		dateChange(val) {
			if (!val[0] || !val[1]) return
			this.query.startDate = format(val[0], 'yyyy-MM-dd')
			this.query.endDate = format(val[1], 'yyyy-MM-dd')
		}

		handleNew() {
			this.$router.push('/editor/new')
		}

		reload() {
			this.$refs.page.reload()
		}

		init({pageSize, pageNum}) {
			this.$api.panel.list({
				pageSize, pageNum,
				type: 0,
				...this.query
			}).then(res => {
				this.list = res.list
				this.total = res.total
			})
		}
	}
</script>
<style lang="scss" scoped>
	.list-container {
		padding: 15px 0 15px 15px;

		.ml20 {
			margin-left: 20px;
		}

		.search {
			margin-top: 10px;
		}
	}

	.list-item-card-box {
		flex-wrap: wrap;
		margin-top: 15px;
		min-width: 1135px;
		padding-right: 15px;
	}
</style>
