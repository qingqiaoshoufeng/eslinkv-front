<template lang="pug">
i-menu.pos-f.help-left.d-scrollbar(
	:open-names="['1']",
	@on-select="handleSelect",
	:style="{ height: `calc(100vh - ${editor.yRoom}px)` }",
	:active-name="leftName")
	i-sub-menu(name="1")
		template(slot="title") 关于我们
		i-menu-item(name="EslinkV") EslinkV介绍
		i-menu-item(name="Suggestions") 意见建议
		i-menu-item(name="Welcome") 欢迎贡献
	i-sub-menu(name="2")
		template(slot="title") 架构简介
		i-menu-item(name="no") @eslinkv/core
		i-menu-item(name="no") @eslinkv/vue2
	i-sub-menu(name="3")
		template(slot="title") 功能简介
		i-menu-item(name="ExportImport") 导入导出
		i-menu-item(name="no") 标尺/参考线
		i-menu-item(name="no") 键盘/鼠标快捷键
		i-menu-item(name="no") 数据配置
		i-menu-item(name="no") 事件配置
		i-menu-item(name="no") 入场动画
		i-menu-item(name="no") 多选
		i-menu-item(name="Share") 分享大屏
	i-sub-menu(name="4")
		template(slot="title") 如何部署
		i-menu-item(name="DeployService") 服务端部署
		i-menu-item(name="DeployWeb") 网页端部署
		i-menu-item(name="DeployNginx") nginx配置
		i-menu-item(name="DeployNode") 安装 node.js
		i-menu-item(name="DeployMongodb") 安裝 mongodb
	i-sub-menu(name="5")
		template(slot="title") 开发说明（组件版）
		i-menu-item(name="HowToUseMarket") 第一个组件示例
		i-menu-item(name="ExternalPlug") 如何使用外部插件
		i-menu-item(name="BuiltInMethod") 内置方法
		i-menu-item(name="CustomConfig") 如何设置组件自定义配置
		i-menu-item(name="no") 如何设置组件自定义数据过滤器
		i-menu-item(name="no") 如何设置组件自定义事件
		i-menu-item(name="HowToSecretKey") 开发密钥申请
		//i-menu-item(name="Socket") 终端交互
	i-sub-menu(name="6")
		template(slot="title") 开发说明（大屏版）
		i-menu-item(name="HowToUseNpm") 第一个大屏示例
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Menu, Submenu, MenuItem } from 'view-design'
import common from '../../store/common.store.js'
import { Editor } from '@eslinkv/core'

@Component({
	components: {
		'i-menu': Menu,
		'i-sub-menu': Submenu,
		'i-menu-item': MenuItem,
	},
})
export default class HelpLeft extends Vue {
	leftName = ''
	editor = Editor.Instance()

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
