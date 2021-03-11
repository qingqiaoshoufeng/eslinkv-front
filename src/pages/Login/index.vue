<template lang="pug">
	.login-container.fn-flex
		.login-card.fn-flex
			.login-card-logo.pos-r.fn-flex
				.login-card-logo-img.pos-a
				.login-card-logo-mask.pos-a
				h2.pos-r EslinkV
			ul.login-card-content
				li
					i-input(prefix="md-contact" placeholder="用户名")
				li
					i-input(prefix="md-lock" placeholder="密码")
				li
					i-button(type="primary" shape="circle" :long="true") 登录
</template>
<script lang="ts">
	import {Input, Button, Icon} from 'view-design'
	import {Component, Vue} from 'vue-property-decorator'

	@Component({
		components: {
			'i-input': Input,
			'i-button': Button,
			'i-icon': Icon,
		}
	})
	export default class Login extends Vue {

	}
</script>
<style lang="scss" scoped>
	@import "../../scss/conf";

	.login-container {
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.login-card {
		width: 720px;
		height: 380px;
		box-shadow: 0 10px 30px 0 $themeColor_01;
	}

	.login-card-logo {
		width: 450px;
		align-items: center;
		justify-content: center;

		.login-card-logo-img {
			background-size: cover;
			background-position: center;
			background-image: url('../../assets/login/login-bg.jpg');
		}

		.login-card-logo-img, .login-card-logo-mask {
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}

		.login-card-logo-mask {
			background-color: $themeColor_03;
		}

		h2 {
			font-size: 40px;
			color: #fff;
		}
	}

	.login-card-content {
		width: 270px;
		padding: 91px 30px 0 30px;
		background-color: #fff;

		li {
			margin-bottom: 34px;
		}
	}
</style>
