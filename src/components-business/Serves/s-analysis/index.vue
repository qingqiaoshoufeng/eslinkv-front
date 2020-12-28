<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="analysis-box">
			<div class="s-analysis" :id="id" />
			<div class="context">
				<div v-for="(item,index) in data.dataList" :key="index" class="context-item">
					<div class="item-name">{{item.name}}</div>
					<div class="item-value font-num">{{item.value | toThousand }}</div>
					<div class="ratio-value font-num">{{(item.value/total*100).toFixed(2) }}%</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import getOption from './options';

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			dataList: [
				{
					name: '安装',
					value: 2430,
					percent: 0.67,
				},
				{
					name: '开户',
					value: 4312,
          percent: 0.55,
				},
				{
					name: '维修',
					value: 5340,
          percent: 0.67,
				},
				{
					name: '咨询',
					value: 340,
          percent: 0.3,
				},
				{
					name: '其他',
					value: 2430,
          percent: 0.56,
				},
			],
		}),
	},
};
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(this.data));
		},
	},
	computed:{
		total(){
			if(this.data){
				let total =0
				this.data.dataList.forEach(item=>{
					total+= Number(item.value)
				})
				return total
			}
			return 0
		}
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
<style lang="scss" scoped>
.analysis-box {
	display: flex;
	.s-analysis {
		height: 240px;
		width: 250px;
	}
	.context {
		display: flex;
		flex-direction: column;
        justify-content: center;
		margin-left: 20px;
		.context-item {
			display: flex;
            height: 24px;
            margin-top: 11px;
			.item-name {
				font-size: 18px;
				font-style: normal;
				font-weight: 400;
				line-height: 24px;
				letter-spacing: 0;
				text-align: right;
				color: #00ddff;
			}
			.item-value {
                margin-left: 25px;
				font-size: 24px;
				font-style: normal;
				font-weight: 700;
				line-height: 24px;
				text-align: left;
                color:#fff;
				min-width: 52px;
			}
			.ratio-value{
				margin-left: 25px;
				font-size: 24px;
				font-style: normal;
				font-weight: 700;
				line-height: 24px;
				text-align: left;
				color:#fff;
			}
		}
	}
}
</style>

