<template lang="pug">
e-layout
	.help-container.pos-r.d-scrollbar
		left
		.help-markdown-body(v-highlight)
			.pos-r(v-html="help.helpContent")
</template>
<script lang="ts">
import Left from './left.vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
	components: {
		Left,
	},
})
export default class Help extends Vue {
	help = {
		helpContent: '',
		helpName: '',
	}

	@Watch('$route')
	handleRouter() {
		this.init()
	}

	async init() {
		let { name } = this.$route.params
		name = name.replace(/%20/g, '')
		try {
			const content = await import(`../../../docs/${name}.md`)
			this.help.helpContent = content.default
		} catch (e) {
			this.help.helpContent = '开发人员正在加急编写文档中……'
		}
		this.help.helpName = name
	}

	mounted() {
		this.init()
	}
}
</script>
<style lang="scss" scoped>
.help-container {
	height: calc(100vh - 50px);
	background-color: #fff;
}
.help-markdown-body {
	padding: 40px 80px;
	margin-left: 240px;
	margin-right: 240px;
	min-height: 100%;
	color: rgb(51, 51, 51);
	line-height: 32px;
	font-size: 16px;
	&::v-deep {
		.help-menu {
			right: 0;
			width: 240px;
			top: 100px;
			font-size: 16px;
			padding-left: 5px;

			+ ul {
				top: 130px;
				width: 240px;
				right: 0;
				position: fixed;
				list-style: none;
				padding-left: 15px;
				margin-bottom: 10px;

				li {
					list-style: none;

					ul {
						padding-left: 15px;
						margin-top: 6px;
					}
				}
			}
		}

		code {
			word-break: break-all;
			white-space: pre-wrap;
		}

		p {
			margin-bottom: 16px;
			code {
				background: #f6f6f6;
				color: #c7254e;
				padding: 3px;
				font-size: 16px;
				border-radius: 3px;
				margin-left: 4px;
				margin-right: 4px;
			}
		}

		img {
			margin: 10px 0;
			max-width: 100%;
		}

		blockquote {
			color: #777;
			border-left: 4px solid #d6dbdf;
			font-size: 14px;
			background: none repeat scroll 0 0 rgba(102, 128, 153, 0.05);
			margin: 8px 0;
			padding: 8px;

			p {
				font-size: 16px;
				line-height: 32px;
				margin-bottom: 0;
			}
		}
		pre {
			line-height: 22px;
		}

		h1 {
			font-size: 28px;
			font-weight: 400;
			border-bottom: 1px solid #eee;
			padding-bottom: 9px;
			margin-bottom: 16px;
			margin-top: 28px;
		}

		h2 {
			margin-bottom: 10px;
			margin-top: 20px;
			border-bottom: 1px solid #eee;
			padding-bottom: 8px;
			font-weight: 400;
			font-size: 25px;
		}

		h3 {
			font-size: 22px;
			margin-top: 20px;
			margin-bottom: 16px;
		}
		ul {
			padding-left: 40px;
		}
		ul,
		li {
			list-style: circle;
		}
	}
}
</style>
