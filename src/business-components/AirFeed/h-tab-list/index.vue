<template>
	<div v-if="!!data" class="h-tab-list" :style="styles">
		<h-tabs-base
			:source="data.tabSource"
			@tabIndexUpdate="tabIndexUpdate" />
		<h-list-base
			:source="listSource"
			@listItemActivedUpdate="listItemActivedUpdate"
			@searchValueUpdate="searchValueUpdate" />
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import HTabsBase from './h-tabs-base';
	import HListBase from './h-list-base';
	import mixins from '../../mixins';
	const config = {};
	const value = {
		api: {
			data: JSONStringify({
				tabSource:{
					list: [
						{ name: '告警信息' },
						{ name: '点位列表' },
					],
					actived: 0
				},
				listSource: [
					{
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
							}
						],
						actived: 1,
						listName: 'HWarnListItem',
					},
					{
						list: [
							{
								status: 1,
								alarmName: '撒打算撒啊色情饿请问请问',
								alarmNameType: '事件',
								alarmLocation: '三墩镇三墩街100号',
								time: '11-03  08:32:15',
								statusDesc: '已处理',
							},
							{
								status: 2,
								alarmName: '请问请问请问请问请问请问去',
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
						listName: 'HLocationListItem',
						actived: 0,
						placeholder: 'hahahah',
						searchValue: '1111'
					}
				],
			})
		}
	};
	export default {
		components: {
			HTabsBase,
			HListBase
		},
		mixins: [mixins],
		computed: {
			tabActivedIndex(){
				return this?.data?.tabSource?.actived ?? 0;
			},
			listSource(){
				return this?.data?.listSource[this.tabActivedIndex] ?? {}
			},

		},
		methods: {
			tabIndexUpdate(index = 0){
				this.data.tabSource.actived = index;
			},
			searchValueUpdate(searchValue){
				this.data.listSource[this.tabActivedIndex].searchValue = searchValue;
			},
			listItemActivedUpdate(index = 0){
				this.data.listSource[this.tabActivedIndex].actived = index;
			},
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);

		},

	}
</script>
<style lang="scss">
	.h-tab-list{

	}
</style>

