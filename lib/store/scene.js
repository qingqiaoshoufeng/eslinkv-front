import {store} from './index'
import {uuid} from '../utils'
import * as widgetBindManager from '../views/mixins/widget-bind-manage'
import parts from '../views/core/widgets/parts/index'
import Vue from 'vue'

/**
 * @description 场景
 */
const state = {
	index: 0,
	list: [],
	obj: {}
}

const actions = {
	listToObj(value) {
		const widgets = value.widgets
		const scene = value.scene
		let obj = {}
		widgets.forEach(item => {
			console.log(scene)
			console.log(item.scene)
			const index = scene.indexOf(item.scene)
			if (index !== -1) {
				if (!obj[scene[index]])
					obj[scene[index]] = []
				obj[scene[index]].push(item)
			}
		})
		store.scene.obj = obj
	},
	initScene(list) {
		store.scene.list = list
	},
	setSceneIndex(index) {
		if (index !== store.scene.index) {
			if (!window.GoldChart)
				window.GoldChart = {}
			store.scene.index = index
		}
		let event = new CustomEvent('SceneIndex', {detail: {index}})
		document.dispatchEvent(event)
		event = null
	},
	createScene() {
		store.scene.list.push(uuid())
	},
	destroyScene(index) {
		store.scene.list.splice(index, 1)
	},
	createSceneInstance(id) {
		const kanban = document.getElementById('kanban')
		const canvasStyle = `width:${kanban.clientWidth}px;height:${kanban.clientHeight}px;position: fixed;top: 0;left: 0;overflow: hidden;background-color:transparent;z-index: 99999;`
		const array = store.scene.obj[id]
		const _self = store.instance.kanboard
		const Comp = Vue.extend({
			template: `
					<div class="scene-temporary-wrapper" style="${canvasStyle}">
						<parts
						readonly
						:config="item.value"
						:type="item.type"
						v-for="item in array"
						:key="item.id"></parts>
					</div>`,
			provide() {
				return {...widgetBindManager, kanboard: _self, kanboardEditor: _self}
			},
			data() {
				return {
					array
				}
			},
			components: {parts}
		})
		const comp = new Comp().$mount()
		document.getElementById('app').appendChild(comp.$el)
	}
}

export default {state, actions}
