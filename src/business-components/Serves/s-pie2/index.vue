<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<h-vertical-tabs
			class="h-tabs-circle__tabs"
			:source="data"
      :hasInterval="false"
			:defaultActived="tabActived"
			@actived-change="tabActivedChange"
		/>
		<div class="ring" :id="id"/>
		<div>
			<div class="unit">单位：万m³</div>
			<div class="h-ring-1-legend-box">
				<ul class="h-ring-1-legend" :style="legengdTransform">
					<li class="fn-flex flex-row" v-for="(item,index) in list" :key="index"
						@click="activeHandler(index)"
						:class="[{active: animateActiveIndex===index}]">
						<i class="circle"
						   :style="{color:JSON.parse(config.config.color)[index%(JSON.parse(config.config.color).length)]}"/>
						<label class="ellipsis">{{item.title}}</label>
						<a>{{item.des}}</a>
						<span>{{item.value}}{{config.config.suffix}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import getOption from './options'
	import {getInput, getSelect} from "../../../../lib";
	import HVerticalTabs from '../../AirFeed/h-tabs-circle/HVerticalTabs';

	const configSource = {
		config: {
			fields: {
				background: getSelect('background', '背景图片', ['/static/icons/h-ring1-1.svg', '/static/icons/h-ring1-2.svg', '/static/icons/h-ring1-3.svg']),
				color: getInput('color', '颜色'),
				suffix: getInput('suffix', '后缀'),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			background: true,
			color: true,
			suffix: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify([
				{
					name: '区域',
					data: [
						{value: 13.5, des: '111', title: '南门站'},
						{value: 12.5, des: '', title: '北门站'},
						{value: 12.5, des: '', title: '下沙门站'},
						{value: 12.5, des: '', title: '江东门站'},
						{value: 12.5, des: '', title: '所前门站'},
						{value: 12.5, des: '', title: '杭州东站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
					]
				},
				{
					name: '子公司',
					data: [
						{value: 14.5, des: '111', title: '南门站'},
						{value: 12.5, des: '', title: '北门站'},
						{value: 12.5, des: '', title: '下沙门站'},
						{value: 12.5, des: '', title: '江东门站'},
						{value: 12.5, des: '', title: '所前门站'},
						{value: 12.5, des: '', title: '杭州东站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
					]
				},
				{
					name: '用气性质',
					data: [
						{value: 15.5, des: '111', title: '南门站'},
						{value: 12.5, des: '', title: '北门站'},
						{value: 12.5, des: '', title: '下沙门站'},
						{value: 12.5, des: '', title: '江东门站'},
						{value: 12.5, des: '', title: '所前门站'},
						{value: 12.5, des: '', title: '杭州东站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
						{value: 12.5, des: '', title: '杭州西站'},
					]
				}
			])
		},
		config: {
			background: '/static/icons/h-ring1-1.svg',
			suffix: '%',
			color: JSON.stringify(['#00DDFF', 'rgba(1,253,210,1)', 'rgba(36,104,206,1)', 'rgba(228,53,53,1)', 'rgba(252,155,93,1)']),
		}
	}
	export default {
		mixins: [mixins],
		components: {HVerticalTabs},
		data() {
			return {
				showSize: 9,
				tabActived: 2,
			}
		},
		computed: {
			list() {
				return this.data ? this.data[this.tabActived].data : []
			},
			legengdTransform() {
				if (this.list) {
					if (this.list.length <= this.showSize + 1) {
						return {transform: `translateY(0px)`}
					} else {
						if (this.animateActiveIndex > this.showSize) {
							const top = (this.animateActiveIndex - this.showSize) * 24
							return {transform: `translateY(-${top}px)`}
						} else {
							return {transform: `translateY(0px)`}
						}
					}
				}
				return {transform: `translateY(0px)`}
			}
		},
		methods: {
			tabActivedChange(tabActived) {
				this.tabActived = tabActived
				this.setOption(this.data[tabActived].data)
			},
			activeHandler(index) {
				clearInterval(this.animateTimer)
				this.instance.dispatchAction({
					type: 'downplay',
					seriesIndex: 0,
					dataIndex: this.animateActiveIndex
				})
				this.animateActiveIndex = index
				this.instance.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: index
				})
				setTimeout(() => {
					this.show(this.list)
				}, 2000)
			},
			setOption(data) {
				this.instance && this.instance.setOption(getOption(data, this.config.config))
        this.animateActiveIndex = 0
        this.show(data)
			},
			show(data) {
				clearInterval(this.animateTimer)
				this.animateTimer = setInterval(() => {
					this.instance.dispatchAction({
						type: 'downplay',
						seriesIndex: 0,
						dataIndex: this.animateActiveIndex % data.length
					})
					if (this.animateActiveIndex >= data.length - 1) {
						this.animateActiveIndex = 0
					} else {
						this.animateActiveIndex = this.animateActiveIndex + 1
					}
					this.instance.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: this.animateActiveIndex % data.length
					})
				}, 1000)
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = [...val]
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(data[this.tabActived].data)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;
	}

	.ring {
		width: 220px;
		height: 220px;
		background: url("./img/bg.svg") no-repeat center;
		background-size: 84px 84px;
	}

	.h-ring-1-legend-box {
		right: 25px;
		top: 49px;
		max-height: 176px;
		overflow-y: hidden;
	}

	.unit {
		font-size: 18px;
		line-height: 24px;
		color: #FFFFFF;
		text-align: right;
		margin-bottom: 8px;
	}

	.h-ring-1-legend {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 476px;
		transition: all .3s;

		li {
			align-items: center;
			min-width: 132px;
			padding: 3px 8px;
			margin-bottom: 8px;

			&.active {
				background: rgba(255, 255, 255, 0.2);
				border-radius: 4px;
			}
		}

		i {
			border: 2px solid;
			width: 12px;
			height: 12px;
		}

		label, span, a {
			color: #fff;
			font-size: 18px;
			line-height: 18px;
		}

		label {
			margin-left: 4px;
			min-width: 100px;
			max-width: 100px;
			text-align: left;
		}

		a {
			margin-right: 10px;
		}

		span {
			margin-left: auto;
		}
	}
</style>

