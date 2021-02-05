<template lang="pug">
	.error-container
		.error-content.fn-flex.flex-row
			.text-right.flex-row.flex-column
				h1.text-jumbo.text-ginormous 哎呀!
				h2 你没有权限去该页面
			.text-left
				img(:src="errGif" width="313" height="428")
</template>
<script lang="ts">
	import errGif from '../../assets/401_images/401.gif'
	import {Button, Row, Col} from 'view-design'
	import {Component, Vue} from 'vue-property-decorator'

	@Component({
		components: {
			'i-button': Button,
			'i-row': Row,
			'i-col': Col,
		}
	})
	export default class Page401 extends Vue {
		errGif: any = errGif
	}
</script>

<style lang="scss" scoped>
	@import "../../scss/conf";

	.error-container {
		width: 100vw;
		height: 100vh;
		background: #fff;
	}

	.error-content {
		align-items: center;
		height: 100%;
		justify-content: center;
	}
</style>
