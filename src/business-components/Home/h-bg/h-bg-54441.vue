<template>
	<div class="h-bg-54441 pos-a fn-flex flex-row">
		<box title="五者" :content="content1"/>
		<box title="四大发展" :content="content2"/>
		<box title="四大战略" :content="content3"/>
		<box title="四大工程" :content="content4"/>
		<box title="第一方阵" :content="content5" :style="{marginRight:0}"/>
		<div class="h-bg-54441-num pos-a"></div>
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
		}
	}
</script>
<style lang="scss">
	.h-bg-54441-num {
		background-image: url('./img/num.svg');
		width: 2123px;
		height: 1097px;
		background-size: 2123px 1097px;
		top: -326px;
	}

	.h-bg-54441 {
		top: 305px;
		width: 100%;
		justify-content: center;

		.h-bg-54441-box {
			margin-right: 110px;
		}
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
