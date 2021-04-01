<template>
	<div class="widget-part" :style="styles">
		<div class="context-box">
			<div class="context-icon" v-if="computeData && computeData.isIcon">
				<img :src="computeData && computeData.isIcon"/>
			</div>
			<div class="tip-context-box">
				<div
					class="context-value font-num"
					:style="computeData && computeData.value.style"
				>
					<div>{{ computeData && computeData.value.context }}</div>
				</div>
				<div
					class="context-desc"
					:style="computeData && computeData.desc.style"
				>
					<div>{{ computeData && computeData.desc.context }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [widgetMixin],
		computed: {
			computeData () {
				if (!this.data || !this.config.config) return
				this.data.isIcon = this.config.config.icon
				this.data.desc = {}
				this.data.desc.context = this.config.config.desc
				this.data.desc.style = {
					fontSize: '20px',
					textAlign: 'left',
					height: '60%',
					lineHeight: '40%'
				}
				this.data.value.style = {
					fontSize: '20px',
					textAlign: 'left',
					height: '40%',
					lineHeight: '40%'
				}
				return this.data
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss">
	.context-box {
		display: flex;
		width: 100%;
		height: 100%;

		.context-icon {
			position: relative;
			width: 72px;
			height: 72px;

			img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.tip-context-box {
			flex: 1;
			color: #fff;

			.context-desc {
				height: 60%;
				font-size: 20px;
				line-height: 40%;
				text-align: left;
			}

			.context-value {
				height: 40%;
				margin-top: 15px;
				font-size: 20px;
				line-height: 40%;
				text-align: left;
			}

			.context-iocn {
				position: relative;
				width: 72px;
				height: 72px;

				img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.tip-context-box {
				flex: 1;
				color: #fff;

				.context-value {
					position: relative;
					width: 100%;
					// height: 100%;
					div {
						position: absolute;
						top: 50%;
						left: 0;
						transform: translate(0, -50%);
					}
				}

				.context-desc {
					position: relative;
					width: 100%;

					div {
						position: absolute;
						top: 50%;
						left: 0;
						transform: translate(0, -50%);
					}
				}
			}
		}
	}
</style>
