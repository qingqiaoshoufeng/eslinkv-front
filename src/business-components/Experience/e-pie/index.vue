<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="e-ring" :id="id"/>
		<ul class="e-ring-icon pos-a" :style="{backgroundImage:`url(${config.config.background})`}">
			<li class="pos-a" v-for="(item,index) in icon" :key="index" :style="{transform:`rotate(${3.6*index}deg)`}"/>
		</ul>
		<div class="pos-a e-ring-legend-box">
			<ul class="e-ring-legend" :style="legengdTransform">
				<li class="fn-flex flex-row" v-for="(item,index) in data?data:[]" :key="index"
					@click="activeHandler(index)"
					:class="[{active:animateActiveIndex===index}]">
					<i class="circle"
					   :style="{color:JSON.parse(config.config.color)[index%(config.config?JSON.parse(config.config.color).length:0)]}"/>
					<label class="ellipsis">{{item.title}}</label>
					<a>{{item.des}}</a>
					<span>{{item.value}}{{config.config.suffix}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'
	import {getInput, getSelect} from "../../../../lib";

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
			data: JSON.stringify(
				[
					{value: 12.5, des: '111', title: '南门站'},
					{value: 12.5, des: '', title: '北门站'},
					{value: 12.5, des: '', title: '下沙门站'},
					{value: 12.5, des: '', title: '江东门站'},
					{value: 12.5, des: '', title: '所前门站'},
					{value: 12.5, des: '', title: '杭州东站'},
					{value: 12.5, des: '', title: '杭州西站'},
				]
			)
		},
		config: {
			background: '/static/icons/h-ring1-3.svg',
			suffix: '%',
      color: JSON.stringify(['#db4f49', '#367cf6', '#84e4fc', '#f8cd47', '#fceb50', '#ed9144', '#5fcbb9']),
		}
	}
	export default {
		mixins: [mixins],
		data() {
			return {
				icon: new Int8Array(100),
				showSize: 4,
			}
		},
		computed: {
			legengdTransform() {
				if (this.data) {
					if (this.data.length <= this.showSize + 1) {
						return {transform: `translateY(0px)`}
					} else {
						if (this.animateActiveIndex > this.showSize) {
							const top = (this.animateActiveIndex - this.showSize) * 32
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
					this.show(this.data)
				}, 2000)
			},
			setOption(data) {
				options.series[0].data = data.map(item => item.value)
				options.color = JSON.parse(this.config.config.color)
				this.instance && this.instance.setOption(options)
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
							this.setOption(data)
							this.show(data)
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
	.e-ring {
		height: 100%;
	}

	.e-ring-icon {
		background-size: 40px 49px;
		background-repeat: no-repeat;
		background-position: center;
    width: 100px;
    height: 100px;
		top: 50%;
		left: 10%;
		margin-left: -50px;
		margin-top: -50px;

		li {
			width: 2px;
			height: 8px;
			background-color: rgba(255, 255, 255, 0.2);
			top: 0;
			left: 51%;
			margin-left: -1px;
			transform-origin: 0 50px;
		}
	}

	.e-ring-legend-box {
		left: 24%;
		top: 45px;
		max-height: 176px;
		overflow-y: hidden;
	}

	.e-ring-legend {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 660px;
		transition: all .3s;

		li {
			align-items: center;
			min-width: 313px;
			padding: 8px;

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
      flex: 1;
      text-align: right;
			margin-right: 10px;
		}

		span {
			margin-left: auto;
		}
	}
</style>

