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
	help: any = {
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
			this.help.helpContent = 'TODO'
		}
		this.help.helpName = name
	}

	mounted() {
		this.init()
	}
}
</script>
<style lang="scss">
.help-container {
	height: calc(100vh - 50px);
}
.help-menu {
	right: 0;
	width: 240px;
	top: 100px;
	font-size: 14px;
	+ ul {
		top: 130px;
		width: 240px;
		right: 0;
		position: fixed;
		list-style: none;
		padding-left: 10px;
		li {
			list-style: none;
			margin-bottom: 6px;
			ul {
				padding-left: 10px;
			}
		}
	}
}
.help-markdown-body {
	padding: 40px 80px;
	margin-left: 240px;
	margin-right: 240px;
	background-color: #fff;
	min-height: 100%;
	code {
		word-break: break-all;
		white-space: pre-wrap;
	}
	p {
		font-size: 14px;
		code {
			font-weight: bold;
			background-color: #333;
			color: #fff;
			padding: 1px 4px;
			font-size: 12px;
			margin: 0 4px;
		}
	}
	img {
		margin: 10px 0;
		max-width: 100%;
	}
	blockquote {
		margin: 10px 0;
		background-color: #ddd;
		p {
			padding: 1px 4px;
		}
	}
	h2 {
		margin-bottom: 10px;
		margin-top: 20px;
	}
	h3 {
		margin-bottom: 5px;
		margin-top: 15px;
	}
	ul,
	li {
		list-style: circle;
	}
}
</style>
