<template lang="pug">
.wscn-http404-container
	.wscn-http404
		.pic-404
			img.pic-404__parent(src="../../assets/404_images/404.png")
			img.pic-404__child.left(src="../../assets/404_images/404_cloud.png")
			img.pic-404__child.mid(src="../../assets/404_images/404_cloud.png")
			img.pic-404__child.right(src="../../assets/404_images/404_cloud.png")
		.bullshit
			.bullshit__oops 哎呀!
			.bullshit__headline 找不到这个页面了...
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Page404 extends Vue {}
</script>
<style lang="scss" scoped>
@import '../../scss/conf';

.wscn-http404-container {
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.wscn-http404 {
	position: relative;
	width: 1200px;
	padding: 0 50px;
	overflow: hidden;

	.pic-404 {
		position: relative;
		float: left;
		width: 600px;
		overflow: hidden;

		&__parent {
			width: 100%;
		}

		&__child {
			position: absolute;

			&.left {
				top: 17px;
				left: 220px;
				width: 80px;
				opacity: 0;
				animation-name: cloudLeft;
				animation-duration: 2s;
				animation-timing-function: linear;
				animation-delay: 1s;
				animation-fill-mode: forwards;
			}

			&.mid {
				top: 10px;
				left: 420px;
				width: 46px;
				opacity: 0;
				animation-name: cloudMid;
				animation-duration: 2s;
				animation-timing-function: linear;
				animation-delay: 1.2s;
				animation-fill-mode: forwards;
			}

			&.right {
				top: 100px;
				left: 500px;
				width: 62px;
				opacity: 0;
				animation-name: cloudRight;
				animation-duration: 2s;
				animation-timing-function: linear;
				animation-delay: 1s;
				animation-fill-mode: forwards;
			}

			@keyframes cloudLeft {
				0% {
					top: 17px;
					left: 220px;
					opacity: 0;
				}

				20% {
					top: 33px;
					left: 188px;
					opacity: 1;
				}

				80% {
					top: 81px;
					left: 92px;
					opacity: 1;
				}

				100% {
					top: 97px;
					left: 60px;
					opacity: 0;
				}
			}

			@keyframes cloudMid {
				0% {
					top: 10px;
					left: 420px;
					opacity: 0;
				}

				20% {
					top: 40px;
					left: 360px;
					opacity: 1;
				}

				70% {
					top: 130px;
					left: 180px;
					opacity: 1;
				}

				100% {
					top: 160px;
					left: 120px;
					opacity: 0;
				}
			}

			@keyframes cloudRight {
				0% {
					top: 100px;
					left: 500px;
					opacity: 0;
				}

				20% {
					top: 120px;
					left: 460px;
					opacity: 1;
				}

				80% {
					top: 180px;
					left: 340px;
					opacity: 1;
				}

				100% {
					top: 200px;
					left: 300px;
					opacity: 0;
				}
			}
		}
	}

	.bullshit {
		position: relative;
		float: left;
		width: 300px;
		padding: 30px 0;
		overflow: hidden;

		&__oops {
			margin-bottom: 20px;
			font-size: 32px;
			font-weight: bold;
			line-height: 40px;
			color: $themeColor;
			opacity: 0;
			animation-name: slideUp;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
		}

		&__headline {
			margin-bottom: 10px;
			font-size: 20px;
			font-weight: bold;
			line-height: 24px;
			color: #222;
			opacity: 0;
			animation-name: slideUp;
			animation-duration: 0.5s;
			animation-delay: 0.1s;
			animation-fill-mode: forwards;
		}

		@keyframes slideUp {
			0% {
				opacity: 0;
				transform: translateY(60px);
			}

			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
}
</style>
