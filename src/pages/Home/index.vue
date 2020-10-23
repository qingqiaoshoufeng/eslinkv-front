<template>
	<div class="list-container">
		<div>
			<Button type="primary" @click="handleNew">新建看板</Button>
			<Button :style="{marginLeft:'10px'}" type="primary">编辑看板</Button>
			<Button :style="{marginLeft:'10px'}" type="primary">删除看板</Button>
		</div>
		<ul class="fn-flex flex-row list-item-card-box">
			<item-card v-for="item in list" v-bind="item" :key="item.id" @init="init"/>
		</ul>
		<Page :total="total"
			  :show-sizer="true"
			  :show-elevator="true"
			  :show-total="true"
			  @on-change="handleChange"
			  @on-page-size-change="handlePageSize"/>
	</div>
</template>
<script>
	import itemCard from './item-card'
	import {Page, Button} from 'view-design'

	export default {
		data() {
			return {
				list: [],
				total: 0,
				pageNum: 1,
				pageSize: 10
			}
		},
		components: {
			itemCard, Page, Button
		},
		methods: {
			handleNew() {
				this.$router.push('/new')
			},
			handleChange(pageNum) {
				this.pageNum = pageNum
				this.init()
			},
			handlePageSize(pageSize) {
				this.pageSize = pageSize
				this.init()
			},
			init() {
				this.$api.panel.list({pageSize: this.pageSize, type: 0, pageNum: this.pageNum}).then(res => {
					this.list = res.list
					this.total = res.total
				})
			}
		},
		mounted() {
			this.init()
		}
	}
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
