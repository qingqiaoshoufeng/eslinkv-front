<template>
	<div class="widget-part" :style="styles">
		<div class="s-progress-1">
			<ul>
				<li class="fn-flex flex-row pos-r" v-for="(item,index) in data?data:[]" :key="index">
					<i :style="{backgroundImage:`url(${config.config&&config.config.background[index].background})`}"></i>
					<label>{{config.config&&config.config.background[index].title}}</label>
					<div class="fn-flex flex-row s-progress-1-line-box pos-r">
						<div class="s-progress-1-line" v-for="(child,key) in icons" :key="key"></div>
					</div>
					<div class="fn-flex flex-row s-progress-1-real-box pos-a">
						<div :style="{background:`linear-gradient(to right, ${colors[i]} , ${colors[i+1]})`}"
							 class="s-progress-1-real" v-for="(child,i) in realArr[index]" :key="i"></div>
					</div>
					<p class="font-num">{{item.value}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import {getSelect, getArrayGroup, getInput} from "../../../../lib";

	const configSource = {
		config: {
			fields: {
				background: getArrayGroup('background', '背景图片', [
					getInput('title', '标题'),
					getSelect('background', '背景图片', ['/static/icons/s-progress1-1.svg', '/static/icons/s-progress1-2.svg', '/static/icons/s-progress1-3.svg'])
				]),
			}
		}
	}
	const config = {
		animation: true,
		config: {
			background: true,
		}
	}
	const value = {
		api: {
			data: JSON.stringify([
				{
					value: 324
				},
				{
					value: 418
				},
				{
					value: 219
				}
			])
		},
		config: {
			background: [{
				background: '/static/icons/s-progress1-1.svg',
				title: '开户(户)'
			}, {
				background: '/static/icons/s-progress1-2.svg',
				title: '安装(户)'
			}, {background: '/static/icons/s-progress1-3.svg', title: '点火(户)'}],
		}
	}

	export default {
		data() {
			return {
				icons: new Int8Array(50),
				max: 0,
				colors: [],
				realArr: []
			}
		},
		mixins: [mixins],
		watch: {
			data: {
				handler(val) {
					if (val) {
						let realArr = []
						const list = val.reduce((initVal, val) => {
							initVal.push(val?.value || 0)
							return initVal
						}, [])
						const max = Math.max(...list)
						this.max = max
						val.forEach(item => {
							realArr.push(new Int8Array(Math.ceil(item.value / max * 50)))
						})
						console.log(realArr)
						this.realArr = realArr
					}
				},
			},
			immediate: true,
			deep: true,
		},
		methods: {
			parseColor(hexStr) {
				return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
					return 0x11 * parseInt(s, 16);
				}) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
					return parseInt(s, 16);
				})
			},
			pad(s) {
				return (s.length === 1) ? '0' + s : s;
			},
			gradientColors(start, end, steps, gamma) {
				let i, j, ms, me, output = [], so = [];
				gamma = gamma || 1;
				const normalize = function (channel) {
					return Math.pow(channel / 255, gamma);
				};
				start = this.parseColor(start).map(normalize);
				end = this.parseColor(end).map(normalize);
				for (i = 0; i < steps; i++) {
					ms = i / (steps - 1);
					me = 1 - ms;
					for (j = 0; j < 3; j++) {
						so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
					}
					output.push('#' + so.join(''));
				}
				this.colors = output
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
			this.gradientColors('#0057A9', '#00DDFF', 50)
		}
	}
</script>
<style lang="scss">
	.s-progress-1 {
		height: 100%;

		li {
			margin-bottom: 24px;
			align-items: center;

			p {
				font-size: 24px;
				line-height: 24px;
				color: #fff;
				margin-left: auto;
			}

			i {
				width: 32px;
				height: 32px;
				background-size: 32px;
				margin-right: 8px;
			}

			label {
				margin-right: 8px;
				color: #fff;
				font-size: 18px;
				line-height: 24px;
			}

			&:last-child {
				margin-bottom: 0;
			}
		}

	}

	.s-progress-1-real-box {
		left: 115px;
	}

	.s-progress-1-real {
		width: 3px;
		height: 16px;
		margin-right: 3px;
	}

	.s-progress-1-line {
		width: 3px;
		height: 16px;
		margin-right: 3px;
		background: rgba(0, 87, 169, 0.5);
	}
</style>

