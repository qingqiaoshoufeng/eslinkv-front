<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-ring-1" :id="id"/>
		<ul class="h-ring-1-icon pos-a">
			<li class="pos-a" v-for="(item,index) in icon" :key="index" :style="{transform:`rotate(${3.6*index}deg)`}"/>
		</ul>
		<div class="pos-a h-ring-1-legend-box">
			<ul class="h-ring-1-legend" :style="legengdTransform">
				<li class="fn-flex flex-row" v-for="(item,index) in data?data.value:[]" :key="index"
					:class="[{active:animateActiveIndex===index}]">
					<i class="circle" :style="{color:data&&data.color[index%(data?data.color.length:0)]}"/>
					<label>{{item.title}}</label>
					<span>{{item.value}}{{data&&data.suffix}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import options from './options'

	const localConfigValue = {
		api: {
			data: JSON.stringify({
				color: ['#00DDFF', 'rgba(1,253,210,.5)', 'rgba(36,104,206,.5)', 'rgba(228,53,53,.5)', 'rgba(252,155,93,.5)'],
				suffix: '%',
				value: [
					{value: 12.5, title: '南门站'},
					{value: 12.5, title: '北门站'},
					{value: 12.5, title: '下沙门站'},
					{value: 12.5, title: '江东门站'},
					{value: 12.5, title: '所前门站'},
					{value: 12.5, title: '杭州东站'},
					{value: 12.5, title: '杭州西站'},
				]
			})
		}
	}
	export default {
		mixins: [mixins],
		data() {
			return {
				icon: new Int8Array(100),
				showSize: 5,
			}
		},
		computed: {
			legengdTransform() {
				if (this.data) {
					if (this.data.value.length <= this.showSize + 1) {
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
			setOption(data) {
				options.series[0].data = data.value
				options.color = data.color
				this.instance && this.instance.setOption(options)
			},
			show() {
				if (this.data) {
					const data = this.data.value
					const echarts = this.instance
					clearTimeout(this.animateTimer)
					this.animateTimer = setInterval(() => {
						echarts.dispatchAction({
							type: 'downplay',
							seriesIndex: 0,
							dataIndex: this.animateActiveIndex % data.length
						})
						if (this.animateActiveIndex >= data.length - 1) {
							this.animateActiveIndex = 0
						} else {
							this.animateActiveIndex = this.animateActiveIndex + 1
						}
						echarts.dispatchAction({
							type: 'highlight',
							seriesIndex: 0,
							dataIndex: this.animateActiveIndex % data.length
						})
					}, 1000)
				}

			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = {...val}
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(data)
							this.show()
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValueCustom(localConfigValue)
		}
	}
</script>
<style lang="scss">
	.h-ring-1 {
		height: 100%;
	}

	.h-ring-1-icon {
		background-image: url('/static/icons/h-ring1-1.svg');
		background-size: 40px 49px;
		background-repeat: no-repeat;
		background-position: center;
		width: 112px;
		height: 112px;
		top: 50%;
		left: 25%;
		margin-left: -56px;
		margin-top: -56px;

		li {
			width: 2px;
			height: 8px;
			background-color: rgba(255, 255, 255, 0.2);
			top: 0;
			left: 50%;
			margin-left: -1px;
			transform-origin: 0 56px;
		}
	}

	.h-ring-1-legend-box {
		right: 85px;
		top: 49px;
		max-height: 198px;
		overflow-y: hidden;
	}

	.h-ring-1-legend {
		transition: all .3s;

		li {
			align-items: center;
			min-width: 132px;
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

		label, span {
			color: #fff;
			font-size: 16px;
			line-height: 16px;
		}

		label {
			margin-left: 4px;
			margin-right: auto;
		}

		span {
			margin-left: 20px;
		}
	}
</style>

