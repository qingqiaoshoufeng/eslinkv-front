export default {
    props: {
        legendMap: {
            type: Object,
            default() {
                return {}
            },
        },
        activeItem: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            activeOverlay: {},
            showOverlayDetail: false,
        }
    },
    created() {
        this.$amap = this.$parent.$amap
    },
    watch: {
        activeItem(val) {
            if (JSON.stringify(val) === '{}') return false
            this.handleOverlayClick(val, 'WARN')
        },
    },

    methods: {
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
