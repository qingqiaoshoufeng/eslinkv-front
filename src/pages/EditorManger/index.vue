<template lang="pug">
  e-layout
    .list-container
      .search.fn-flex.flex-row
        i-input(v-model="query.screenName" placeholder="看板标题" style="width: 200px;" clearable)
        i-date-picker(type="daterange" placeholder="创建日期" placement="bottom-end" v-model="date" style="margin-left: 10px;")
        i-select(v-model="query.screenPublish" placeholder="状态" style="width: 100px;margin-left: 10px;" clearable)
          i-option(value="EDIT") 未发布
          i-option(value="COMPLETE") 已发布
        i-button(icon="ios-search" type="primary" style="margin-left: 15px;" @click="search")
        i-button(type="warning" @click="handleNew" style="margin-left: auto;") 新建
      e-page(@init="init" :total="total" ref="page")
        ul.list-item-card-box
          item-card(v-for="item in list" v-bind="item" :key="item.screenId" @reload="reload")
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
			'i-option': Option
		}
	})
	export default class EditManger extends Vue {
		list: any[] = []
		total: number = 0
		date: any = []
		query: any = {
      screenName: '',
      beginTime: '',
      screenPublish: '',
			endTime: ''
		}

		@Watch('date')
		dateChange (val) {
			if (!val[0] || !val[1]) return
			this.query.beginTime = format(val[0], 'yyyy-MM-dd')
			this.query.endTime = format(val[1], 'yyyy-MM-dd')
		}

		handleNew () {
			this.$router.push('/editor/new')
		}

		reload () {
			this.$refs.page.reload()
		}

    search () {
		  this.init({
        pageSize: 10,
        pageNum: 1
      })
    }

		async init ({ pageSize, pageNum }) {
			const res = await this.$api.screen.list({
				pageSize,
        pageNum,
        screenType: 'CUSTOM',
				...this.query
			})
      this.list = res.list
      this.total = res.total
		}
	}
</script>
<style lang="scss" scoped>
	.list-container {
		padding: 15px 0 15px 15px;

		.search {
			margin-right: 15px;
		}
	}
</style>
