function findAmapRoot() {
    if (this.$amap) return this.$amap
    let parent = this.$parent
    if (parent) {
        let fun = findAmapRoot.bind(parent)
        return fun()
    }
}
export default {
    props: {
        visible: {
            type: Boolean,
            default: true,
        },
        overlayIcon: {
            type: String,
            default: '',
        },
        overlayType: {
            type: String,
            default: '',
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.instanceArr.forEach((instance) => {
                    instance.show()
                })
            } else {
                this.instanceArr.forEach((instance) => {
                    instance.hide()
                })
            }
        },
    },
    created() {
        this.instanceArr = []
        let fun = findAmapRoot.bind(this)
        this.$amap = fun()
        this.init && this.init()
    },
    beforeDestroy() {
        this.instanceArr.forEach((instance) => {
            this.$amap.remove(instance)
            if (instance.setDataSet instanceof Function) {
                instance.setDataSet({
                    data: [{}],
                    max: 4000,
                });
            }
        })
        this.instanceArr = null
    },
}
