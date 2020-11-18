import {mutations, store} from '../../lib/store'

const GoldChart = {
	scene: {
		initScene: mutations.initScene,
		setSceneIndex: mutations.setSceneIndex,
		createScene: mutations.createScene,
		destroyScene: mutations.destroyScene,
		createSceneInstance: mutations.createSceneInstance,
		changeShowMainScene: mutations.changeShowMainScene,
	},
	instance: {
		updateComponent: (id, data) => {
			if (store.instance.kanboard.$refs[id]) {
				store.instance.kanboard.$refs[id][0].$refs.widgets.updateComponentFormOutSide(data)
			}
			if(store.instance.createKanboard){
				if (store.instance.createKanboard.$refs[id]) {
					store.instance.createKanboard.$refs[id][0].$refs.widgets.updateComponentFormOutSide(data)
				}
			}

		}
	},
	store
}

export default GoldChart
export {store, mutations}

window.GoldChart = GoldChart
window.store = store
// document.addEventListener('GoldChartReady', function (e) {
// 	console.log(e.detail)
// }, false)
//

// const event = new CustomEvent('GoldChartReady', {detail: {GoldChart}})
// document.dispatchEvent(event)



