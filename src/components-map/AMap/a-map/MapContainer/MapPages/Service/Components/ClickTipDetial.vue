	<!-- 点击展示单个详情 -->
<template>
	<div class="TipDetial">
		<div class="companyName">{{ data.name || data.address }}</div>
		<div class="detial_info_list">
			<div
				class="item"
				v-for="(item, index) in data.detailList || []"
				:key="index"
			>
				<span class="index">{{ index + 1 }}</span>
				<span class="label">{{ `${item.name}联码数` }}</span>
				<span class="value" v-show="item.value">{{
					`${item.value && item.value.toLocaleString()}户`
				}}</span>
			</div>
		</div>
		<div class="btn" v-if="isShowMore" @click="handleViewDetail()">
			查看详情
		</div>
	</div>
</template>
<script>
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
				const a = 111
				a.toLocale
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
		font-style: normal;
		font-weight: normal;
		line-height: 24px;
		color: #ffd200;
	}

	.accept,
	.complete,
	.percentage {
		font-size: 24px;
		font-style: normal;
		font-weight: normal;
		line-height: 32px;

		/* or 133% */
		color: #fff;
	}

	.detial_info_list {
		width: 500px;
		margin-top: 16px;

		.item {
			display: inline-block;
			width: 90%;
			min-width: 50%;
			font-size: 24px;
			font-style: normal;
			font-weight: normal;
			line-height: 32px;

			/* or 133% */
			color: #fff;

			.index {
				display: inline-block;
				width: 24px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				background: #0057a9;
			}

			.label {
				margin-left: 7px;
				color: #fff;
			}

			.value {
				float: right;
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

