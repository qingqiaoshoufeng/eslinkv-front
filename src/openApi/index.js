import {mutations, store} from '../../lib/store'

const GoldChart = {
	scene: {
		initScene: mutations.initScene,
		setSceneIndex: mutations.setSceneIndex,
		createScene: mutations.createScene,
		destroyScene: mutations.destroyScene,
		createSceneInstance: mutations.createSceneInstance,
	},
	instance: {
		updateComponent: (id, data) => {
			store.instance.kanboard.$refs[id][0].$refs.widgets.updateComponentFormOutSide(data)
		}
	},
}

export default GoldChart
export {store, mutations}

window.GoldChart = GoldChart

// document.addEventListener('GoldChartReady', function (e) {
// 	console.log(e.detail)
// }, false)
//

// const event = new CustomEvent('GoldChartReady', {detail: {GoldChart}})
// document.dispatchEvent(event)



