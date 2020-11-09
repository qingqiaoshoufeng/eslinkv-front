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
		const scene = store.scene.list
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
			let arr = []
			for (let key in list) {
				arr.push({name: list[key].name, key})
			}
			arr.sort(function (a, b) {
				return a['name'].localeCompare(b['name']);
			})
			store.scene.list = arr.map(item => item.key)
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
		const transform = kanban.style.transform
		const uid = uuid()
		const canvasStyle = `position: relative;transition: all .3s;flex-shrink: 0;flex-grow: 0;transform:scale(0);width:${kanban.clientWidth}px;height:${kanban.clientHeight}px;overflow: hidden;background-color:transparent;z-index: 99999;`
		const array = store.scene.sceneObj[id].list
		const _self = store.instance.kanboard
		const Comp = Vue.extend({
			template: `<div class="scene-temporary-container fn-flex" style="position:fixed;left:0;top:0;right:0;bottom:0;z-index: 99999;justify-content: center;align-items: center;">
					<div id="${uid}" class="scene-temporary-wrapper" style="${canvasStyle}">
						<parts
						readonly
						:config="item.value"
						:type="item.type"
						v-for="item in array"
						:key="item.id"></parts>
					</div></div>`,
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
		document.getElementsByClassName('detail-container')[0].appendChild(comp.$el)
		setTimeout(() => {
			document.getElementById(uid).style.transform = transform
		}, 300)
	}
}

export default {state, actions}
