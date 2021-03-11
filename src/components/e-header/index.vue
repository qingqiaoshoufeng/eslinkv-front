<template lang="pug">
	.e-header.pos-f.fn-flex.flex-row
		h1 EslinkV
		ul.fn-flex.flex-row
			li.pointer(@click="handleHelp") 帮助文档
			li.pointer(@click="handleChangeLog") 更新日志
		i-icon(type="ios-contact" size="22")
		span 测试用户
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import {Icon, Button} from 'view-design'

	@Component({
		components: {
			'i-icon': Icon,
			'i-button': Button,
		}
	})
	export default class EHeader extends Vue {
		handleHelp() {
			this.$router.push('/help/HowToUseMarket')
		}

		handleChangeLog() {
			this.$router.push('/changeLog')
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../scss/conf";

	.e-header {
		height: 40px;
		background-color: #ffffff;
		box-shadow: 0 0 10px rgba(61, 77, 102, 0.1);
		width: 100%;
		top: 0;
		padding-left: 70px;
		padding-right: 10px;
		left: 0;
		align-items: center;
		z-index: 8;

		h1 {
			margin-right: auto;
			font-size: 16px;
			margin-left: 10px;
		}

		span {
			margin-left: 10px;
		}

		li {
			margin-right: 10px;

			&:hover {
				color: $themeColor;
			}
		}
	}
</style>
