<template>
	<div
		class="widget-part"
		:style="styles"
		v-if="data"
		ref="img"
	>
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">杭燃供气</div>
			<img src="/static/icons/right-icon.svg">
		</section>
		<div class="container" style="padding-bottom: 10px;">
			<section class="total">
				<img src="./img/air-bar.svg" class="total-icon">
				<div class="total-info">
					<div class="total-title">年度累计供气量</div>
					<div class="num font-num">{{ data.total | toThousand }} <span>m³</span></div>
				</div>
			</section>
			<ul class="air">
				<li class="li">
					<div class="air-name">门站</div>
					<div>
						<span class="air-num font-num">{{ data.air.shop | toThousand }}</span>
						<span class="air-unit">座</span>
					</div>
				</li>
				<li class="li">
					<div class="air-name">高压管线</div>
					<div>
						<span class="air-num font-num">{{ data.air.highPipeline / 1000  | toThousand }}</span>
						<span class="air-unit">km</span>
					</div>
				</li>
				<li class="li">
					<div class="air-name">高中压调压站</div>
					<div>
						<span class="air-num font-num">{{ data.air.pressureStation | toThousand }}</span>
						<span class="air-unit">个</span>
					</div>
				</li>
				<li class="li">
					<div class="air-name">中压管线</div>
					<div>
						<span class="air-num font-num">{{ data.air.mediumPipeline / 1000  | toThousand }}</span>
						<span class="air-unit">km</span>
					</div>
				</li>
				<li class="li">
					<div class="air-name">应急气源站</div>
					<div>
						<span class="air-num font-num">{{ data.air.gasStation | toThousand }}</span>
						<span class="air-unit">座</span>
					</div>
				</li>
				<li class="li">
					<div class="air-name">低压管线</div>
					<div>
						<span class="air-num font-num">{{ data.air.lowPipeline / 1000 | toThousand }}</span>
						<span class="air-unit">km</span>
					</div>
				</li>
				<li class="li">
					<div class="air-name">调压器</div>
					<div>
						<span class="air-num font-num">{{ data.air.voltageRegulator | toThousand }}</span>
						<span class="air-unit">个</span>
					</div>
				</li>
			</ul>
		</div>
		<section class="title">
			<img src="/static/icons/left-icon.svg">
			<div class="title-txt">杭燃服务</div>
			<img src="/static/icons/right-icon.svg">
		</section>

		<div class="container">
			<section class="service">
				<ul>
					<li class="li">
						<div class="air-name">居民户</div>
						<div>
							<span class="air-num font-num">{{ data.service.household | toThousand }}</span>
							<span class="air-unit">户</span>
						</div>
					</li>
					<li class="li">
						<div class="air-name">公建用户</div>
						<div>
							<span class="air-num font-num">{{ data.service.publicUsers | toThousand }}</span>
							<span class="air-unit">户</span>
						</div>
					</li>
					<li class="li">
						<div class="air-name">工业用户</div>
						<div>
							<span class="air-num font-num">{{ data.service.industrialUsers | toThousand }}</span>
							<span class="air-unit">户</span>
						</div>
					</li>
					<li class="li">
						<div class="air-name">在用钢瓶用户</div>
						<div>
							<span class="air-num font-num">{{ data.service.inUseUsers | toThousand }}</span>
							<span class="air-unit">户</span>
						</div>
					</li>
					<li class="li">
						<div class="air-name">在册钢瓶用户</div>
						<div>
							<span class="air-num font-num">{{ data.service.registeredUsers | toThousand }}</span>
							<span class="air-unit">户</span>
						</div>
					</li>
				</ul>
				<div class="standard">
					<img src="./img/standard.svg">
					<p>
						一个工作日<br>
						0份资料容缺受理<br>
						受理通气两个环节
					</p>
				</div>
			</section>
			<section class="links">
				<div class="link" :class="{active: animateActiveIndex === 0}">最多跑<br/>一次</div>
				<div class="link" :class="{active: animateActiveIndex === 1}">三社联动<br/>安心安居</div>
				<div class="link" :class="{active: animateActiveIndex === 2}">31个<br/>服务网点</div>
				<div class="link" :class="{active: animateActiveIndex === 3}">网上19<br/>营业厅</div>
				<div class="link" :class="{active: animateActiveIndex === 4}">杭燃码</div>
			</section>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		created () {
			this.configValue = this.parseConfigValue(value)
		},
		mounted () {
			this.animateTimer = setInterval(() => {
				if (this.animateActiveIndex < 4) {
					this.animateActiveIndex = this.animateActiveIndex + 1
				} else {
					this.animateActiveIndex = 0
				}
			}, 1000)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		padding-top: 40px;
		transition: all 0.5s;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		background: rgba(0, 87, 169, 0.5);
		border: 1px solid #0df;

		.title-txt {
			margin: 0 8px;
			font-size: 32px;
			font-weight: 600;
			line-height: 32px;
			color: #fff;
		}
	}

	.container {
		padding: 30px 30px 20px;
		margin-bottom: 32px;
		background: #011b79;
		border: 1px solid #0df;
		border-top-width: 0;
	}

	.total {
		display: flex;
		align-items: center;
		margin-bottom: 30px;

		.total-info {
			margin-left: 16px;
			text-align: left;

			.total-title {
				font-size: 24px;
				font-weight: 600;
				line-height: 24px;
				color: #5ee2fd;
			}

			.num {
				margin-top: 16px;
				font-size: 48px;
				font-weight: bold;
				line-height: 48px;
				color: #fff;

				span {
					font-size: 24px;
					font-weight: normal;
					line-height: 24px;
					color: #fff;
				}
			}
		}
	}

	.air {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 494px;
	}

	.li {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 232px;
		padding-bottom: 8px;
		margin-bottom: 20px;
		white-space: nowrap;
		border-bottom: 1px solid #0057a9;

		&::before {
			position: absolute;
			bottom: -1.5px;
			left: 0;
			display: block;
			width: 3px;
			height: 3px;
			content: '';
			background: #0df;
		}

		&::after {
			position: absolute;
			right: 0;
			bottom: -1.5px;
			display: block;
			width: 3px;
			height: 3px;
			content: '';
			background: #0df;
		}

		.air-name {
			font-size: 20px;
			line-height: 20px;
			color: #5ee2fd;
		}

		.air-num {
			font-size: 32px;
			font-weight: bold;
			line-height: 32px;
			color: #fff;
		}

		.air-unit {
			margin-left: 4px;
			font-size: 20px;
			line-height: 20px;
			color: #fff;
		}
	}

	.service {
		display: flex;
		align-items: center;

		.li {
			width: 336px;
			margin-right: 48px;
			margin-bottom: 9px;
		}

		.standard {
			img {
				width: 144px;
				height: 130px;
			}

			p {
				margin-top: 4px;
				font-size: 16px;
				line-height: 22px;
				color: #5ee2fd;
				text-align: center;
			}
		}
	}

	.links {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.link {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80px;
			height: 80px;
			font-size: 20px;
			line-height: 24px;
			color: #fff;
			background-color: rgba(0, 87, 169, 0.5);
			background-image: url("./img/link-bg.svg");
			background-repeat: no-repeat;
			background-size: 0;
			border-radius: 50%;
			transition: all 0.3s;

			&.active {
				background-size: 100% 100%;
			}
		}
	}
</style>

