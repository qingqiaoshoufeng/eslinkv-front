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
		updateComponent: (id, config) => {
			const widgetConfig = store.kanboard.widgetAdded[id].config.api
			if (config.params) {
				widgetConfig.params = JSON.stringify(config.params)
			}
			if (config.data) {
				widgetConfig.data = JSON.stringify(config.data)
			}

			if (config.url)
				widgetConfig.url = config.url
			if (config.path)
				widgetConfig.path = config.path
			if (config.method)
				widgetConfig.method = config.method
		},
	},
	store,
	liveVideo: {
		flvPlayer: null,
		myPlayer: null,
		pauseVideo: () => {
			if (!GoldChart.liveVideo.flvPlayer?._emitter) return
			if (flvjs.isSupported()) {
				GoldChart.liveVideo.flvPlayer.unload();
				GoldChart.liveVideo.flvPlayer.detachMediaElement();
				GoldChart.liveVideo.flvPlayer.destroy();
			} else {
				GoldChart.liveVideo.myPlayer.reset();
			}
		}
	},
	components: {},
	methods: {}
}

export default GoldChart
export {store, mutations}

if (!window.GoldChart) {
	window.GoldChart = {}
}

window.GoldChart = {...window.GoldChart, ...GoldChart}



