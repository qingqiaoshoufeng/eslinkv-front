
<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="accident-box">
            <div class="video-box">
                <video
				src="/static/images/serves/accident.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
			></video>
            </div>

			<div class="context">
				<div class="accident-value font-num">{{data&&data.value}}</div>
				<div class="accident-desc">{{data&&data.desc}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { config, value } from './index.component'

export default {
	mixins: [mixins],
	methods: {},
	created() {
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss">
.accident-box {
	height: 160px;
	width: 340px;
    display: flex;
    justify-content: center;
    align-items: center;
	video::-webkit-media-controls {
		display: none !important;
	}
	video {
        margin-left: 22px;
		height: 160px;
		width: 160px;
		flex: none;
	}
	.context {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left:50px ;
		.accident-value {
			text-align: left;
			font-size: 48px;
            color: #FF7217;
            padding-left: 8px;
		}
		.accident-desc {
            margin-top: 13px;
            width: 150px;
            height: 32px;
            line-height: 32px;
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
            color: #fff;
            text-align: center;
            background-color: #001F6D;
		}
	}
}
</style>

