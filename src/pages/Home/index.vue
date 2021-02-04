<template lang="pug">
	.list-container
		div
			Button(type="warning" @click="handleNew") 新建看板
			Button.ml20(type="info" @click="handleTemplate") 模版市场
			Button.ml20(type="info" @click="handleMarket") 组件市场
			Button.ml20(type="info" @click="handleHistory") 更新日志
			Button.ml20(type="info" @click="handleHelp") 帮助文档
		.search
			Input(v-model="query.name" placeholder="看板标题" style="width: 200px;" clearable)
			DatePicker(type="daterange" placeholder="创建日期" placement="bottom-end" v-model="date" style="margin-left: 10px;")
			Select(v-model="query.status" placeholder="状态" style="width: 100px;margin-left: 10px;" clearable)
				Option(:value="0") 未发布
				Option(:value="1") 已发布
			Button.ml20(type="primary" @click="handleChange(1)") 查询
		ul.fn-flex.flex-row.list-item-card-box
			item-card(v-for="item in list" v-bind="item" :key="item.id" @init="init")
		Page(:total="total" :show-sizer="true" :show-elevator="true" :show-total="true" @on-change="handleChange" @on-page-size-change="handlePageSize")
</template>
<script lang="ts">
	import {Vue, Component, Watch} from 'vue-property-decorator'
	import itemCard from './item-card.vue'
	import format from 'date-fns/format'
	import {Page, Button, Input, DatePicker, Select, Option} from 'view-design'

	@Component({
		components: {itemCard, Page, Button, Input, DatePicker, Select, Option}
	})
	class Home extends Vue {
		list: any[] = []
		total: number = 0
		pageNum: number = 1
		pageSize: number = 10
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

		handleHistory() {
			this.$router.push('/changeLog')
		}

		handleHelp() {
			this.$router.push('/help/HowToUseMarket')
		}

		handleTemplate() {
			this.$router.push('/template')
		}

		handleNew() {
			this.$router.push('/new')
		}

		handleMarket() {
			this.$router.push('/market/componentList')
		}

		handleChange(pageNum) {
			this.pageNum = pageNum
			this.init()
		}

		handlePageSize(pageSize) {
			this.pageSize = pageSize
			this.init()
		}

		init() {
			this.$api.panel.list({
				pageSize: this.pageSize,
				type: 0, pageNum: this.pageNum,
				...this.query
			}).then(res => {
				this.list = res.list
				this.total = res.total
			})
		}

		mounted() {
			this.init()
		}
	}

	export default Home
</script>
<style lang="scss" scoped>
	.list-container {
		height: 100%;
		padding: 15px;
		min-width: 930px;

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
	}
</style>
