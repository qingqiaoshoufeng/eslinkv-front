<template>
	<ul
		class="h-landmark-list"
		v-if="!!data"
		:style="styles">
		<li
			class="h-landmark-list__item"
			v-for="(item) in data"
			:key="item.name">
			<span :class="item && item.iconClass" :style="item && item.iconStyles"></span>
			<span :class="item && item.fontClass" :style="item && item.fontStyles">{{item.name}}</span>
		</li>
	</ul>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';

	const config = {};
	const value = {
		api: {
			data: JSONStringify([
				{
					name: '高压管网(已建成)',
					iconStyles: {
						background: '#04F499',
						marginRight: '8px',
					},
					iconClass: 'lm-commom-line'
				},
				{
					name: '高压管网(建设中)',
					iconStyles: {
						backgroundImage: 'url(/static/icons/landmark-dashed.svg)',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						width: '24px',
						height: '4px',
						marginRight: '8px',
					},
				},
				{
					name: '中压管网',
					iconStyles: {
						background: '#0070FF',
						marginRight: '8px',
					},
					iconClass: 'lm-commom-line'

				},
				{
					name: '低压管网',
					iconStyles: {
						background: '#FF00C5',
						marginRight: '8px',
					},
					iconClass: 'lm-commom-line'
				},
				{
					name: '巡检人员',
					iconStyles: {
						backgroundImage: 'url(/static/icons/landmark-person.svg)',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						width: '24px',
						height: '24px',
						marginRight: '8px',
					},
				},
				{
					name: '巡检车辆',
					iconStyles: {
						backgroundImage: 'url(/static/icons/landmark-bus.svg)',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						width: '24px',
						height: '24px',
						marginRight: '8px',
					},
					fontStyles: {}
				},
				{
					name: '管网特勤大队',
					iconStyles: {
						backgroundImage: 'url(/static/icons/landmark-Secret-Service.svg)',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						width: '24px',
						height: '24px',
						marginRight: '8px',
					},
					fontStyles: {

					}
				},
				{
					name: '门站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '调压站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '应急气源站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '综合服务站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '管网运行管理站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '地下抢修点',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: 'LNG站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '液化气站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '加气站',
					iconStyles: {},
					fontStyles: {}
				},
				{
					name: '分布式能源',
					iconStyles: {},
					fontStyles: {}
				},
			])
		}
	}
	const ICON_MAP = {
		'高压管网(已建成)': {
			actived: 'lm-high-pressure-pipe-network--finished--actived',
			common: 'lm-high-pressure-pipe-network--finished--common'
		},
		'高压管网(建设中)': {
			actived: 'lm-high-pressure-pipe-network--inprocess--actived',
			common: 'lm-high-pressure-pipe-network--inprocess--common'
		},
		'中压管网': {
			actived: 'lm-middle-pressure-pipe-network--actived',
			common: 'lm-middle-pressure-pipe-network--common'
		},
		'低压管网': {
			actived: 'lm-low-pressure-pipe-network--actived',
			common: 'lm-low-pressure-pipe-network--common'
		},
		'巡检人员': {
			actived: 'lm-IPQC--actived',
			common: 'lm-IPQC--common'
		},
		'巡检车辆': {
			actived: 'lm-inspection-vehicle--actived',
			common: 'lm-inspection-vehicle--common'
		},
		'管网特勤大队': {
			actived: 'lm-Battalion--actived',
			common: 'lm-Battalion--common'
		},
		'门站': {
			actived: 'lm-door-center--actived',
			common: 'lm-door-center--common'
		},
		'调压站': {
			actived: 'lm-regulator-station--actived',
			common: 'lm-regulator-station--common'
		},
		'应急气源站': {
			actived: 'lm-landmark-emergency-LNG--actived',
			common: 'lm-landmark-emergency-LNG--common'
		},
		'综合服务站': {
			actived: 'lm-Posyandu--actived',
			common: 'lm-Posyandu--common'
		},
		'管网运行管理站': {
			actived: 'lm-landmark-operation-management-center--actived',
			common: 'lm-landmark-operation-management-center--common'
		},
		'地下抢修点': {
			actived: 'lm-landmark-underground-repair--actived',
			common: 'lm-landmark-underground-repair--common'
		},
		'LNG站': {
			actived: 'lm-LNG--actived',
			common: 'lm-LNG--common'
		},
		'液化气站': {
			actived: 'lm-LGP--actived',
			common: 'lm-LGP--common'
		},
		'加气站': {
			actived: 'lm-LNG-filling-station--actived',
			common: 'lm-LNG-filling-station--common'
		},
		'分布式能源': {
			actived: 'lm-high-pressure-pipe-network--finished--actived',
			common: 'lm-high-pressure-pipe-network--finished--common'
		}
	}
	export default {
		mixins: [mixins],

		methods: {

		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		}
	}
</script>
<style lang="scss">
	.h-landmark-list{
		display: flex;
		flex-wrap: wrap;
		background: rgba(0, 0, 0, 0.8);
		border: 1px solid #0065DF;
		box-sizing: border-box;
		border-radius: 66.5px;
		padding: 0 40px;
		overflow: hidden;
		&__item {
			display: flex;
			align-items: center;
			font-size: 18px;
			color: #ffffff;
			margin-left: 16px;
			margin-top: 16px;
			&:nth-child(1){
				margin-left: 0;
			}
		}
	}
	.lm-commom-line {
		width: 24px;
		height: 4px;
	}
</style>

