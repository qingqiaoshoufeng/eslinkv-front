export default {
    inject: ['parentInfo'],
    props: {
        activeItem: {
            type: Object,
            default() {
                return {}
            },
        }
    },
    data() {
        return {
            activeOverlay: {},
            showOverlayDetail: false,
        }
    },
    created() {
        this.$amap = this.$parent.$amap
        this.$nextTick(() => {
            this.mapFitView(-0.2, 0.4)
        })
    },
    watch: {
        activeItem(val) {
            if (JSON.stringify(val) === '{}') return false
            this.handleOverlayClick(val, 'WARN')
        },
    },

    methods: {
        /**
         *
         * @param {Number} topOffestRatio 上移动百分比
         * @param {Number} scaleRatio     缩放
         * @param {Number} offsetLeftRatio     距离左侧的比例
         */
        mapFitView(topOffestRatio = 0, scaleRatio = 0, offsetLeftRatio = 0) {
            let latDiff = 1.377759
            let topOffest = topOffestRatio * latDiff //上移经纬度
            let scale = (scaleRatio / 2) * latDiff //缩放
            let { parentInfo } = this
            let { scaleRatio: screenScaleRatio } = parentInfo || {}
            let paddingTop = ((1 - screenScaleRatio) / 2) * 1050
            console.log(topOffest, scale, paddingTop)
            // 上下偏移，缩放
            this.$amap.setFitView(
                [
                    new AMap.Marker({
                        position: [118.344933, 29.288757 - topOffest + scale],
                    }),
                    new AMap.Marker({
                        position: [120.721945, 30.496516 - topOffest - scale],
                    }),
                ],
                true,
                [paddingTop, paddingTop, 0, 0]
            )
            //x轴向偏移
            if (offsetLeftRatio) {
                let avaliableAreaWidth = 1.53 * 1050 * screenScaleRatio //杭州区域的宽度
                let paddingRight =
                    3500 * screenScaleRatio * (1 - offsetLeftRatio) -
                    (3500 * screenScaleRatio - avaliableAreaWidth) / 2
                this.$amap.panBy(-paddingRight, 0)
            }
        },
        handleOverlayClick(
            overlay,
            overlayType,
            isCenter = true,
            isZoom = true
        ) {
            let { lng, lat } = overlay
            overlay.overlayType = overlayType
            this.activeOverlay = overlay
            this.showOverlayDetail = true
            if (isZoom) {
                this.$amap.setZoom(14, 100)
            }
            if (isCenter) {
                this.$nextTick(() => {
                    this.$amap.panTo([lng, lat], 100)
                })
            }
        },
        closeOverlayDetail(done) {
            this.showOverlayDetail = false
            this.activeOverlay = {}
            this.$emit('close')
            this.$amap.setZoom(11, 100)
            done()
        },
    },
}
