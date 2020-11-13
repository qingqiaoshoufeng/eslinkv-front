<template>
	<div class="widget-part" :style="styles">
		<div class="context-box">
			<div class="context-iocn" v-if="computedData && data.isIocn">
				<img
					:src="`/static/images/project/tip-${
						computedData && computedData.isIocn
					}.svg`"
				/>
			</div>
			<div class="tip-context-box">
				<div
					class="context-value font-num"
					:style="computedData && computedData.value.style"
				>
					<div>{{ computedData && computedData.value.context }}</div>
				</div>
				<div
					class="context-desc"
					:style="computedData && computedData.desc.style"
				>
					<div>{{ computedData && computedData.desc.context }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			isIocn: 'qizhong',
			desc: {
				context: '标题',
			},
			value: {
				context: 24,
			},
		}),
	},
};
export default {
	mixins: [mixins],
	computed: {
		computedData() {
			if (!this.data) return;
			this.data.desc.style = {
				fontSize: '20px',
				textAlign: 'left',
				height: '60%',
				lineHeight: '40%',
			};
			this.data.value.style = {
				fontSize: '20px',
				textAlign: 'left',
				height: '40%',
				lineHeight: '40%',
			};
			return this.data;
		},
	},
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

