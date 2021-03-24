<template>
	<div class="widget-part" :style="styles">
		<div class="s-progress-1">
			<ul>
				<li class="fn-flex flex-row pos-r" v-for="(item,index) in config.config.background" :key="index">
					<i :style="{backgroundImage:`url(${config.config && config.config.background[index].background})`}"></i>
					<label>{{ config.config && config.config.background[index].title }}</label>
					<div class="fn-flex flex-row s-progress-1-line-box pos-r">
						<div class="s-progress-1-line" v-for="(child,key) in icons" :key="key"></div>
					</div>
					<div class="fn-flex flex-row s-progress-1-real-box pos-a">
						<div
							:style="{background:`linear-gradient(to right, ${colors[i]} , ${colors[i + 1]})`}"
							class="s-progress-1-real"
							v-for="(child,i) in realArr[index]"
							:key="i"
						></div>
					</div>
					<p class="font-num">{{ item.value }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { customConfig, value } from './index.component'

	export default {
		data () {
			return {
				icons: new Int8Array(50),
				max: 0,
				colors: [],
				realArr: []
			}
		},
		mixins: [widgetMixin],
		watch: {
			data: {
				handler (val) {
					if (val) {
						const realArr = []
						const list = val.reduce((initVal, val) => {
							initVal.push(val.value || 0)
							return initVal
						}, [])
						const max = Math.max(...list)
						this.max = max
						val.forEach(item => {
							realArr.push(new Int8Array(Math.ceil(item.value / max * 50)))
						})
						this.realArr = realArr
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			parseColor (hexStr) {
				return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
					return 0x11 * parseInt(s, 16)
				}) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
					return parseInt(s, 16)
				})
			},
			pad (s) {
				return (s.length === 1) ? '0' + s : s
			},
			gradientColors (start, end, steps, gamma) {
				let i; let j; let ms; let me; const output = []; const so = []
				gamma = gamma || 1
				const normalize = function (channel) {
					return Math.pow(channel / 255, gamma)
				}
				start = this.parseColor(start).map(normalize)
				end = this.parseColor(end).map(normalize)
				for (i = 0; i < steps; i++) {
					ms = i / (steps - 1)
					me = 1 - ms
					for (j = 0; j < 3; j++) {
						so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16))
					}
					output.push('#' + so.join(''))
				}
				this.colors = output
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
			this.gradientColors('#0057A9', '#00DDFF', 50)
		}
	}
</script>
<style lang="scss">
	.s-progress-1 {
		height: 100%;

		li {
			align-items: center;
			margin-bottom: 24px;

			p {
				margin-left: auto;
				font-size: 24px;
				line-height: 24px;
				color: #fff;
			}

			i {
				width: 32px;
				height: 32px;
				margin-right: 8px;
				background-size: 32px;
			}

			label {
				margin-right: 8px;
				font-size: 18px;
				line-height: 24px;
				color: #fff;
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

