<template>
	<div class="widget-part" :style="styles">
		<div class="context-box">
			<div class="context-iocn" v-if="data && data.isIocn">
				<img :src="`${data && data.isIocn}`"/>
			</div>
			<div class="tip-context-box">
				<div class="context-value font-num">
					<div>{{ data && data.value }}</div>
				</div>
				<div class="context-desc">
					<div>{{ data && data.desc }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';

	const config = {animation: true};
	const value = {
		api: {
			data: JSON.stringify({
				isIocn: '/static/images/project/tip-qizhong.svg',
				desc:  '标题',
				value:  24,
			}),
		},
	};
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource();
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss">
	.context-box {
		height: 100%;
		width: 100%;
		display: flex;

		.context-desc {
			font-size: 20px;
			text-align: left;
			height: 60%;
			line-height: 40%;
		}

		.context-value {
			font-size: 20px;
			text-align: left;
			height: 40%;
			line-height: 40%;
		}

		.context-iocn {
			width: 72px;
			height: 72px;
			position: relative;

			img {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.tip-context-box {
			flex: 1;
			color: #fff;
			display: flex;
			flex-direction: column;

			.context-value {
				width: 100%;
				position: relative;
				// height: 100%;
				div {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translate(0, -50%);
				}
			}

			.context-desc {
				width: 100%;
				position: relative;

				div {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translate(0, -50%);
					font-family: PingFang SC;
				}
			}
		}
	}
</style>

