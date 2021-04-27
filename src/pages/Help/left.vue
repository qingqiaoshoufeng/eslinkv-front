<template lang="pug">
i-menu.pos-f.help-left(
	:open-names="['1']",
	@on-select="handleSelect",
	:active-name="leftName")
	i-sub-menu(name="1")
		template(slot="title") EslinkV
		i-menu-item(name="EslinkV") EslinkV介绍
	i-sub-menu(name="2")
		template(slot="title") 迁移/共享
		i-menu-item(name="ExportImport") 导入导出
		i-menu-item(name="Share") 分享大屏
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
		i-menu-item(name="ExternalPlug") 外部插件
		i-menu-item(name="BuiltInMethod") 内置方法
		i-menu-item(name="CustomConfig") 自定义配置
		//i-menu-item(name="Socket") 终端交互
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
		this.handleSelect(name)
		common.actions.setNavIndex('/help/EslinkV')
	}
}
</script>
<style lang="scss" scoped>
.help-left {
	top: 50px;
	left: 0;
}
</style>
