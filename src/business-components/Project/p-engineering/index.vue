
<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="engineering-box">
			<video
				src="/static/images/project/engineering.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
			></video>
			<div class="engineering-value font-num">
				{{ data && data.value }}
			</div>
			<div class="engineering-desc">
				{{ config.config && config.config.desc }}
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { getInput } from '../../../../lib';

const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
		},
	},
};

const config = {
	animation: true,
	config: {
		desc: true,
	},
};
const value = {
	api: {
		data: JSON.stringify({
			value: 652,
		}),
	},
	config: {
		desc: '无安全事故（天）',
	},
};
export default {
	mixins: [mixins],
	methods: {},
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss">
.engineering-box {
	height: 150px;
	width: 340px;
	position: relative;
	video::-webkit-media-controls {
		display: none !important;
	}
	.engineering-value {
		height: 150px;
		width: 150px;
		line-height: 150px;
		text-align: center;
		position: absolute;
		left: 0;
		top: 0;
		font-size: 48px;
		color: #fff;
	}
	.engineering-desc {
		font-family: PingFang SC;
		font-style: normal;
		font-weight: normal;
		font-size: 20px;
		height: 150px;
		line-height: 150px;
		position: absolute;
		left: 170px;
		top: 0;
		color: #fff;
	}
}
</style>

