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
			if (store.instance.createKanboard) {
				if (store.instance.createKanboard.$refs[id]) {
					store.instance.createKanboard.$refs[id][0].$refs.widgets.updateComponentFormOutSide(data)
				}
			}
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
	}
}

export default GoldChart
export {store, mutations}

// window.store = store
// if (process.env.NODE_ENV !== 'production')
	// window.GoldChart = GoldChart



