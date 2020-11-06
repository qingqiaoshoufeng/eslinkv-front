<template>
	<div class="widget-part h-tabs-circle" :style="styles">
		<h-vertical-tabs class="h-tabs-circle__tabs" />
		<h-cvs class="h-tabs-circle__cvs" :source="data" />
	</div>

</template>

<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	import HCvs from './HCvs';
	import HVerticalTabs from './HVerticalTabs';
	const config = {animation: true}
	const value = {
		api: {
			data: JSONStringify([
				{
				name: '高压管道',
				percent: 20,
				count: '1,233,234',
				circleStyle: '#FB592C',
				markStyle: '',
				countStyle: '',
				unitStyle: '',
				percentStyle: ''
			},
			{
				name: '中压管道',
				percent: 30,
				count: '1,233,234',
				circleStyle: '#18CEB9',
				markStyle: '',
				countStyle: '',
				unitStyle: '',
				percentStyle: ''
			},
			{
				name: '低压管道',
				percent: 50,
				count: '1,233,234',
				circleStyle: '#2C99FF',
				markStyle: '',
				countStyle: '',
				unitStyle: '',
				percentStyle: ''
			},

			])
		}
	}
export default {
	name: 'h-tabs-circle',
	components: {
		HCvs,
		HVerticalTabs
	},
	data() {
		return {

		};
	},
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted(){
	},
	methods: {
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.h-tabs-circle{
	&__cvs {
		position: absolute;
		top: 31px;
		left: 246px;
	}
	&__tabs {
		position: absolute;
		top: 48px;
		left: 16px;
	}
}
</style>
