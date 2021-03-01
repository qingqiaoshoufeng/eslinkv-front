<template lang="pug">
	.left-container
		.left-logo-container
		ul.left-content.text-center
			li.fn-flex.flex-column.pointer
				i-icon(type="ios-apps" size="24")
				span 目录
			li.fn-flex.flex-column.pointer(@click="handleLink('/market/componentList')" :class="{active:index==='/market/componentList'}")
				i-icon(type="ios-apps" size="24")
				span 组件市场
			li.fn-flex.flex-column.pointer(@click="handleLink('/template')" :class="{active:index==='/template'}")
				i-icon(type="ios-apps" size="24")
				span 模版市场
			li.fn-flex.flex-column.pointer(@click="handleLink('/editor/Manger')" :class="{active:index==='/editor/Manger'}")
				i-icon(type="ios-apps" size="24")
				span 看板管理
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import {Icon} from 'view-design'

	@Component({
		components: {
			'i-icon': Icon
		}
	})
	export default class Left extends Vue {
		index = ''

		handleLink(url) {
			this.index = url
			this.$router.push(url)
		}
		
		mounted() {
			const {path} = this.$route
			this.index = path
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../scss/conf";

	.left-container {
		width: 70px;
	}

	.left-container {
	}

	.left-content {
		background-color: #2c3d59;
		height: calc(100vh - 40px);
		padding-top: 15px;

		li {
			color: rgba(255, 255, 255, 0.5);
			margin: 15px 0 20px 0;

			&:hover, &.active {
				color: #fff;
			}

			span {
				margin-top: 10px;
			}
		}
	}

	.left-logo-container {
		background-color: $themeColor;
		height: 40px;
	}
</style>
