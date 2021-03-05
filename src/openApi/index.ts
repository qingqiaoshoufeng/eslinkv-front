const GoldChart: any = {
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
	// 自定义事件监听
	$event: {
		events: new Map(),
		addEventListener: function (name, callback) {
			this.events.set(name, callback)
		},
		removeEventListener: function (name) {
			this.events.delete(name)
		},
		emit: function (name, data) {
			const callback = this.events.get(name)
			callback && callback(data)
		}
	}
}

if (!window.GoldChart) {
    window.GoldChart = {}
}

window.GoldChart = {...window.GoldChart, ...GoldChart}



