import {mutations, store} from '../../lib/store'
import mixins from '../components-business/mixins'
import platform from '../../lib/store/platform.store'

const GoldChart: any = {
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
            const widgetConfig = platform.actions.widgetAdded[id].config.api
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
    mutations,
    liveVideo: {
        flvPlayer: null,
        myPlayer: null,
        pauseVideo: () => {
            if (!GoldChart.liveVideo.flvPlayer?._emitter) return
            if (window.flvjs.isSupported()) {
                GoldChart.liveVideo.flvPlayer.unload();
                GoldChart.liveVideo.flvPlayer.detachMediaElement();
                GoldChart.liveVideo.flvPlayer.destroy();
            } else {
                GoldChart.liveVideo.myPlayer.reset();
            }
        }
    },
    components: {},
    mixins,
    methods: {},
}

if (!window.GoldChart) {
    window.GoldChart = {}
}

window.GoldChart = {...window.GoldChart, ...GoldChart}



