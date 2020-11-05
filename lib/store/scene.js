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
	obj: {},
	sceneObj: {}
}

const actions = {
	listToObj(value) {
		const widgets = value.widgets
		const scene = value.scene
		widgets.forEach(item => {
			const index = scene.indexOf(item.scene)
			if (index !== -1) {
				if (!store.scene.sceneObj[scene[index]])
					store.scene.sceneObj[scene[index]] = {}
				if (!store.scene.sceneObj[scene[index]].list)
					store.scene.sceneObj[scene[index]].list = []
				store.scene.sceneObj[scene[index]].list.push(item)
			}
		})
	},
	initScene(list) {
		if (list instanceof Array) {
			store.scene.list = list
			list.forEach(item => {
				store.scene.obj[item] = {
					name: `场景${item}`
				}
			})
		} else {
			store.scene.obj = list
			store.scene.list = Object.keys(list)
		}
	},
	setSceneName(key, name) {
		store.scene.obj[key].name = name
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
		const name = uuid()
		store.scene.list.push(name)
		store.scene.obj[name] = {name: `场景${name}`}
	},
	destroyScene(index) {
		delete store.scene.obj[index]
		store.scene.list.splice(index, 1)
	},
	createSceneInstance(id) {
		const kanban = document.getElementById('kanban')
		const canvasStyle = `width:${kanban.clientWidth}px;height:${kanban.clientHeight}px;position: fixed;top: 0;left: 0;overflow: hidden;background-color:transparent;z-index: 99999;`
		const array = store.scene.sceneObj[id].list
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
