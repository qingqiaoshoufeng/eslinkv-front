<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="tab">
			<div class="swiper" @click="back" :class="{active: offset > 0}"><span class="left"></span></div>
			<div class="scroll-wrapper">
				<ul class="scroll" :style="{transform: `translateX(-${offsetX}px)`}" ref="scroll">
					<li class="pointer" v-for="(k) in list" :class="{active: k.label === currIndex}"
						:key="k.label"
						@click="drawLine(k)">
						{{k.label}}
					</li>
				</ul>
			</div>
			<div class="swiper" @click="next" :class="{active: offset < list.length}"><span
				class="right"></span></div>
		</div>
		<div class="chart" :id="id"/>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import getOption from './options'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		data() {
			return {
				offset: 0,
				offsetX: 0,
				currIndex: '全部',
				list:[]
			}
		},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(data, this.config.config))
			},
			back() {
				if (this.offset === 0) return
				this.offset--
				this.getOffset()
			},
			next() {
				if (this.offset === this.data.typeList.length) return
				this.offset++
				this.getOffset()
			},
			drawLine(row,) {
				this.currIndex = row.label
				let params = this.config.api.params
				if (params) {
					if (typeof params === 'string') {
						params = {...JSON.parse(params), industry: row.code}
					} else {
						params = {...params, industry: row.code}
					}
				} else {
					params = {}
					params.industry = row.code
				}
				this.config.api.params = JSON.stringify(params)
			},
			getOffset() {
				if (!this.$refs.scroll) return 0
				const n = (this.$refs.scroll.scrollWidth - this.$refs.scroll.offsetWidth) / this.$refs.scroll.offsetWidth
				const extra = (this.$refs.scroll.scrollWidth - this.$refs.scroll.offsetWidth) % this.$refs.scroll.offsetWidth
				if (n <= this.offset) {
					this.offsetX = extra
				} else {
					this.offsetX = this.$refs.scroll.offsetWidth * this.offset
				}
			}
		},
		watch: {
			'config.api.params':{
				handler(val){
					if(val){
						if(val.compareType==='year'){
							this.config.config.lineName1=new Date().getFullYear()
							this.config.config.lineName2=new Date().getFullYear()-1
						}
						if(val.compareType==='month'){
							this.config.config.lineName1=`${new Date().getMonth()+1}月`
							this.config.config.lineName2=`${new Date().getMonth()}月`
						}
						if(val.compareType==='day'){
							this.config.config.lineName1=`${new Date().getMonth()+1}.${new Date().getDate()}`
							this.config.config.lineName2=`${new Date().getMonth()+1}.${new Date().getDate()-1}`
						}
					}
				},
				deep: true,
				immediate: true,
			},
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(val)
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.configValue = this.parseConfigValue(value, customConfig);
		},
		mounted() {
			this.$sysApi.bussiness.businessAnalysisType().then(res=>{
				this.list=res.typeList
			})
		}
	};
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}

	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.swiper {
			flex: none;
			width: 12px;
			height: 20px;
			background: #0057A9;
			border-radius: 2px;
			display: flex;
			justify-content: center;
			align-items: center;

			&.active {
				border: 1px solid #00DDFF;
			}

			> .left {
				width: 0;
				height: 0;
				border-top: 6px solid transparent;
				border-right: 6px solid rgba(255, 255, 255, 0.75);
				border-bottom: 6px solid transparent;
			}

			> .right {
				width: 0;
				height: 0;
				border-top: 6px solid transparent;
				border-left: 6px solid rgba(255, 255, 255, 0.75);
				border-bottom: 6px solid transparent;
			}
		}

		.scroll-wrapper {
			overflow: hidden;
			margin: 0 8px;
		}

		.scroll {
			transition: all 0.4s;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;

			> li {
				flex: none;
				position: relative;
				height: 32px;
				padding: 0 8px;
				background: #0057A9;
				font-size: 16px;
				line-height: 32px;
				color: rgba(255, 255, 255, 0.75);
				margin-right: 8px;

				&.active {
					color: #FFFFFF;

					&:before {
						content: '';
						display: block;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						height: 2px;
						background: #00DDFF;
					}
				}
			}
		}
	}

</style>

