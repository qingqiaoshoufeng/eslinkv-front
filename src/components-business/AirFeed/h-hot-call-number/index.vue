<template>
	<div class="h-hot-call-number widget-part" :style="styles" v-if="data">
		<video
			class="video"
			src="/static/images/serves/hot-call-number.webm"
			loop
			muted
			autoplay></video>
		<div class="h-hot-call-number__oncall">
			<div class="h-hot-call-number__oncall__num font-num">
				{{ data.onCall || 0}}
			</div>
			<div class="h-hot-call-number__oncall__desc">
				通话中
			</div>
		</div>
		<div class="h-hot-call-number__onwait">
			<div class="h-hot-call-number__onwait__num font-num">
				{{ data.onWait || 0}}
			</div>
			<div class="h-hot-call-number__onwait__desc font-num">
				等待中
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
		computed: {},
		created() {
			
			this.configValue = this.parseConfigValue(value);
		},
	}
</script>
<style lang="scss" scoped>
	.h-hot-call-number {
		.video {
      width: 100%;
      height: 100%;
    }

		.oncall-onwait-common {
			position: absolute;
			width: 90px;
			height: 64px;
			display: flex;
			flex-direction: column;
		}

		.num-common {
			font-weight: bold;
			font-size: 32px;
			line-height: 32px;
			color: #FFFFFF;
			margin-bottom: 8px;
		}

		.desc-common {
			font-size: 18px;
			line-height: 24px;
			color: #fff;
		}

		&__oncall {
			@extend .oncall-onwait-common;
			left: 240px;
			top: 45px;

			&__num {
				@extend .num-common;
				color: #00FFCF!important;
			}

			&__desc {
				@extend .desc-common;
			}
		}

		&__onwait {
			@extend .oncall-onwait-common;
			right: 36px;
			top: 45px;

			&__num {
				@extend .num-common;
				color: #FF7217 !important;
			}

			&__desc {
				@extend .desc-common;
			}

		}
	}
</style>

