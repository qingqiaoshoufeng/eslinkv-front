<template>
	<div class="h-table-status widget-part" :style="styles">
		<ul class="h-table-status__title" >
			<li>时间</li>
			<li>渠道</li>
			<li>业务类型</li>
			<li>客户</li>
			<li>状态</li>
		</ul>
		<div
			class="h-table-status__content"
			v-if="!!data">
			<ul
				class="h-table-status__content__row"
				v-for="(item, index) in data"
				:key="index">
				<li>{{item.time || ''}}</li>
				<li>{{item.channel || ''}}</li>
				<li>{{item.businessType || ''}}</li>
				<li>{{item.customer || ''}}</li>
				<li>{{item.statusDesc || ''}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	const config = {}
	const value = {
		api: {
			data: JSONStringify([
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '已派工'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '已派工'
				},
				{
					time: '06/03 09:11',
					channel: '在线客服',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '已派工'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '已派工'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李的萌萌',
					statusDesc: '已派工'
				},
				{
					time: '06/03 09:11',
					channel: '热线',
					businessType: '报装',
					customer: '李萌萌',
					statusDesc: '已派工'
				}
			])
		}
	}
	export default {
		mixins: [mixins],
		methods: {

		},
		computed: {
			rulerWidth(){
				// 比例根据视觉稿来的
				const rate =  388 / 4500;
				return (this?.data?.amount * rate ?? 0 ) + 'px';
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
				width: 80px;
			}
			&:nth-child(3){
				width: 144px;
			}
			&:nth-child(4){
				width: 88px;
			}
			&:nth-child(5){
				width: 56px;
			}
		}
	}
	&__content {
		margin-top: 17px;
		height: 152px;
		overflow-y: auto;
		overflow-x: hidden;
		&__row {
			width: 480px;
			height: 24px;
			display: flex;
			align-items: center;
			padding: 4px 8px;
			box-sizing: border-box;
			margin-top: 8px;
			&:nth-child(1){
				margin-top: 0;
			}
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
					width: 80px;
				}
				&:nth-child(3){
					width: 144px;
				}
				&:nth-child(4){
					width: 88px;
				}
				&:nth-child(5){
					width: 56px;
					color: #00CBF4
				}
			}
		}
	}
}
</style>

