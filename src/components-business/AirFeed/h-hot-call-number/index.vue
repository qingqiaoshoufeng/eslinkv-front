<template>
	<div class="h-hot-call-number widget-part" :style="styles" v-if="data">
		<video
			class="video"
			src="/static/images/serves/hot-call-number.webm"
			loop
			muted
			autoplay
		></video>
		<div class="h-hot-call-number__oncall">
			<div class="h-hot-call-number__oncall__num font-num">
				{{ data.onCall || 0 }}
			</div>
			<div class="h-hot-call-number__oncall__desc">
				通话中
			</div>
		</div>
		<div class="h-hot-call-number__onwait">
			<div class="h-hot-call-number__onwait__num font-num">
				{{ data.onWait || 0 }}
			</div>
			<div class="h-hot-call-number__onwait__desc font-num">
				等待中
			</div>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		methods: {},
		computed: {},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
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
			display: flex;
			flex-direction: column;
			width: 90px;
			height: 64px;
		}

		.num-common {
			margin-bottom: 8px;
			font-size: 32px;
			font-weight: bold;
			line-height: 32px;
			color: #fff;
		}

		.desc-common {
			font-size: 18px;
			line-height: 24px;
			color: #fff;
		}

		&__oncall {
			@extend .oncall-onwait-common;

			top: 45px;
			left: 240px;

			&__num {
				@extend .num-common;

				color: #00ffcf !important;
			}

			&__desc {
				@extend .desc-common;
			}
		}

		&__onwait {
			@extend .oncall-onwait-common;

			top: 45px;
			right: 36px;

			&__num {
				@extend .num-common;

				color: #ff7217 !important;
			}

			&__desc {
				@extend .desc-common;
			}
		}
	}
</style>

