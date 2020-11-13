<template>
	<div class="widget-part fn-flex flex-row" :style="styles">
		<div class="circle1list-box">
			<div class="left-list">
				<div
					class="list-item"
					:class="{'list-item-active':activeIndex === index}"
					v-for="(item,index) in data&&data.list"
					:key="index"
					:activeIndex="activeIndex"
					@click="selectTab(index)"
				>{{item}}
                <img src="/static/images/arrow.svg" v-if="index===activeIndex" />
                </div>
			</div>
			<div class="right-circle">
				<circle1 :data="computedData" v-if="computedData" />
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import circle1 from './circle1';

const config = { animation: true };
const itemList = [
	{
		color: [
			'rgba(0, 62, 144, 0.8)',
			'rgba(0, 145, 210, 0.8)',
			'rgba(0, 233, 194, 0.8)',
		],
		title: '钢管（米）',
		value: [
			{ title: '设计量1：', value: 34452 },
			{ title: '领用量1：', value: 23445 },
			{ title: '核销量1：', value: 13345 },
		],
	},
	{
		color: [
			'rgba(0, 62, 144, 0.8)',
			'rgba(0, 145, 210, 0.8)',
			'rgba(0, 233, 194, 0.8)',
		],
		title: '钢管（米）',
		value: [
			{ title: '设计量：', value: 34452 },
			{ title: '领用量：', value: 23445 },
			{ title: '核销量：', value: 13345 },
		],
	},
	{
		color: [
			'rgba(0, 62, 144, 0.8)',
			'rgba(0, 145, 210, 0.8)',
			'rgba(0, 233, 194, 0.8)',
		],
		title: '钢管（米）',
		value: [
			{ title: '设计量：', value: 34452 },
			{ title: '领用量：', value: 23445 },
			{ title: '核销量：', value: 13345 },
		],
	},
];
const value = {
	api: {
		data: JSON.stringify({
			list: ['笔数', '气量', '金额'],
			itemList: itemList,
			intervalTime: 2000,
			timeoutTime: 2000,
		}),
	},
};
export default {
	data() {
		return {
			activeIndex: 0,
			intervalId: null,
			timeId: null,
		};
	},
	mixins: [mixins],
	components: { circle1 },
	computed: {
		computedData() {
			if (!this.data) return;
			return this.data && this.data.itemList[this.activeIndex];
		},
	},
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted() {
		this.actived = this.defaultActived || 0;
		this.beginInterval();
	},
	methods: {
		selectTab(index) {
			clearInterval(this.intervalId);
			this.intervalId = null;
			this.activeIndex = index;
			setTimeout(this.beginInterval, this.data.timeoutTime);
		},
		beginInterval() {
			if (!this.data) return;
			if (this.intervalId) return;
			this.intervalId = setInterval(() => {
				this.activeIndex = (this.activeIndex + 1) % 3;
				console.log(this.activeIndex);
			}, this.data.intervalTime);
		},
	},
};
</script>
<style lang="scss">
.circle1list-box {
	width: 100%;
	height: 100%;
	display: flex;
	.left-list {
		width: 100px;
		height: 140px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.list-item {
            text-align: left;
            padding-left: 8px;
			height: 40px;
			line-height: 40px;
			width: 96px;
			background: rgba(0, 31, 109, 0.5);
			font-family: PingFang SC;
			font-style: normal;
			font-weight: normal;
			font-size: 18px;
			color: #fff;
			border-left: 4px solid rgba(0, 31, 109, 0.5);
            display: flex;
            align-items: center;
            img{
                height: 20px;
                width: 20px;
                margin-left: 20px;
            }
		}
		.list-item-active {
			border-left: 4px solid #00ddff;
		}
	}
	.right-circle {
		margin-left: 32px !important;
		display: flex;
		align-items: center;
	}
}
</style>

