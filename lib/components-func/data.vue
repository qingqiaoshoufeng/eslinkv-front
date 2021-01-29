<template lang="pug">
	div
		.fn-flex.flex-row.d-manage-modal-control-more
			.d-manage-modal-control
				label 接口地址
				i-input(v-model="item.config.api.url")
			.d-manage-modal-control
				label 请求方式
				i-select(v-model="item.config.api.method")
					i-option(value="") 默认
					i-option(value="GET") GET
					i-option(value="POST") POST
					i-option(value="PUT") PUT
					i-option(value="DELETE") DELETE
					i-option(value="PATCH") PATCH
			.d-manage-modal-control
				label 数据路径
				i-input(v-model="item.config.api.path")
		.d-manage-modal-control
			label 请求参数
			editor.d-manage-modal-control-editor(v-model="apiParams" @init="editorInit" lang="json" theme="chrome" height="100")
		.d-manage-modal-control
			label 响应数据
			editor.d-manage-modal-control-editor(v-model="apiData" @init="editorInit" lang="json" theme="chrome" height="100")
		.d-manage-modal-control
			label 数据加工
			i-switch(v-model="item.config.api.process.enable")
		.d-manage-modal-control(v-if="item.config.api.process.enable")
			label 加工CODE
			editor.d-manage-modal-control-editor(v-model="apiMethod" @init="editorInit" lang="javascript" theme="chrome" height="100")
		.d-manage-modal-control
			label 定时刷新
			i-switch(v-model="item.config.api.autoFetch.enable")
		.d-manage-modal-control(v-if="item.config.api.autoFetch.enable")
			label 刷新间隔
			i-inputNumber(:min="1" :step="1" v-model="item.config.api.autoFetch.duration")
</template>
<script lang="ts">
	import func from './func'
	import {Component} from 'vue-property-decorator'

	@Component
	export default class FuncData extends func {
		get apiMethod(){
			return this.getCode('config.api.process.methodBody')
		}

		set apiMethod(val){
			this.setCode(val, 'config.api.data')
		}
		
		get apiParams() {
			return this.getJson('config.api.params')
		}

		set apiParams(val) {
			this.setJson(val, 'config.api.params')
		}
		
		get apiData(){
			return this.getJson('config.api.data')
		}

		set apiData(val) {
			this.setJson(val, 'config.api.data')
		}
	}
</script>
