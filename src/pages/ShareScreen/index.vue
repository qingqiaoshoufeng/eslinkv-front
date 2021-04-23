<template lang="pug">
.detail-container
	.pwd-container(v-if="maskShow")
		.pwd-box(v-if="shareType === 'PASSWORD'")
			.pwd-title 已打开密码保护，请输入密码
			.pwd-main
				i-input.pwd(v-model="pwd", type="password", style="margin-right: 10px")
				i-button(type="primary", @click="unlock") 确定
		.time(v-if="shareType === 'TIME'")
			template(v-if="!isOvertime")
				vue-countdown(
					:time="leftTime",
					v-slot="{ days, hours, minutes, seconds }",
					@end="timeEnd")
					.time-left 剩余：{{ `${days}天${hours}小时${minutes}分${seconds}秒` }}
				i-button(
					type="primary",
					@click="maskShow = false",
					style="margin-top: 10px") 点击进入
			template(v-else)
				span 分享时效已过，请联系你的分享者
	.preview-wrapper.fit-mode(
		v-if="!maskShow",
		ref="kanboardWrapper",
		:class="{ mobile: isMobile }",
		:style="{ backgroundColor: platform.panelConfig.background.color, backgroundRepeat: platform.panelConfig.background.repeat, backgroundSize: platform.panelConfig.background.size, backgroundPosition: platform.panelConfig.background.position, backgroundImage: `url(${platform.panelConfig.background.url})` }")
		.mobile-wrap(:style="{ height: mobileWrapHeight + 'px' }", v-if="isMobile")
			d-view(@mounted="updateSize", ref="previewContainer", :style="viewStyle")
		d-view(
			@mounted="updateSize",
			ref="previewContainer",
			v-else,
			:style="viewStyle")
	d-detail(:show="false", ref="dDetail")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { dView, platform } from 'eslinkv-sdk'
import { getQueryString } from '../../utils'
import { Input, Button } from 'view-design'
import VueCountdown from '@chenfengyuan/vue-countdown'
import dDetail from '../../components/d-detail/index.vue'
let shareInfo: any

@Component({
	components: {
		'i-input': Input,
		'i-button': Button,
		VueCountdown,
		dView,
		dDetail,
	},
})
export default class detail extends Vue {
	platform = platform.state
	isMobile = /android|iphone/i.test(navigator.userAgent)
	mobileWrapHeight = 0
	scaleY = 1
	scaleX = 0
	actualScaleRatio = 1
	maskShow = true
	isOvertime = false
	pwd = ''
	shareType = ''
	leftTime: number | string = ''

	get viewStyle() {
		let scale
		if (getQueryString('layoutMode') === 'full-size') {
			scale = `${this.scaleX},${this.scaleY}`
		} else {
			scale = this.actualScaleRatio
		}
		return `transform: scale(${scale}) translate3d(0, 0, 0); overflow: hidden;`
	}

	updateSize(val) {
		const w = val.width.replace(/(.*)px/, '$1')
		const h = val.height.replace(/(.*)px/, '$1')
		const { clientWidth, clientHeight } = document.body

		const layoutMode = getQueryString('layoutMode')
		switch (layoutMode) {
			case 'full-size':
				this.scaleX = clientWidth / w
				this.scaleY = clientHeight / h
				break
			case 'full-width':
				this.actualScaleRatio = clientWidth / w
				break
			case 'full-height':
				this.actualScaleRatio = clientHeight / h
				break
			default:
				this.actualScaleRatio = this.isMobile
					? clientWidth / w
					: Math.min(clientWidth / w, clientHeight / h)
		}
		this.mobileWrapHeight = h * this.actualScaleRatio
	}

	timeEnd() {
		this.isOvertime = true
	}

	async unlock() {
		if (!this.pwd) return
		const res = await this.$api.screenShare.screenShareLogin({
			screenId: this.$route.params.shareScreenId,
			screenSharePassword: this.pwd,
		})
		this.maskShow = false
		;(this.$refs.dDetail as any).renderByDetail(res)
	}

	async mounted() {
		shareInfo = await this.$api.screenShare.screenShareUse({
			screenId: this.$route.params.shareScreenId,
		})
		this.shareType = shareInfo.screenShareType
		if (this.shareType === 'ALL') {
			this.maskShow = false
			;(this.$refs.dDetail as any).renderByDetail(shareInfo)
		}
		if (this.shareType === 'TIME') {
			this.leftTime =
				new Date(shareInfo.screenShareTime).getTime() -
				new Date().getTime()
			this.isOvertime = this.leftTime <= 0
			!this.isOvertime &&
				(this.$refs.dDetail as any).renderByDetail(shareInfo)
		}
	}
}
</script>
<style lang="scss" scoped>
.detail-container {
	height: 100%;
}

.preview-wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99999;
	display: flex;

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	#kanban {
		position: relative;
		flex-grow: 0;
		flex-shrink: 0;
	}

	&.fit-mode {
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	&.mobile {
		align-items: unset;
		overflow: auto;

		#kanban {
			transform-origin: 0 0;
		}
	}

	.mobile-wrap {
		position: relative;
		width: 100%;
		overflow: hidden;
	}
}

.pwd-container {
	height: 100%;
	background: rgb(49, 50, 57);
	.pwd-box {
		width: 330px;
		margin: 0 auto;
		padding-top: 100px;
		.pwd-title {
			margin-bottom: 8px;
			font-size: 12px;
			color: #fff;
		}
		.pwd-main {
			display: flex;
			justify-content: space-between;
		}
	}
}

.time {
	text-align: center;
	padding-top: 100px;
	color: #fff;
	font-size: 18px;
}
</style>
