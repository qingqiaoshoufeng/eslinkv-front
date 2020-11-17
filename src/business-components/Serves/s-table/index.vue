<template>
	<div class="widget-part" :style="styles">
		<ul class="title">
			<li>时间</li>
			<li>客户</li>
			<li>业务类型</li>
			<li>状态</li>
		</ul>
		<div class="content" v-if="data">
			<vue-seamless-scroll
				:data="data.list || []"
				class="content__seamless-warp1"
				:class-option="classOption"
			>
				<ul
					class="content__row1"
					v-for="(item, index) in data.list"
					:key="index"
				>
					<li>{{ item.time || '' }}</li>
					<li>{{ item.channel || '' }}</li>
					<li>{{ item.businessType || '' }}</li>
					<li :class="{closed: item.statusDesc === data.activeStatus }">{{ item.statusDesc || '' }}</li>
				</ul>
			</vue-seamless-scroll>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import VueSeamLess from 'vue-seamless-scroll';
const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
      list: [
        {
          time: '06/03 09:11',
          channel: '李萌萌',
          businessType: '安装',
          statusDesc: '新申请',
        },
        {
          time: '06/03 09:11',
          channel: '李萌萌',
          businessType: '安装',
          statusDesc: '审核中',
        },
        {
          time: '06/03 09:11',
          channel: '在线客服',
          businessType: '安装',
          statusDesc: '已受理',
        },
        {
          time: '06/03 09:11',
          channel: '李萌萌',
          businessType: '维修',
          statusDesc: '已办结',
        },
        {
          time: '06/03 09:11',
          channel: '李萌萌',
          businessType: '开户',
          customer: '李的萌萌',
          statusDesc: '新申请',
        },
        {
          time: '06/03 09:11',
          channel: '李萌萌',
          businessType: '安装',
          statusDesc: '新申请',
        },
      ],
      activeStatus: '已办结'
    }),
	},
};
export default {
	mixins: [mixins],
	components: {
		VueSeamLess,
	},
	methods: {},
	computed: {
		rulerWidth() {
			// 比例根据视觉稿来的
			const rate = 388 / 4500;
			return (this?.data?.amount * rate ?? 0) + 'px';
		},
		classOption() {
			return {
				step: 0.2, // 数值越大速度滚动越快
				limitMoveNum: this.data?.list?.length, // 开始无缝滚动的数据量
				hoverStop: true, // 是否开启鼠标悬停stop
				direction: 1, // 0向下 1向上 2向左 3向右
				openWatch: true, // 开启数据实时监控刷新dom
				singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
				singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
				waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
			};
		},
	},
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.widget-part {
	.title {
		width: 100%;
		height: 40px;
		background: rgba(23, 123, 255, 0.2);
		display: flex;
		align-items: center;
		padding: 8px;
		box-sizing: border-box;
		& > li {
			font-family: PingFang SC;
      font-size: 20px;
      line-height: 24px;
			color: #00CBF4;
			text-align: left;
			&:nth-child(1) {
				width: 144px;
			}
			&:nth-child(2) {
				width: 100px;
			}
			&:nth-child(3) {
				width: 126px;
			}
			&:nth-child(4) {
				flex: 1;
			}
		}
	}
	.content {
		height: 432px;

		&__seamless-warp1 {
			height: 432px;
			overflow: hidden;
		}
		&__row1 {
			height: 48px;
			display: flex;
			align-items: center;
      padding-left: 8px;
			box-sizing: border-box;
      &:nth-child(2n+1){
        background: rgba(255, 255, 255, 0.1);
      }
			& > li {
				text-align: left;
				font-family: PingFang SC;
        font-size: 20px;
        line-height: 24px;
				color: #FFFFFF;
				&:nth-child(1) {
					width: 144px;
					color: rgba(255, 255, 255, 0.75);
				}
				&:nth-child(2) {
					width: 100px;
				}
				&:nth-child(3) {
					width: 126px;
				}
				&:nth-child(4) {
					flex: 1;
          color: #00DDFF;
          &.closed {
            color: #00FFCF;
          }
				}
			}
		}
	}
}
</style>

