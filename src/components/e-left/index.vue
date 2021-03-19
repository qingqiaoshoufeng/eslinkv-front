<template lang="pug">
	.e-left-container.pos-f.z-index-9
		.e-left-logo-container
		ul.e-left-content.text-center
			//li.fn-flex.flex-column.pointer
			//	i-icon(type="ios-apps" :size="24")
			//	span 目录
			li.fn-flex.flex-column.pointer(@click="handleLink('/market/componentList')" :class="{active:index==='/market/componentList'}")
				i-icon(type="ios-pie" :size="24")
				span 组件市场
			li.fn-flex.flex-column.pointer(@click="handleLink('/template')" :class="{active:index==='/template'}")
				i-icon(type="ios-aperture" :size="24")
				span 模版市场
			li.fn-flex.flex-column.pointer(@click="handleLink('/editor/Manger')" :class="{active:index==='/editor/Manger'}")
				i-icon(type="ios-easel" :size="24")
				span 看板管理
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Icon } from 'view-design'

	@Component({
		components: {
			'i-icon': Icon
		}
	})
	export default class ELeft extends Vue {
		index = ''

		handleLink (url) {
			this.index = url
			this.$router.push(url)
		}
		
		mounted () {
			const { path } = this.$route
			this.index = path
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../scss/conf";

	.e-left-container {
		top: 0;
		left: 0;
		width: 70px;
	}

	.e-left-content {
		height: calc(100vh - 40px);
		padding-top: 15px;
		background-color: #2c3d59;

		li {
			margin: 15px 0 20px 0;
			color: rgba(255, 255, 255, 0.5);

			&:hover,
			&.active {
				color: #fff;
			}

			span {
				margin-top: 10px;
			}
		}
	}

	.e-left-logo-container {
		height: 40px;
		background-color: $themeColor;
	}
</style>
