<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="flex">
			<img src="./img/notion.svg" alt="">
			<div class="row" :style="{transform: `translateY(${(1 - data.length) * 30}px)`}">
				<div class="item" v-for="(k, i) in data" :key="i">
					<marquee-text class="txt">
						{{ k.txt }}
					</marquee-text>
					<div class="time">{{ k.time }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import MarqueeText from 'vue-marquee-text-component'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		components: { MarqueeText },
		methods: {
			getMsg () {
				this.data.push({
					txt: '李先生上报亲亲家园小区发, 生燃气泄露事故冯方法。',
					time: '13:24:51'
				})
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		box-sizing: border-box;
		overflow: hidden;
		background: #001f6d;
		border: 1px solid #0df;
		border-radius: 20px;

		.flex {
			display: flex;
			align-items: center;
			height: 100%;
			padding: 0 8px;

			img {
				width: 21px;
				height: 17px;
				margin-right: 10px;
			}

			.row {
				flex: 1;
				height: 100%;
				transition: all 0.4s;

				.item {
					display: flex;
					align-items: center;
					height: 100%;
				}
			}

			.txt {
				width: 342px;
				overflow: hidden;
				font-size: 18px;
				color: #fff;
				text-align: left;
			}

			.time {
				flex: 1;
				font-size: 18px;
				color: rgba(255, 255, 255, 0.75);
				text-align: right;
			}
		}
	}
</style>

