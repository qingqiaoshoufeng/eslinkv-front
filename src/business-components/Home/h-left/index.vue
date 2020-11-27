<template>
	<div class="widget-part" :style="styles" v-if="data" ref="img">
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">年度LNG气量</div>
			<img src="/static/icons/right-icon.svg">
		</section>
		<section class="lng">
			<div class="lng-top">
				<div>
					<div class="lng-num font-num">{{data.ling.toDayLING/10000}}</div>
					<div class="lng-desc">今日LNG气化量(万m³)</div>
				</div>
				<div>
					<div class="lng-num font-num">{{data.ling.yearLING/10000}}</div>
					<div class="lng-desc">年度LNG气化量(万m³)</div>
				</div>
			</div>
			<div class="lng-chart">
				<lngline :data="data.ling.linCharts"></lngline>
			</div>
		</section>
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">年度区域销售气量</div>
			<img src="/static/icons/right-icon.svg">
		</section>

		<div class="pie">
			<pie :data="data.sale.fanCharts" text="区域" subtext="销售气量"></pie>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getInput} from "../../../../lib";
	import pie from './pie'
	import lngline from './line'

	const configSource = {
		config: {
			fields: {
				transform: getInput('transform', '旋转角度'),
				left: getInput('left', '位移'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			transform: true,
			left: true,
		}
	}
	const value = {
		api: {
			data: {
				ling: {
					toDayLING: 100,
					yearLING: 999999999,
					linCharts: [
						{
							x: '1月',
							y: 100
						},
						{
							x: '2月',
							y: 200
						},
						{
							x: '3月',
							y: 300
						},
						{
							x: '4月',
							y: 240
						},
						{
							x: '5月',
							y: 366
						},
						{
							x: '6月',
							y: 400
						},
						{
							x: '7月',
							y: 321
						},
						{
							x: '8月',
							y: 374
						},
						{
							x: '9月',
							y: 222
						},
						{
							x: '10月',
							y: 216
						},
						{
							x: '11月',
							y: 300
						},
						{
							x: '12月',
							y: 111
						}
					]
				},
				sale: {
					fanCharts: [
						{
							name: '城区1',
							value: 72
						},
						{
							name: '城区2',
							value: 32
						},
						{
							name: '城区3',
							value: 12
						},
					]
				}
			}
		},
		config: {
			transform: 15,
			left: 100,
		}
	}
	export default {
		mixins: [mixins],
		components: {pie, lngline},
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		},
		mounted() {
			setTimeout(() => {
				this.$refs.img.style.transform = `perspective(763px) rotateY(${this.config.config.transform}deg) translateZ(-120px)`
				this.$refs.img.style.left = `${this.config.config.left}px`
			}, 1500)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		transition: all .5s;
		padding-top: 40px;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		background: rgba(0, 87, 169, 0.5);
		border: 1px solid #00DDFF;

		.title-txt {
			font-weight: 600;
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
			margin: 0 8px;
		}
	}

	.lng {
		text-align: left;
		border: 1px solid #00DDFF;
		border-top-width: 0;
		margin-bottom: 32px;
		padding: 25px 0 0;

		.lng-top {
			display: flex;
			padding: 0 15px;
			justify-content: space-between;
		}

		.lng-num {
			font-weight: bold;
			font-size: 40px;
			line-height: 48px;
			color: #FFFFFF;
			margin-bottom: 8px;
		}

		.lng-desc {
			font-size: 24px;
			line-height: 24px;
			color: #00DDFF;
		}

		.lng-chart {
			width: 100%;
			height: 307px;
		}
	}

	.pie {
		border: 1px solid #00DDFF;
		border-top-width: 0;
		width: 100%;
	}
</style>

