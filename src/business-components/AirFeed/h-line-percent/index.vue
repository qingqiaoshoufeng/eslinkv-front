<template>
	<div class="h-line-percent" :style="styles">
		<div class="h-line-percent__NO" :style="{background: data && data.NOBg}">{{data && data.NO}}</div>
		<div class="h-line-percent__right">
			<div class="h-line-percent__right__top">
				<div class="h-line-percent__right__top__name">
					{{data && data.name}}
				</div>
				<div class="h-line-percent__right__top__amount">
					{{data && data.amount}}
				</div>
			</div>
			<div class="h-line-percent__right__bottom">
				<div
				class="h-line-percent__right__bottom__ruler"
				:style="{
					background: data && data.rulerBg,
					width: rulerWidth
				}">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	const config = {}
	const value = {
		api: {
			data: JSONStringify({
				NO: '01',
				name: '开户',
				amount: 4500,
				NOBg: '#FF7217',
				rulerBg: 'linear-gradient(270deg, #FF7217 0%, rgba(255, 114, 23, 0) 100%)'
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {

		},
		computed: {
			rulerWidth(){
				// 根据视觉稿来的
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
.h-line-percent {
	display: flex;
	&__NO {
		display: flex;
		width: 24px;
		height: 28px;
		justify-content: center;
		align-items: center;
	}
	&__right {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		width: 440px;
		&__top {
			display: flex;
			justify-content: space-between;
			&__name {
				font-family: PingFang SC;
				font-size: 16px;
				line-height: 16px;
				color: #FFFFFF;
			}
			&__amount {
				font-family: PingFang SC;
				font-size: 16px;
				line-height: 16px;
				color: #FFFFFF;
			}
		}
		&__bottom {
			position: relative;
			margin-top: 8px;
			width: 440px;
			height: 4px;
			z-index: -1;
			background: rgba(255, 255, 255, 0.1);
			&__ruler {
				position: absolute;
				height: 4px;
			}
		}

	}
}
</style>

