<template>
	<div :class="['h-list-item', { 'h-list-item--actived': selected }]" :style="styles">
		<div class="h-list-item__notice">
			<em :class="`h-list-item__notice__info-icon h-list-item__notice__info-icon--${data.status}`"></em>
		</div>
		<div class="h-list-item__content">
			<div class="h-list-item__content__alarm">
				<div class="h-list-item__content__alarm__name">
					{{data.alarmName}}
				</div>
				<div class="h-list-item__content__alarm__type">
					{{data.alarmNameType}}
				</div>
			</div>
			<div class="h-list-item__content__alarm__location">
				{{data.alarmLocation}}
			</div>
		</div>
		<div class="h-list-item__status-desc">
			<div class="h-list-item__status-desc__time">
				{{data.time}}
			</div>
			<div :class="[
				'h-list-item__status-desc__result',
				`h-list-item__status-desc__result--${data.status}`
				]">
				{{data.statusDesc}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => ({
					status: 1,
					alarmName: '',
					alarmNameType: '',
					alarmLocation: '',
					time: '',
					statusDesc: '',
				})
			},
			selected: {
				type: Boolean,
				default: false
			}
		},
		computed: {

		},
		created() {

		},

	}
</script>
<style lang="scss">
.h-list-item{
	width: 480px;
	display: flex;
	padding: 20px 8px 19px;
	cursor: pointer;
	&--actived {
		background: rgba(23, 115, 201, 0.4);
	}
	&__notice{
		height: 60px;
		margin-right: 12px;
		&__info-icon{
			display: block;
			width: 24px;
			height: 24px;
			// 已处理/待处理 图标
			&--1 {
				background-image: url('/static/icons/air-feed-resolved.svg');
				background-size: 24px;
				background-repeat: no-repeat;
				background-position: center;
			}
			// 抢修中图标
			&--2 {
				background-image: url('/static/icons/air-feed-pending.svg');
				background-size: 24px;
				background-repeat: no-repeat;
				background-position: center;
			}
		}
	}

	&__content {
		height: 60px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		&__alarm {
			display: flex;
			align-items: center;
			&__name{
				font-size: 24px;
				line-height: 24px;
				color: #FEFFFF;
				text-align: left;
				margin-right: 8px;
			}
			&__type{
				background: #1A446C;
				border-radius: 4px;
				font-size: 16px;
				line-height: 16px;
				padding: 4px;
				color: rgba(255, 255, 255, 0.75);
			}
			&__location{
				font-size: 18px;
				line-height: 24px;
				color: rgba(255, 255, 255, 0.75);
				margin-top: 12px;

			}
		}
	}
	&__status-desc {
		display: flex;
		flex: 1;
		align-items: flex-end;
		flex-direction: column;
		&__time{
			font-size: 16px;
			line-height: 16px;
			color: #FFFFFF;
		}
		&__result{
			margin-top: 16px;
			font-size: 20px;
			line-height: 24px;
			position: relative;
			// 已处理/待处理 颜色
			&--1{
				color: #00DDFF;
				&::before{
					content: '';
					position: absolute;
					width: 8px;
					height: 8px;
					left: -16px;
					top: 50%;
					margin-top: -4px;
					background:#00DDFF;
					border-radius: 50%;

				}
			}
			// 抢修中 颜色
			&--2{
				color: #FF7217;;
				&::before{
					content: '';
					position: absolute;
					width: 8px;
					height: 8px;
					left: -16px;
					top: 50%;
					margin-top: -4px;
					background: #FF7217;;
					border-radius: 50%;

				}
			}
		}
	}

}


</style>

