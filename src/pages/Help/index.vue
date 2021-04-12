<template lang="pug">
e-layout
	.help-container.pos-r.d-scrollbar
		left
		.help-markdown-body(v-highlight)
			div(v-html="help.helpContent")
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
.help-markdown-body {
	padding: 40px 80px;
	margin-left: 240px;
	background-color: #fff;
	code {
		word-break: break-all;
		white-space: pre-wrap;
	}
	h2 {
		margin-bottom: 10px;
		margin-top: 20px;
	}
	ul,
	li {
		list-style: circle;
	}
}
</style>
