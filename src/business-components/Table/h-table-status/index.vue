<template>
	<div class="h-table-status widget-part" :style="styles">
		<ul class="h-table-status__title" >
			<li>时间</li>
      <li>业务类型</li>
      <li>渠道</li>
			<li>客户</li>
			<li>状态</li>
		</ul>
		<div
			class="h-table-status__content"
			v-if="!!data">
			<vue-seamless-scroll
			:data="data || []"
			class="h-table-status__content__seamless-warp"
			:class-option="classOption">
				<ul
					class="h-table-status__content__row"
					v-for="(item, index) in data"
					:key="index">
					<li>{{item.time || ''}}</li>
          <li>{{item.businessType || ''}}</li>
          <li>{{item.channel || ''}}</li>
					<li>{{item.customer || ''}}</li>
					<li :class="{active: item.statusDesc === '已处理'}">{{item.statusDesc || ''}}</li>
				</ul>
			</vue-seamless-scroll>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import VueSeamLess from 'vue-seamless-scroll'
	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify([
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '待处理'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '待处理'
				},
				{
					time: '06/03 09:11',
					channel: '在线客服',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '已处理'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '待处理'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李的萌萌',
					statusDesc: '待处理'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '待处理'
				}
			])
		}
	}
	export default {
		mixins: [mixins],
		components: {
			VueSeamLess
		},
		methods: {

		},
		computed: {
			rulerWidth(){
				// 比例根据视觉稿来的
				const rate =  388 / 4500;
				return (this.data?.amount * rate ?? 0 ) + 'px';
			},
			classOption () {
				return {
					step: 0.2, // 数值越大速度滚动越快
					limitMoveNum: this.data?.length, // 开始无缝滚动的数据量
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				}
       		}
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	}
</script>
<style lang="scss">
.h-table-status {
	&__title {
		width: 480px;
		height: 32px;
		background: rgba(23,123,255, 0.2);
		display: flex;
		align-items: center;
		padding: 8px;
		box-sizing: border-box;
		& > li {
			font-family: PingFang SC;
			font-size: 16px;
			line-height: 16px;
			color: #00CBF4;
			text-align: left;
			&:nth-child(1){
				width: 104px;
			}
			&:nth-child(2){
				width: 114px;
			}
			&:nth-child(3){
				width: 80px;
			}
			&:nth-child(4){
				width: 120px;
			}
			&:nth-child(5){
				width: 56px;
			}
		}
	}
	&__content {
		margin-top: 9px;
		height: 152px;

		&__seamless-warp{
			height: 152px;
			overflow: hidden;
		}
		&__row {
			width: 480px;
			height: 24px;
			display: flex;
			align-items: center;
			padding: 4px 8px;
			box-sizing: border-box;
			margin-top: 16px;
			& > li {
				text-align: left;
				font-family: PingFang SC;
				font-size: 16px;
				line-height: 16px;
				color: #FFFFFF;
				&:nth-child(1){
					width: 104px;
					color: rgba(255, 255, 255, 0.6);
				}
				&:nth-child(2){
					width: 114px;
				}
				&:nth-child(3){
					width: 80px;
				}
				&:nth-child(4){
					width: 120px;
				}
				&:nth-child(5){
					width: 56px;
					color: #FF7217;
          &.active {
            color: #00FFCF;
          }
				}
			}
		}
	}
}
</style>

