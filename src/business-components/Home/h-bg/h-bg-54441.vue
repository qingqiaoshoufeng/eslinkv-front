<template>
	<div class="h-bg-54441 pos-a fn-flex flex-row">
		<transition name="flipInY">
			<box class="pos-a h-bg-54441-box1" title="五者" :content="content1" v-if="status5"/>
		</transition>
		<transition name="flipInY">
			<box class="pos-a h-bg-54441-box2" title="四大发展" :content="content2" v-if="status41"/>
		</transition>
		<transition name="flipInY">
			<box class="pos-a h-bg-54441-box3" title="四大战略" :content="content3" v-if="status42"/>
		</transition>
		<transition name="flipInY">
			<box class="pos-a h-bg-54441-box4" title="四大工程" :content="content4" v-if="status43"/>
		</transition>
		<transition name="flipInY">
			<box class="pos-a h-bg-54441-box5" title="第一方阵" :content="content5" v-if="status1"/>
		</transition>
		<div class="pos-a h-bg-54441-num-box">
			<transition name="slide-down">
				<div class="h-bg-54441-num-5 pos-a" v-if="status5"></div>
			</transition>
			<transition name="slide-down">
				<div class="h-bg-54441-num-4 h-bg-54441-num-41 pos-a" v-if="status41"></div>
			</transition>
			<transition name="slide-down">
				<div class="h-bg-54441-num-4 h-bg-54441-num-42 pos-a" v-if="status42"></div>
			</transition>
			<transition name="slide-down">
				<div class="h-bg-54441-num-4 h-bg-54441-num-43 pos-a" v-if="status43"></div>
			</transition>
			<transition name="slide-down">
				<div class="h-bg-54441-num-1 pos-a" v-if="status1"></div>
			</transition>
		</div>
		<div class="h-bg-54441-close pos-a pointer" @click="close"></div>
		<div class="h-bg-54441-close1 pos-a pointer" @click="close"></div>
	</div>
</template>
<script>
	import box from './h-bg-54441-box'

	export default {
		components: {
			box
		},
		data() {
			return {
				status5: false,
				status41: false,
				status42: false,
				status43: false,
				status1: false,
				content1: [
					'绿色发展的推进者',
					'城市安全的守护者',
					'温度生活的贡献者',
					'出彩人生的奋进者',
					'美好生活的共享者'
				],
				content2: [
					'安全发展',
					'创新发展',
					'绿色发展',
					'共享发展'
				],
				content3: [
					'全产业链战略',
					'客户第一战略',
					'文化兴企战略',
					'精益管理战略'
				],
				content4: [
					'民生工程',
					'绿色工程',
					'安全工程',
					'温暖工程'
				],
				content5: [
					'跨区域发展的',
					'全国第一方阵的',
					'公众企业'
				]
			}
		},
		props: {
			status: {
				type: Boolean,
				default: false
			},
			close: {
				type: Function
			}
		},
		mounted() {
			setTimeout(() => {
				this.status5 = true
			}, 100)
			setTimeout(() => {
				this.status41 = true
			}, 300)
			setTimeout(() => {
				this.status42 = true
			}, 500)
			setTimeout(() => {
				this.status43 = true
			}, 700)
			setTimeout(() => {
				this.status1 = true
			}, 900)
		}
	}
</script>
<style lang="scss">
	.flipInY-enter-active, .flipInY-leave-active {
		transition: all .5s;
	}

	.flipInY-enter, .flipInY-leave-to {
		transform: rotateY(180deg);
	}

	.h-bg-54441-num-box {
		width: 2123px;
		height: 1097px;
		top: -190px;
		align-items: center;
		justify-content: center;
	}

	.h-bg-54441-num-5 {
		width: 272px;
		height: 158px;
		background-size: 272px 158px;
		top: 426px;
		background-image: url('./img/5.png');
		left: 260px;
	}

	.h-bg-54441-num-4 {
		width: 272px;
		height: 158px;
		background-size: 272px 158px;
		top: 426px;
	}

	.h-bg-54441-num-41 {
		left: 594px;
		background-image: url('./img/4-1.png');
	}

	.h-bg-54441-num-42 {
		left: 928px;
		background-image: url('./img/4-2.png');
	}

	.h-bg-54441-num-43 {
		left: 1262px;
		background-image: url('./img/4-3.png');
	}

	.h-bg-54441-num-1 {
		width: 272px;
		height: 158px;
		background-size: 272px 158px;
		top: 426px;
		left: 1600px;
		background-image: url('./img/1.png');
	}

	.h-bg-54441 {
		top: 380px;
		width: 100%;
		justify-content: center;
	}

	.h-bg-54441-box1 {
		left: 1038px;
	}

	.h-bg-54441-box2 {
		left: 1354px;
	}

	.h-bg-54441-box3 {
		left: 1666px;
	}

	.h-bg-54441-box4 {
		left: 1986px;
	}

	.h-bg-54441-box5 {
		left: 2298px;
	}

	.h-bg-54441-close1 {
		width: 257px;
		height: 64px;
		bottom: -470px;
		left: 50%;
		margin-left: -1015px;
	}

	.h-bg-54441-close {
		background-image: url('./img/close.svg');
		width: 32px;
		height: 32px;
		left: 50%;
		margin-left: 710px;
		top: -44px;
		background-size: 32px;
	}
</style>
