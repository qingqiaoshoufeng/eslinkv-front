<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="analysis-box">
			<div class="h-line-1" :id="id" />
			<div class="context">
				<div v-for="(item,index) in data&&data.dataList" :key="index" class="context-item">
					<div class="item-name">{{item.name}}</div>
					<div class="item-value">{{item.value}}</div>
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
			dataList: [
				{
					name: '安装',
					value: 2430,
					maxValue: 5340,
				},
				{
					name: '开户',
					value: 4312,
					maxValue: 5340,
				},
				{
					name: '维修',
					value: 5340,
					maxValue: 5340,
				},
				{
					name: '咨询',
					value: 340,
					maxValue: 540,
				},
				{
					name: '其他',
					value: 2430,
					maxValue: 5340,
				},
			],
		}),
	},
};
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			options.series.data[0].value = data.dataList.map(
				item => item.value
			);
			options.radar.indicator = data.dataList.map(item => {
				return { name: item.name, max: item.maxValue };
			});
			console.log(options);
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
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss">
.analysis-box {
	display: flex;
	.h-line-1 {
		height: 240px;
		width: 300px;
	}
	.context {
		display: flex;
        width: 170px;
		flex-direction: column;
        justify-content: center;
		.context-item {
			display: flex;
            height: 24px;
            margin-top: 11px;
			.item-name {
				//styleName: 文字/18;
				font-family: PingFang SC;
				font-size: 18px;
				font-style: normal;
				font-weight: 400;
				line-height: 24px;
				letter-spacing: 0px;
				text-align: right;
                font-size: 18px;
				color: #00ddff;
			}
			.item-value {
				//styleName: 数字/24;
				font-family: DIN Alternate;
                margin-left: 35px;
				font-size: 24px;
				font-style: normal;
				font-weight: 700;
				line-height: 24px;
				text-align: left;
                color:#fff
			}
		}
	}
}
</style>

