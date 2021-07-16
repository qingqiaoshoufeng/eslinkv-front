<template lang="pug">
e-layout.list-container
	e-page(@init="init", :total="total", ref="page", :loaded="loaded")
		ul.list-item-card-box
			item-card(
				v-for="item in list",
				v-bind="item",
				:key="item.screenId",
				@init="init")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import itemCard from './item-card.vue'
import { list } from '@/api/screen.api.js'

@Component({
	components: { itemCard },
})
export default class Template extends Vue {
	list: any[] = []
	total = 0
	loaded = false
	async init({ pageNum, pageSize }) {
		const res = await list({
			pageSize,
			screenType: 'TEMPLATE',
			pageNum,
		})
		this.list = res.list
		this.total = res.count
		this.loaded = true
	}

	reload() {
		;(this.$refs.page as any).reload()
	}
}
</script>
<style lang="scss" scoped>
.list-container {
	.ml20 {
		margin-left: 20px;
	}

	.search {
		margin-top: 10px;
	}
}
</style>
