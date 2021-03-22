<template lang="pug">
	.e-header.pos-f.fn-flex.flex-row
		h1 EslinkV
		ul.fn-flex.flex-row
			li.pointer(@click="handleHelp") 帮助文档
			li.pointer(@click="handleChangeLog") 更新日志
    i-icon(type="ios-contact" size="22")
    i-drop-down.e-header-user
      span 下拉菜单
      i-drop-down-menu(slot="list")
        i-drop-down-item 退出登录
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { Icon, Button, Dropdown, DropdownItem, DropdownMenu } from 'view-design'

	@Component({
		components: {
			'i-icon': Icon,
			'i-button': Button,
			'i-drop-down': Dropdown,
			'i-drop-down-item': DropdownItem,
			'i-drop-down-menu': DropdownMenu
		}
	})
	export default class EHeader extends Vue {
		handleHelp () {
			this.$router.push('/help/HowToUseMarket')
		}

		handleChangeLog () {
			this.$router.push('/changeLog')
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../scss/conf";

	.e-header {
		top: 0;
		left: 0;
		z-index: 8;
		align-items: center;
		width: 100%;
		height: 40px;
		padding-right: 10px;
		padding-left: 70px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(61, 77, 102, 0.1);

		h1 {
			margin-right: auto;
			margin-left: 10px;
			font-size: 16px;
		}

    .e-header-user {
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
