<template lang="pug">
	i-menu.pos-f.help-left(:open-names="['3']" @on-select="handleSelect" :active-name="leftName")
		i-sub-menu(name="1")
			template(slot="title") 看板管理
			i-menu-item(name="PanelSetting") 看板配置
			i-menu-item(name="EditorSetting") 编辑器配置
			i-menu-item(name="SceneSetting") 场景设置
			i-menu-item(name="KeyBoard") 快捷键
			i-menu-item(name="ExportImport") 导入导出
		i-sub-menu(name="2")
			template(slot="title") 密钥管理
			i-menu-item(name="HowToSecretKey") 密钥使用
		i-sub-menu(name="3")
			template(slot="title") 组件市场
			i-menu-item(name="HowToUseMarket") 如何开发
</template>
<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import { Menu, Submenu, MenuItem } from 'view-design'
	import common from '../../store/common.store.js'

	@Component({
		components: {
			'i-menu': Menu,
			'i-sub-menu': Submenu,
			'i-menu-item': MenuItem
		}
	})
	export default class HelpLeft extends Vue {
		leftName: string = ''

		handleSelect (name) {
			const currentHash = decodeURIComponent(location.hash.replace('#', ''))
			const nowHash = `/help/${name}`
			if (encodeURIComponent(currentHash.replace(/\s+/g, '')) !== encodeURIComponent(nowHash.replace(/\s+/g, ''))) {
				this.$router.push(nowHash)
				this.leftName = name
				window.scrollTo(0, 0)
			}
		}

		mounted () {
			const { name } = this.$route.params
			this.leftName = name
      common.actions.setNavIndex('/help/HowToUseMarket')
		}
	}
</script>
<style lang="scss">
	.help-left {
		top: 50px;
		left: 0;
	}
</style>
