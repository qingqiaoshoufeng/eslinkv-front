<template>
	<div class="widget-part" :style="styles">
		<div class="securitycheck-box">
			<div class="left">
				<div class="plan">
					<img src="static/images/serves/securitycheck-plan.svg" alt />
					<div class="desc">本月安检计划量</div>
					<div class="value font-num">{{data&&data.planValue}}</div>
				</div>
				<div class="reality">
					<img src="static/images/serves/securitycheck-reality.svg" alt />
					<div class="desc">本月实际入户数</div>
					<div class="value font-num">{{data&&data.realValue}}</div>
				</div>
			</div>
			<div class="right">
				<div class="h-line-1" :id="id" ></div>
                <div class="context">
                    <div class="percentage font-num">{{`${data&&data.percentage}%`}}</div>
                    <div class="percentage-desc">本月安检率</div>
                </div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import options from './options';
const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			planValue: 96,
			realValue: 96,
			percentage: 56,
		}),
	},
};
export default {
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource();
		this.configValue = this.parseConfigValue({ animation: true }, value);
	},
	computed: {
		style() {
			let rotate = (this.data.percentage / 100) * 360;
			return {
				transform: `rotate(${rotate}deg)`,
			};
		},
	},
	methods: {
		setOption(data) {
			console.log(options);
			let newData = []; 
            let newData1 = [];
            let newData3 = [];
            let newData4 = [];
            
			for (var i = 0; i < data.percentage / 4; i++) {
				console.log(data.percentage);
				let opcity = 1 - (i * 4) / data.percentage;
				newData = [
					...newData,
					{
						value: 3.5,
						name: '直接访问',
						itemStyle: {
							color: `rgba(1, 76, 92,${opcity})`,
						},
					},
					{
						value: 0.5,
						name: '直接访问',
						itemStyle: {
							color: `rgba(255, 255, 255,0)`,
						},
					},
				];
				newData1 = [
					...newData1,
					{
						value: 3.5,
						name: '直接访问',
						itemStyle: {
							
							color: `#fff`,
						},
					},
					{
						value: 0.5,
						name: '直接访问',
						itemStyle: {		
							color: `rgba(255, 255, 255,0)`,
						},
					},
                ];
                newData3 = [
                    ...newData3,
					{
						value: 4,
						name: '直接访问',
						itemStyle: {
                            color: `#fff`,
							
						},
					},
                ];
                newData4 = [
                    ...newData4,
					{
						value: 4,
						name: '直接访问',
						itemStyle: {
							color: `rgba(1, 76, 92,${opcity})`,
						},
					},
                ];
			}
			for (var i = 0; i <= (100 - data.percentage) / 4; i++) {
                let opcity = 1 - (i * 4) / data.percentage;
                newData = [...newData,{
					value: 3.5,
					name: '直接访问',
					itemStyle: {
						color: `#191F47`,
					},
				},{
					value: 0.5,
					name: '直接访问',
					itemStyle: {
						color: `rgba(255, 255, 255,0)`,
					},
				}]
				newData1 = [...newData1,{
					value: 3.5,
					name: '直接访问',
					itemStyle: {
						color: `#191F47`,
					},
				},{
					value: 0.5,
					name: '直接访问',
					itemStyle: {
						color: `rgba(255, 255, 255,0)`,
					},
                }]
                newData3 = [
                    ...newData3,
					{
						value: 4,
						name: '直接访问',
						itemStyle: {
							color: `rgba(255, 255, 255,0)`,
						},
					},
                ];
                newData4 = [
                    ...newData4,
					{
						value: 4,
						name: '直接访问',
						itemStyle: {
							color: `rgba(255, 255, 255,0)`,
						},
					},
                ];
			}

			console.log(newData);
			options.series[0].data = newData1;
            options.series[1].data = newData;
            options.series[2].data = newData3;
            options.series[3].data = newData4;
			this.instance && this.instance.setOption(options);
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val };
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id)
						);
						this.setOption(data);
					});
				}
			},
			deep: true,
			immediate: true,
		},
	},
};
</script>
<style lang="scss">
.securitycheck-box {
	width: 100%;
	height: 100%;
	display: flex;
	.left {
		width: 270px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-items: center;
		.plan,
		.reality {
			height: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.plan {
			padding-top: 50px;
		}
		.reality {
			margin-top: -25px;
		}
		img {
			height: 32px;
			width: 32px;
		}
		.desc {
			height: 32px;
			line-height: 32px;
			width: 126px;
			left: 56px;
			top: 107px;
			color: #fff;
		}
		.value {
			height: 32px;
			line-height: 32px;
			font-size: 32px;
			color: #fff;
		}
	}
	.right {
		width: 210px;
		display: flex;
		align-items: center;
        justify-content: start;
        position: relative;
		.h-line-1 {
			width: 158px;
            height: 158px;
           
        }
         .context{
            height: 100px;
            width: 100px;
            background-color: #ccc;
            position: absolute;
            top: 50%;
            left: 79px;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .percentage-desc{
                font-size: 18px;
                color: #fff;
                font-family: PingFang SC;
                font-style: normal;
                font-weight: 400;
                line-height: 25px;
                text-align: center;
                padding-top: 10px;
            }
            .percentage{
                font-size: 32px;
                color: #fff;
                text-align: center;
            }
         }
	}
}

// .pointBox {
// 	height: 160px;
// 	width: 10px;
// 	// background: #fff;
// 	position: absolute;
// 	top: 0;
//     left: 50%;
//     transform: translate(-50%,0);
//     opacity:1;
//     .carout_point{
//         width: 10px;
//         height: 10px;
//         background: #fff;
//         position: absolute;
//         bottom: -1px;
//         border-radius: 10px;
//     }
// }
</style>

