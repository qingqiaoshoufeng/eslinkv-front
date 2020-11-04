<template>
	<div v-if="!!data" class="h-list" :style="styles">
		<div
			class="h-location-list-search"
			v-if="data.listName === 'HLocationListItem'">
			<Input
				class="h-location-list-search__input"
				@blur="locationInputBlur"
				:value="data.searchValue"
				:placeholder="data.placeholder" />
			<span class="h-location-list-search__icon"></span>
		</div>


		<component
			:is="data.listName"
			v-for="(source, index) in (data && data.list || [])"
				:key="index"
				:data="source"
				:actived="data.actived === index"
				@click.native="() => clickItemEvt(index, source)" />
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	import HWarnListItem from './HWarnListItem';
	import HLocationListItem from './HLocationListItem';
	const config = {}
	const value = {
		api: {
			data: JSONStringify({
				// 列表数据
				list: [
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 2,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				},
				{
					status: 1,
					alarmName: '新星小区燃气泄漏',
					alarmNameType: '事件',
					alarmLocation: '三墩镇三墩街100号',
					time: '11-03  08:32:15',
					statusDesc: '已处理',
				}
			],
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
	}
	export default {
		components: {
			HWarnListItem,
			HLocationListItem
		},
		mixins: [mixins],
		data(){
			return {
				inputCacheValue: ''
			}
		},
		methods: {
			clickItemEvt(index, data = {}){
				this.data.actived = index;
				this.$emit('itemActivedEvt', { index, data })
			},
			locationInputBlur(e){
				const value = e?.target?.value ?? '';
				if(value === this.inputCacheValue){
					return;
				}
				this.inputCacheValue = value;
				this.data.searchValue = value;
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);

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

