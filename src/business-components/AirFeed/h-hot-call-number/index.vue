<template>
	<div class="h-hot-call-number widget-part" :style="styles">
		<video
			class="h-hot-call-number__bg"
			src="/static/images/hot-call-number.webm"
			loop
			autoplay></video>
		<div class="h-hot-call-number__oncall">
			<div class="h-hot-call-number__oncall__num font-num">
				{{ data && data.onCall || ''}}
			</div>
			<div class="h-hot-call-number__oncall__desc">
				通话中
			</div>
		</div>
		<div class="h-hot-call-number__onwait">
			<div class="h-hot-call-number__onwait__num font-num">
				{{ data && data.onWait || ''}}
			</div>
			<div class="h-hot-call-number__onwait__desc font-num">
				等待中
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				onCall: 32,
				onWait: 11
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {},
		computed: {},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	}
</script>
<style lang="scss">
	.h-hot-call-number {
		&__bg {
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
			left: 29px;
			top: 55px;

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
			right: 21px;
			top: 55px;

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

