<template lang="pug">
	div
		slot
		i-page(:total="total" :show-sizer="true" :show-elevator="true" :show-total="true" @on-change="handleChange" @on-page-size-change="handlePageSize")
</template>
<script lang="ts">
	import {Vue, Component, Prop} from 'vue-property-decorator'
	import {Page} from 'view-design'

	@Component({
		components: {
			'i-page': Page,
		}
	})
	export default class EPage extends Vue {
		@Prop({default: 0}) total: number
		@Prop({default: 1}) pageNum: number
		@Prop({default: 10}) pageSize: number

		handlePageSize(pageSize) {
			this.pageSize = pageSize
			this.$emit('init', {pageSize: this.pageSize, pageNum: this.pageNum})
		}

		handleChange(pageNum) {
			this.pageNum = pageNum
			this.$emit('init', {pageSize: this.pageSize, pageNum: this.pageNum})
		}

		reload() {
			this.pageNum = 1
			this.$emit('init', {pageSize: this.pageSize, pageNum: this.pageNum})
		}

		mounted() {
			this.$emit('init', {pageSize: this.pageSize, pageNum: this.pageNum})
		}
	}
</script>
