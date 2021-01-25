import {mutations, store} from '../../lib/store'
import mixins from '../components-business/mixins'
import {
    getInput,
    getInputNumber,
    getSelect,
    getArrayGroup,
    getColors,
    getAnimationCurve,
    getBooleanInput, getBackground, getColor, getFile
} from '../../lib/views/core/widgets/parts/lib/config-tools'

const GoldChart: any = {
    version: '0.0.1',
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
                widgetConfig.params = config.params
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
            for (let item in store.scene.sceneObj[store.kanboard.widgetAdded[id].scene].list) {
                if (store.scene.sceneObj[store.kanboard.widgetAdded[id].scene].list[item].id === id) {
                    if (config.data) {
                        console.log(store.scene.sceneObj[store.kanboard.widgetAdded[id].scene].list[item])
                        store.scene.sceneObj[store.kanboard.widgetAdded[id].scene].list[item].value.api.data = JSON.stringify(config.data)
                    }
                }
            }
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
    getInput,
    getInputNumber,
    getSelect,
    getArrayGroup,
    getColors,
    getAnimationCurve,
    getBooleanInput,
    getBackground,
    getColor,
    getFile,
    methods: {},
}

if (!window.GoldChart) {
    window.GoldChart = {}
}

window.GoldChart = {...window.GoldChart, ...GoldChart}



