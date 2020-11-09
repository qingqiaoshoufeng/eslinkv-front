import {mutations, store} from '../../lib/store'

const GoldChart = {
	scene: {
		initScene: mutations.initScene,
		setSceneIndex: mutations.setSceneIndex,
		createScene: mutations.createScene,
		destroyScene: mutations.destroyScene,
		createSceneInstance: mutations.createSceneInstance,
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



