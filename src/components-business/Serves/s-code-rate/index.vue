<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="left">
			<div class="row">
				<img :src="config.config.img1" alt="">
				<span class="row-txt">{{ config.config.desc1 }}</span>
				<span class="row-num font-num">{{ data.value2 | toThousand }}</span>
			</div>
			<div class="row">
				<img :src="config.config.img2" alt="">
				<span class="row-txt">{{ config.config.desc2 }}</span>
				<span class="row-num font-num">{{ data.value1 | toThousand }}</span>
			</div>
		</div>
		<div class="chart-wrap">
			<div class="chart" :id="id"/>
      <div class="pointBox" :style="style">
        <div class="radius"></div>
        <div class="carout_point"></div>
      </div>
			<div class="content">
				<div class="content-num font-num">{{data.rate}}%</div>
				<div class="content-txt">{{config.config.title}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import getOption from './options';
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			setOption() {
				this.instance && this.instance.setOption(getOption(this.data.rate))
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							);
							this.setOption();
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
    computed: {
      style() {
        if (this.data) {
          let rotate = ((this.data.rate / 100) * 360) + 6
          return {
            transform: `translateX(-50%) rotate(${rotate}deg)`,
          }
        }
        return {
          transform: `translateX(-50%) rotate(0deg)`,
        }
      }
    },
		created() {
			this.configValue = this.parseConfigValue(value, customConfig);
		},
	};
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 16px;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.row {
				display: flex;

				&:first-child {
					margin-bottom: 32px;
				}

				img {
					width: 32px;
					height: 32px;
					margin-right: 8px;
				}

				.row-txt {
					text-align: left;
					width: 132px;
					font-size: 20px;
					line-height: 25px;
					color: #fff;
				}

				.row-num {
					flex: 1;
					text-align: right;
					font-weight: bold;
					font-size: 32px;
					line-height: 32px;
					color: #FFFFFF;
				}
			}
		}

		.chart-wrap {
			width: 196px;
			height: 196px;
			background: url('./img/rate-bg.svg') no-repeat;
			background-size: 100% 100%;
			position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

			.chart {
				width: 160px;
				height: 160px;
			}

			.content {
				position: absolute;
				top: 62px;
				left: 0;
				right: 0;

				.content-txt {
					font-size: 18px;
					line-height: 32px;
					color: #FFFFFF;
				}

				.content-num {
					font-weight: bold;
					font-size: 40px;
					line-height: 48px;
					color: #FEFFFF;
				}
			}
		}
	}

  .pointBox {
    height: 160px;
    width: 10px;
    position: absolute;
    top: 16px;
    left: 50%;
    opacity: 1;

    .carout_point {
      width: 15px;
      height: 15px;
      background: #fff;
      position: absolute;
      bottom: -4px;
      border-radius: 10px;
    }
  }
</style>

