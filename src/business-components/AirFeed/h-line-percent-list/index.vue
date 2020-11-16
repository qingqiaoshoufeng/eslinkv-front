<template>
	<div class="h-line-percent-list widget-part" :style="styles">
		<h-line-percent-item
			class="h-line-percent-list__item"
			v-for="(item, index) in computedList"
			:maxAmout="maxAmout"
			:item="item"
			:key="index"
		/>
	</div>
</template>
<script>
import JSONStringify from '../../../../lib/vendor/JSONStringify';
import mixins from '../../mixins';
import HLinePercentItem from './HLinePercentItem';
const config = { animation: true };
const value = {
	api: {
		data: JSONStringify({
			list: [
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 14500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
			],
		}),
	},
};
export default {
	mixins: [mixins],
	components: {
		HLinePercentItem,
	},
	data() {
		return {
			list: [],
		};
	},
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	computed: {
		maxAmout() {
			const list = this.list || [];
			const amoutList = list.reduce((initVal, val) => {
				initVal.push(val?.amount || 0);
				return initVal;
			}, []);
			// console.log(Math.max(...amoutList));
			return Math.max(...amoutList);
		},
		computedList() {
			return this.list.map((item, index) => {
				let startColor = !index ? '#FF7217' : '#00DDFF';
				let endColor = !index
					? 'rgba(255, 114, 23, 0)'
					: 'rgba(0, 221, 255, 0)';
				let NOBg = !index
					? 'rgba(255, 114, 23, 0)'
					: 'rgba(0, 221, 255, 0)';
				item.styles = { NOBg, startColor, endColor };
				// console.log(item)
				return item;
			});
		},
	},
	methods: {
		initList(_list = []) {
			return _list.map((item, index) => {
				item.NO = `0${index + 1}`;
				return item;
			});
		},
	},
	watch: {
		data: {
			handler(val) {
				if (val?.list) {
					this.list = this.initList(val?.list);
				}
			},
		},
		immediate: true,
		deep: true,
	},
};
</script>
<style lang="scss">
.h-line-percent-list {
	flex-wrap: wrap;
	flex-direction: column;
	margin-top: -16px;
	margin-left: -0px;
	overflow: hidden;
	&__item {
		margin-top: 16px;
		margin-left: 0px;
	}
}
</style>

