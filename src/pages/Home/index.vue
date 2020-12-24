<template lang="pug">
	.list-container
		div
			Button(type="primary" @click="handleNew") 新建看板
		ul.fn-flex.flex-row.list-item-card-box
			item-card(v-for="item in list" v-bind="item" :key="item.id" @init="init")
		Page(:total="total" :show-sizer="true" :show-elevator="true" :show-total="true" @on-change="handleChange" @on-page-size-change="handlePageSize")
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import itemCard from './item-card.vue'
	import {Page, Button} from 'view-design'

	@Component({
		components:{itemCard, Page, Button}
	})
	class Home extends Vue {
		list: Array<any> = []
		total: Number = 0
		pageNum: Number = 1
		pageSize: Number = 10

		handleNew() {
			this.$router.push('/new')
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
			this.$api.panel.list({pageSize: this.pageSize, type: 0, pageNum: this.pageNum}).then(res => {
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
<style lang="scss">
	.list-container {
		height: 100%;
		padding: 15px;
		min-width: 930px;
	}

	.list-item-card-box {
		flex-wrap: wrap;
		margin-top: 15px;
	}
</style>
