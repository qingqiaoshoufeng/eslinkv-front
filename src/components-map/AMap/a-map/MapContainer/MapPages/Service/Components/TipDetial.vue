<template>
	<div class="TipDetial">
		<div class="companyName">
			<!-- 为了兼容不同页面展示的详情名称按此优先级处理 -->
			{{ data.name || data.context || data.address }}
		</div>
		<div class="detial_info_list">
			<div
				class="item"
				v-for="(item, index) in data.detailList || []"
				:key="index"
				v-show="detailInfo[item.prop]"
			>
				<span class="label">{{ `${item.label}: ` }}</span>
				<span class="value">{{
					`${
						(detailInfo[item.prop] &&
							detailInfo[item.prop] !== 0 &&
							isNumber(detailInfo[item.prop])
							? parseFloat(
								detailInfo[item.prop].toFixed(
									item.Fixed || 0
								)
							).toLocaleString()
							: detailInfo[item.prop] || 0) + item.DW
					} `
				}}</span>
			</div>
		</div>
		<div class="btn" v-if="isShowMore" @click="handleViewDetail()">
			查看详情
		</div>
	</div>
</template>
<script>
	import { isNumber } from 'highcharts'
	export default {
		name: 'TipDetial',
		props: {
			data: {
				Type: Object,
				default () {
					return {}
				}
			},
			detailInfo: {
				Type: Object,
				default () {
					return {}
				}
			},
			isShowMore: {
				Type: Boolean,
				default: false
			}
		},
		data () {
			return {}
		},
		methods: {
			handleViewDetail () {
				this.$emit('view-detail')
			},
			isNumber (val) {
				return typeof val === 'number' && !isNaN(val)
			}
		},
		mounted () {}
	}
</script>
<style lang="scss" scoped>
.TipDetial {
	display: flex;
	flex-direction: column;
	min-width: 300px;
	text-align: left;

	.companyName {
		font-size: 32px;
		// font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		line-height: 1.5em;
		color: #ffd200;
	}

	.accept,
	.complete,
	.percentage {
		font-size: 24px;
		// font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		line-height: 32px;

		/* or 133% */
		color: #fff;
	}

	.detial_info_list {
		// width: 450px;
		width: 100%;
		margin-top: 16px;

		.item {
			display: inline-block;
			min-width: 45%;
			font-size: 24px;
			// font-family: PingFang SC;
			font-style: normal;
			font-weight: normal;
			line-height: 32px;

			/* or 133% */
			color: #fff;

			.label {
				color: #fff;
			}

			.value {
				color: #ffd200;
			}
		}
	}

	.accept {
		margin-top: 16px;
	}

	.btn {
		display: inline-block;
		width: 80px;
		height: 32px;
		padding: 0 8px;
		margin-top: 16px;
		line-height: 32px;
		cursor: pointer;
		background: #0057a9;
		border-radius: 4px;

		&:hover {
			opacity: 0.8;
		}
	}
}
</style>

