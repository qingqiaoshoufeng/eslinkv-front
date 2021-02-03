<template lang="pug">
	.d-footer.fn-flex
		.d-footer-left.fn-flex
			span.d-footer-title {{ platform.info.name }}
		.d-footer-right.fn-flex
			span(style="padding-right: 25px")
				a.doc-link.fn-flex.flex-row(title="使用文档" @click="handleClick")
					span 使用文档
					i-icon(type="md-help-circle")
			i-button(@click="exit") 返回
			i-button(@click="preview") 预览
			i-button(type="primary" @click="editBoard" :loading="loading") 保存
			i-button(@click="publishBoard" :loading="loading") 发布
			i-button(@click="exportKanboardData" :loading="loading") 导出
			i-button(@click="showImportModal" :loading="loading") 导入
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import {Icon, Button} from 'view-design'
	import platform from '../../store/platform.store'

	@Component({
		components: {'i-icon': Icon},
		components: {'i-button': Button},
	})
	export default class DFooter extends Vue {
		platform = platform.state

		handleClick() {
			window.open(`${location.origin}${location.pathname}#/help/HowToUseMarket`)
		}

		mounted() {
			const {params: {id}} = this.$route
			console.log(id)
		}
		
		
	}
</script>
<style lang="scss" scoped>
	.d-footer {
		width: 100%;
		height: 50px;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;

		/deep/ button {
			margin-left: 10px;
		}

		.d-footer-left, .d-footer-right {
			align-items: center;

			.return {
				margin-left: 0;
			}
		}

		.doc-link {
			align-items: center;
		}

		.d-footer-left {
			.d-footer-title {
				font-size: 15px;
				padding: 0 15px 0 0;
			}
		}
	}
</style>
