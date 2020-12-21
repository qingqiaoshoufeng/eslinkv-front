import {store, mutations} from './index'
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
	status: 'inEdit', // inEdit  在编辑器中/  inPreview 在预览中
	sceneObj: {},
	showMainScene: true, // 是否显示主场景
	showAnimationStyle: 'zoom' // 实例化场景，动画
}

const actions = {
	changeShowMainScene(value) {
		if (value !== store.scene.showMainScene)
			store.scene.showMainScene = value
	},
	setStatus(status) {
		store.scene.status = status
	},
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
		store.scene.obj[key].name = name.replace(/ /g, '')
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
		const showAnimationStyle = store.scene.showAnimationStyle
		switch (showAnimationStyle) {
			case "fadeIn":
				document.getElementById(index).style.opacity = '0'
				break;
			case "zoomIn":
				document.getElementById(index).style.transform = 'scale(0)'
				break;
			case "slideUp":
				document.getElementById(index).style.bottom = '-80%'
				break;
			case "slideRight":
				document.getElementById(index).style.right = '-80%'
				break;
		}
		let event = new CustomEvent('DestroyScene', {detail: {index}})
		document.dispatchEvent(event)
		setTimeout(() => {
			document.getElementById(index).parentNode.remove()
			// store.instance.createComp.$destroy()
			mutations.setInstance('createKanboard', null)  // 初始化实例场景
			mutations.setInstance('createComp', null) // 初始化实例场景
			store.scene.showAnimationStyle = 'fadeIn' // 初始化实例场景
		}, 300)
	},
	deleteScene(index) {
		delete store.scene.obj[index]
		delete store.scene.sceneObj[index]
		store.scene.list.splice(index, 1)
	},
	createSceneInstance(id, showAnimationStyle = 'fadeIn', pointerEvents = 'auto') {
		const kanban = document.getElementById('kanban')
		const transform = kanban.style.transform
		const canvasStyle = `position: relative;transition: all .3s;flex-shrink: 0;flex-grow: 0;transform:scale(0);width:${kanban.clientWidth}px;height:${kanban.clientHeight}px;overflow: hidden;background-color:transparent;z-index: 99999;`
		const array = store.scene.sceneObj[id].list
		const _self = store.instance.kanboard
		store.scene.showAnimationStyle = showAnimationStyle
		const Comp = Vue.extend({
			template: `<div class="scene-temporary-container fn-flex"
style="pointer-events:${pointerEvents};position:fixed;left:0;top:0;right:0;bottom:0;z-index: 99999;justify-content: center;align-items: center;">
					<div id="${id}" class="scene-temporary-wrapper" style="${canvasStyle}">
						<parts
						readonly
						:ref="item.id"
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
			components: {parts},
			mounted() {
				mutations.setInstance('createKanboard', this)
			}
		})
		const comp = new Comp().$mount()
		mutations.setInstance('createComp', comp)
		document.getElementsByClassName('full-container')[0].appendChild(comp.$el)
		switch (showAnimationStyle) {
			case "fadeIn":
				document.getElementById(id).style.transform = `${transform}`
				document.getElementById(id).style.opacity = '0'
				setTimeout(() => {
					document.getElementById(id).style.opacity = '1'
				}, 300)
				break;
			case "zoomIn":
				setTimeout(() => {
					document.getElementById(id).style.transform = transform
				}, 300)
				break;
			case "slideRight":
				document.getElementById(id).style.transform = transform
				document.getElementById(id).style.right = '-80%'
				setTimeout(() => {
					document.getElementById(id).style.right = '0'
				}, 300)
				break;
			case "slideUp":
				document.getElementById(id).style.transform = transform
				document.getElementById(id).style.bottom = '-80%'
				setTimeout(() => {
					document.getElementById(id).style.bottom = '0'
				}, 300)
				break;
		}

	}
}

export default {state, actions}
