<template>
	<div class="widget-part h-project-1-wrapper" :style="styles" v-if="data">
		<div class="h-project-1 pos-r">
			<ul class="h-project-1-icon pos-a fn-flex flex-row">
				<li v-for="(item ,index) in icon" :key="index"/>
			</ul>
			<div class="h-project-1-ratio pos-a" :style="{width:`${ratio}%`}"></div>
		</div>
		<div
			class="step8-info"
			v-if="data.value.step8 && data.value.step8.content"
			@click="isShowContent = true"
			:class="{ active: isShowContent }"
		>
			<span>{{ data.value.step8.title }} ></span>
		</div>
		<div class="step8-info-content" v-if="isShowContent">
			<img src="./img/close.svg" class="step8-info-content-close" @click="isShowContent = false">
			<p>{{ data.value.step8.content }}</p>
		</div>

		<step1 v-bind="data.value" class="h-project-1-step-box pos-a h-project-1-step-box-bottom"/>
		<step2
			v-if="data.step >= 2"
			v-bind="data.value"
			class="h-project-1-step-box pos-a"
			:class="'h-project-1-step-box-top'"
			:step="data.step"
			:left="ratio2"
		/>
		<step3
			v-if="data.step >= 3"
			v-bind="data.value"
			class="h-project-1-step-box pos-a"
			:class="'h-project-1-step-box-top'"
			:step="data.step"
			:left="ratio3"
		/>
		<step4
			v-if="data.step >= 4"
			v-bind="data.value"
			class="h-project-1-step-box pos-a h-project-1-step-box-bottom"
			:step="data.step"
			:left="ratio4"
		/>
		<step5
			v-if="data.step >= 5"
			v-bind="data.value"
			class="h-project-1-step-box pos-a"
			:class="data.step === 5 ? 'h-project-1-step-box-bottom' : 'h-project-1-step-box-top'"
			:step="data.step"
			:left="ratio5"
		/>
		<step6
			v-if="data.step === 6"
			v-bind="data.value"
			class="h-project-1-step-box pos-a h-project-1-step-box-bottom"
			:step="data.step"
			:left="ratio6"
		/>
		<step8
			v-if="data.step >= 8"
			v-bind="data.value"
			class="h-project-1-step-box pos-a h-project-1-step-box-top"
			:left="ratioEnd"
		/>
		<hswiper :step="data.step"/>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import step1 from './step-1'
	import step2 from './step-2'
	import step3 from './step-3'
	import step4 from './step-4'
	import step5 from './step-5'
	import step6 from './step-6'
	import step8 from './step-8'
	import hswiper from './h-swiper'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		components: {
			step1,
			step2,
			step3,
			step4,
			step5,
			step6,
			step8,
			hswiper
		},
		data () {
			return {
				isShowContent: false,
				icon: new Int8Array(80),
				ratioEnd: 89,
				ratioCenter: 50,
				ratioMin: 6
			}
		},
		computed: {
			ratio () {
				return 93
			},
			ratio2 () {
				if (this.data) {
					if (this.data.step === 2) {
						return this.ratioEnd
					} else if (this.data.step === 3) {
						return this.ratioCenter
					} else {
						const current =
							this.data.value.step2.time - this.data.value.step1.time
						const total =
							this.data.value.step3.time - this.data.value.step1.time
						let diff = current / total
						if (current / total > 0.7) {
							diff = 0.5
						}
						if (this.ratio3 * diff < this.ratioMin) {
							return this.ratioMin
						}
						return this.ratio3 * diff
					}
				}
				return '0'
			},
			ratio3 () {
				if (this.data) {
					if (this.data.step === 3) {
						return this.ratioEnd
					} else if (this.data.step === 4) {
						return this.ratioCenter
					} else {
						const current =
							this.data.value.step3.time - this.data.value.step1.time
						const total =
							this.data.value.step4.time - this.data.value.step1.time
						let diff = current / total
						if (current / total > 0.7) {
							diff = 0.7
						}
						if (current / total < 0.4) {
							diff = 0.4
						}
						if (this.ratio4 * diff < this.ratioMin * 2) {
							return this.ratioMin * 2
						}
						return this.ratio4 * diff
					}
				}
				return 0
			},
			ratio4 () {
				if (this.data) {
					if (this.data.step === 4) {
						return this.ratioEnd
					} else if (this.data.step === 5) {
						return this.ratioCenter
					} else {
						const current =
							this.data.value.step4.time - this.data.value.step1.time
						const total =
							this.data.value.step5.time - this.data.value.step1.time
						let diff = current / total
						if (current / total > 0.7) {
							diff = 0.7
						}
						if (this.ratio5 * diff < this.ratioMin * 3) {
							return this.ratioMin * 3
						}
						return this.ratio5 * diff
					}
				}
				return 0
			},
			ratio5 () {
				if (this.data) {
					if (this.data.step === 5) {
						return this.ratioEnd
					} else if (this.data.step === 6) {
						return this.ratioCenter
					} else {
						const current =
							this.data.value.step5.time - this.data.value.step1.time
						const total =
							this.data.value.step8.time - this.data.value.step1.time
						let diff = current / total
						if (current / total > 0.7) {
							diff = 0.7
						}
						if (this.ratio6 * diff < this.ratioMin * 4) {
							return this.ratioMin * 4
						}
						return this.ratio6 * diff
					}
				}
				return 0
			},
			ratio6 () {
				if (this.data) {
					if (this.data.step === 6) {
						return this.ratioEnd
					} else if (this.data.step === 7) {
						return this.ratioCenter
					} else {
						const current =
							this.data.value.step5.time - this.data.value.step1.time
						const total =
							this.data.value.step8.time - this.data.value.step1.time
						let diff = current / total
						if (current / total > 0.7) {
							diff = 0.7
						}
						if (100 * diff < this.ratioMin * 5) return this.ratioMin * 5
						return diff * 100
					}
				}
				return 0
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">
	.h-project-1-step-box-bottom {
		h2 {
			top: 56px;
		}

		h3 {
			top: 90px;
		}
	}

	.h-project-1-step-box-top {
		h2 {
			top: -34px;
		}

		h3 {
			top: -66px;
		}
	}

	.h-project-1-step-box {
		top: 168px;

		h2,
		h3 {
			left: 50%;
			font-size: 24px;
			font-weight: normal;
			line-height: 24px;
			white-space: nowrap;
			transform: translateX(-50%);
		}

		h2 {
			color: #0df;
		}

		h3 {
			color: #feffff;
		}
	}

	.h-project-1-step-icon {
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: #001f6d;
		border: 1px solid #0df;
		border-radius: 100px;
	}

	.h-project-1 {
		top: 186px;
		width: 965px;
		height: 12px;
		overflow: hidden;
		background: #043697;
		border: 1px solid #0066af;
		border-radius: 6px;
	}

	.h-project-1-icon {
		top: 0;
		left: -5px;

		li {
			width: 4px;
			height: 10px;
			margin-left: 8px;
			background: rgba(0, 34, 118, 0.8);
			transform: skewX(-45deg);
		}
	}

	.h-project-1-ratio {
		top: 0;
		left: 0;
		height: 10px;
		background: linear-gradient(270deg, #00ffcf 0%, rgba(0, 255, 207, 0) 100%);
	}

	.h-project-1-wrapper {
		.step8-info {
			position: absolute;
			top: 20px;
			right: 5px;
			box-sizing: border-box;
			padding: 4px 8px;
			font-size: 18px;
			color: #fff;
			cursor: pointer;
			background: #001a77;
			border: 1px solid #0df;
			border-radius: 16px;

			&.active,
			&:hover {
				background: #0057a9;
			}
		}

		.step8-info-content {
			position: absolute;
			top: -20px;
			right: -380px;
			overflow: auto;
			text-align: right;

			p {
				width: 380px;
				height: 280px;
				padding: 16px;
				font-size: 18px;
				color: #fff;
				text-align: left;
				background: #001a77;
				border: 1px solid #0df;

				&::-webkit-scrollbar {
					/* 滚动条整体样式 */
					width: 10px; /* 高宽分别对应横竖滚动条的尺寸 */
					height: 1px;
				}

				&::-webkit-scrollbar-thumb {
					/* 滚动条里面小方块 */
					background: #0df;
				}

				&::-webkit-scrollbar-track {
					/* 滚动条里面轨道 */
					background: rgba(255, 255, 255, 0.4);
				}
			}

			.step8-info-content-close {
				width: 24px;
				height: 24px;
				margin-bottom: 8px;
				cursor: pointer;
			}
		}
	}
</style>
