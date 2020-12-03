<template>
	<div class="widget-part" :style="styles">
		<ul class="title">
			<li></li>
			<li>标题</li>
			<li>浏览</li>
			<li>收藏</li>
			<li>分享</li>
		</ul>
		<div class="content" v-if="data">
			<vue-seamless-scroll
				:data="data.list || []"
				class="content__seamless-warp1"
				:class-option="classOption"
			>
				<ul
					class="content__row1"
					v-for="(k, index) in data.list"
					:key="index"
				>
					<li class="font-num">0{{ index + 1 }}</li>
					<li>{{ k.v1 }}</li>
					<li>{{ k.v2 | toThousand }}</li>
					<li>{{ k.v3 | toThousand }}</li>
					<li>{{ k.v4 | toThousand }}</li>
				</ul>
			</vue-seamless-scroll>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import VueSeamLess from 'vue-seamless-scroll';

	const config = {animation: true};
	const value = {
		api: {
			data: JSON.stringify({
				list: [
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					}
				]
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
			height: 32px;
			background: rgba(23, 123, 255, 0.2);
			display: flex;
			align-items: center;
			box-sizing: border-box;

			& > li {
				font-family: PingFang SC;
				font-size: 18px;
				line-height: 24px;
				color: #00CBF4;
        padding-left: 8px;
				text-align: left;

				&:nth-child(1) {
          margin-right: 8px;
          width: 24px;
          height: 24px;
				}

				&:nth-child(2) {
					width: 240px;
				}

				&:nth-child(3) {
					width: 90px;
				}

				&:nth-child(4) {
					width: 65px;
				}

				&:nth-child(5) {
					flex: 1;
				}
			}
		}

		.content {
			height: 170px;

			&__seamless-warp1 {
				height: 170px;
				overflow: hidden;
			}

			&__row1 {
				height: 32px;
				display: flex;
				align-items: center;
				padding-left: 8px;
				box-sizing: border-box;

        &:first-child>li:first-child{
          background: #FF7217;
        }
				& > li {
					text-align: left;
					font-family: PingFang SC;
					font-size: 18px;
					line-height: 24px;
					color: #FFFFFF;

          &:nth-child(1) {
            width: 24px;
            height: 24px;
            background: #0057A9;
            font-weight: bold;
            text-align: center;
            margin-right: 8px;
          }

          &:nth-child(2) {
            width: 240px;
          }

          &:nth-child(3) {
            width: 90px;
          }

          &:nth-child(4) {
            width: 65px;
          }

          &:nth-child(5) {
            flex: 1;
          }
				}
			}
		}
	}
</style>

