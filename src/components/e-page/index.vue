<template lang="pug">
div
	slot
	i-page.e-page(
		:current.sync="pageNum",
		:total="total",
		:show-sizer="show",
		:show-elevator="show",
		:show-total="show",
		@on-change="handleChange",
		@on-page-size-change="handlePageSize")
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Page } from 'view-design'

@Component({
	components: {
		'i-page': Page,
	},
})
export default class EPage extends Vue {
	@Prop({ default: 0 }) total: number
	@Prop({ default: true }) show: boolean
	pageNum = 1
	pageSize = 10

	handlePageSize(pageSize) {
		this.pageSize = pageSize
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}

	handleChange(pageNum) {
		this.pageNum = pageNum
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}

	reload() {
		this.pageNum = 1
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}

	mounted() {
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}
}
</script>
<style lang="scss" scoped>
.e-page {
	margin-top: 15px;
}
</style>
