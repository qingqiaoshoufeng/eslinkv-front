<template lang="pug">
div
	slot(v-show="total > 0")
	i-page.e-page(
		:current.sync="pageNum",
		:total="total",
		:show-sizer="show",
		v-show="total > 0",
		:show-elevator="show",
		:show-total="show",
		@on-change="handleChange",
		@on-page-size-change="handlePageSize")
	.e-page-list-empty.fn-flex.flex-column(v-show="total <= 0 && loaded")
		i
		span 暂无数据
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
	@Prop({ default: false }) loaded: boolean
	@Prop({ default: true }) show: boolean
	@Prop({ default: 10 }) pageSize: number
	pageNum = 1

	handlePageSize(pageSize) {
		this.pageSize = pageSize
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}

	handleChange(pageNum) {
		this.pageNum = pageNum
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}

	reload() {
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}

	mounted() {
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	}
}
</script>
<style lang="scss" scoped>
.e-page-list-empty {
	align-items: center;
	justify-content: center;
	i {
		background-image: url('../../assets/e-page/empty.png');
		background-size: 420px 233px;
		width: 420px;
		height: 233px;
		margin: 20px 0;
	}
	span {
		color: rgba(51, 51, 51, 0.85);
		font-size: 16px;
	}
}
.e-page {
	margin-top: 15px;
}
</style>
