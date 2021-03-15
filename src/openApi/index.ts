const GoldChart: any = {
    liveVideo: {
        flvPlayer: null,
        myPlayer: null,
        pauseVideo: () => {
            if (!GoldChart.liveVideo.flvPlayer?._emitter) return
            if (window.flvjs.isSupported()) {
                GoldChart.liveVideo.flvPlayer.unload()
                GoldChart.liveVideo.flvPlayer.detachMediaElement()
                GoldChart.liveVideo.flvPlayer.destroy()
            } else {
                GoldChart.liveVideo.myPlayer.reset()
            }
        }
    }
}

if (!window.GoldChart) {
    window.GoldChart = {}
}

window.GoldChart = { ...window.GoldChart, ...GoldChart }

