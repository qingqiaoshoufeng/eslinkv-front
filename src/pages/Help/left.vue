<template lang="pug">
i-menu.pos-f.help-left(
	:open-names="['4']",
	@on-select="handleSelect",
	:active-name="leftName")
	i-sub-menu(name="1")
		template(slot="title") 大屏管理
		i-menu-item(name="PanelSetting") 大屏配置
		i-menu-item(name="EditorSetting") 编辑器配置
		i-menu-item(name="SceneSetting") 场景设置
		i-menu-item(name="KeyBoard") 快捷键
		i-menu-item(name="ExportImport") 导入导出
	i-sub-menu(name="2")
		template(slot="title") 大屏迁移
		i-menu-item(name="ExportImport") 导入导出
	i-sub-menu(name="3")
		template(slot="title") 私有化部署
		i-menu-item(name="DeployService") 服务端部署
		i-menu-item(name="DeployWeb") 网页端部署
		i-menu-item(name="DeployNginx") nginx配置
		i-menu-item(name="DeployNode") 安装 node.js
		i-menu-item(name="DeployMongodb") 安裝 mongodb
	i-sub-menu(name="4")
		template(slot="title") 定制化开发
		i-menu-item(name="HowToSecretKey") 开发密钥
		i-menu-item(name="HowToUseNpm") 大屏开发
		i-menu-item(name="HowToUseMarket") 组件开发
		i-menu-item(name="HowToUseMarketCli") 组件开发cli
		i-menu-item(name="Suggestions") 意见建议
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Menu, Submenu, MenuItem } from 'view-design'
import common from '../../store/common.store.js'

@Component({
	components: {
		'i-menu': Menu,
		'i-sub-menu': Submenu,
		'i-menu-item': MenuItem,
	},
})
export default class HelpLeft extends Vue {
	leftName = ''

	handleSelect(name) {
		const currentHash = decodeURIComponent(location.hash.replace('#', ''))
		const nowHash = `/help/${name}`
		if (
			encodeURIComponent(currentHash.replace(/\s+/g, '')) !==
			encodeURIComponent(nowHash.replace(/\s+/g, ''))
		) {
			this.$router.push(nowHash)
			this.leftName = name
			window.scrollTo(0, 0)
		}
	}

	mounted() {
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
