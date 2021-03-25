<template lang="pug">
  e-layout
    .list-container
      e-page(@init="init" :total="total" ref="page")
        ul.list-item-card-box
          item-card(v-for="item in list" v-bind="item" :key="item.screenId" @init="init")
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import itemCard from './item-card.vue'

	@Component({
		components: { itemCard }
	})
	export default class Template extends Vue {
		list: any[] = []
		total: number = 0

    async init ({ pageNum, pageSize }) {
      const res = await this.$api.screen.list({
				pageSize,
        screenType: 'TEMPLATE',
        pageNum
			})
      this.list = res.list
      this.total = res.count
		}

    reload () {
      this.$refs.page.reload()
    }
	}
</script>
<style lang="scss" scoped>
	.list-container {
		min-width: 930px;
		height: 100%;
		padding: 15px;

		.ml20 {
			margin-left: 20px;
		}

		.search {
			margin-top: 10px;
		}
	}
</style>
