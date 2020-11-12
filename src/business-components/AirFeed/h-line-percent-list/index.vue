<template>
	<div class="h-line-percent-list widget-part" :style="styles">
		<h-line-percent-item
			class="h-line-percent-list__item"
			v-for="(item, index) in list"
			:maxAmout="maxAmout"
			:item="item"
			:key="index"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import HLinePercentItem from './HLinePercentItem';
	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				list: [
					{
						value: {
							name: '开户',
							amount: 4500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
					{
						value: {
							name: '开户',
							amount: 4500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
					{
						value: {
							name: '开户',
							amount: 14500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
					{
						value: {
							name: '开户',
							amount: 4500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
					{
						value: {
							name: '开户',
							amount: 4500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
					{
						value: {
							name: '开户',
							amount: 4500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
					{
						value: {
							name: '开户',
							amount: 4500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
					{
						value: {
							name: '开户',
							amount: 4500,
						},
						styles: {
							NOBg: '#FF7217',
							startColor: '#FF7217',
							endColor: 'rgba(255, 114, 23, 0)'
						}
					},
				],

			})
		}
	}
	export default {
		mixins: [mixins],
		components: {
			HLinePercentItem
		},
		data(){
			return {
				list: [],
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
		computed: {
			maxAmout() {
				const list = this.list || [];
				const amoutList =  list.reduce((initVal, val ) => {
					initVal.push(val?.value?.amount || 0);
					return initVal;
				}, []);
				console.log(Math.max(...amoutList));
				return  Math.max(...amoutList);
			}
		},
		methods: {
			initList(_list = []){
				return _list.map((item, index) => {
					item.value.NO = `0${index + 1}`;
					return item;
				})
			}
		},
		watch: {
			data: {
				handler(val){
					if(val?.list){
						this.list = this.initList(val?.list);
					}
				}
			},
			immediate: true,
			deep: true

		},
	}
</script>
<style lang="scss">
.h-line-percent-list {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin-top: -16px;
	margin-left: -32px;
	overflow: hidden;
	&__item {
		margin-top: 16px;
		margin-left: 32px;
	}
}
</style>

