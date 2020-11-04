<template>
	<div v-if="!!source" class="h-list">
		<div
			class="h-location-list-search"
			v-if="source.listName === 'HLocationListItem'">
			<Input
				class="h-location-list-search__input"
				@blur="locationInputBlur"
				:value="source.searchValue"
				:placeholder="source.placeholder" />
			<span class="h-location-list-search__icon"></span>
		</div>


		<component
			:is="source.listName"
			v-for="(data, index) in (source.list || [])"
			:key="index"
			:data="data"
			:actived="source.actived === index"
			@click.native="() => clickItemEvt(index, source)" />
	</div>
</template>
<script>
	import HWarnListItem from './HWarnListItem';
	import HLocationListItem from './HLocationListItem';
	export default {
		components: {
			HWarnListItem,
			HLocationListItem
		},
		data(){
			return {
				inputCacheValue: ''
			}
		},
		props: {
			source: {
				type: Object,
				default: () => ({
					list: [],
					// 当前选中index
					actived: 1,
					// 展示的列表名称 可选： HLocationListItem HWarnListItem
					listName: 'HLocationListItem',
					// listName 为 HLocationListItem 默认搜索值
					searchValue: 'sssss',
					// listName 为 HLocationListItem 默认placeholder值
					placeholder: '输入关键词搜索地图点位'
				})
			}
		},
		methods: {
			clickItemEvt(index, data = {}){
				this.$emit('listItemActivedUpdate', index);
			},
			locationInputBlur(e){
				const value = e?.target?.value ?? '';
				if(value === this.inputCacheValue){
					return;
				}
				this.inputCacheValue = value;
				this.$emit('update:searchValueUpdate', value);
			}
		}
	}
</script>
<style lang="scss">
.h-location-list-search{
		&__input{
			width: 440px;
			height: 40px;
			background: #001F6D;
			border: 1px solid #0057A9;
			box-sizing: border-box;
			color: #FEFFFF;
			border-radius: 4px 0 0 4px;
			font-size: 20px;
			text-indent: 1.25em;
			&::-webkit-input-placeholder{
				font-size: 20px;
				color: #FEFFFF;
				text-indent: 1.25em
			}
			&:-moz-placeholder {
				font-size: 20px;
				color: #FEFFFF;
				text-indent: 1.25em
			}
			&:-ms-input-placeholder {
				font-size: 20px;
				color: #FEFFFF;
				text-indent: 1.25em
			}
		}

		&__icon {
			width: 40px;
			height: 40px;
			background: #0057A9;
			float: right;
			border-radius: 0 4px 4px 0;
		}
	}
</style>

