<template>
	<div class="h-list">
		<h-list-item
			v-for="(item, index) in (source && source.list || [])"
			:key="index"
			:item="item"
			:selected="source && source.selected === index"
			@click.native="() => clickItemEvt(index, item)"></h-list-item>
	</div>
</template>
<script>
	import HListItem from './HListItem';
	export default {
		components: {
			HListItem
		},
		props: {
			source: {
				type: Object,
				default: () => ({
					list: [],
					selected: 0
				})
			}
		},
		methods: {
			clickItemEvt(index, data = {}){
				this.$emit('itemSelectedEvt', { index, data });
			}
		}
	}
</script>
<style lang="scss">

</style>

