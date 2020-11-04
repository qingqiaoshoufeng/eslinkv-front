<template>
	<div class="widget-part" :style="styles">
		<div class="fn-flex flex-row h-title-3">
			<div class="left-box circle fn-flex"
				 :style="{borderColor:data&&data.color}">
				<img :src="data&&data.img"/>
			</div>
			<div class="right-box text-left">
				<h2><i class="font-num">{{data&&data.title}}</i><span>{{data&&data.suffix}}</span></h2>
				<ul class="fn-flex flex-row ">
					<li v-for="(item,index) in icons" :key="index"></li>
				</ul>
				<p>{{data&&data.subTitle}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
				img: '/static/icons/h-title3-1.svg',
				title: 1000,
				suffix: '台',
				color: 'rgba(0,221,255,1)',
				subTitle: '分户供暖用户',
			})
		}
	}

	export default {
		data() {
			return {
				icons: new Int8Array(50)
			}
		},
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.h-title-3 {
		width: 100%;
		height: 100%;

		.left-box {
			width: 56px;
			height: 56px;
			border: 1px dashed;
			align-items: center;
			justify-content: center;
			margin-right: 12px;
		}

		.right-box {
			ul {
				margin: 2px 0;
			}

			li {
				width: 1px;
				height: 4px;
				background-color: rgba(96, 230, 255, .32);
				transform: rotate(-10deg);
				margin-right: 2px;
			}

			h2 {
				font-size: 24px;
				line-height: 24px;
				color: #FEFFFF;

				i {
					font-style: normal;
				}

				span {
					margin-left: 8px;
					font-size: 20px;
					line-height: 24px;
					font-weight: normal;
				}
			}

			p {
				font-size: 20px;
				line-height: 24px;
				color: rgba(254, 255, 255, 0.6);
			}
		}
	}
</style>

