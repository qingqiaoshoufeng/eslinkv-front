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
    data(){
        return {
            hasLoad:false
        }
    },
    watch: {
        visible(val) {
            if (val) {
                if(this.hasLoad){
                    this.instanceArr.forEach((instance) => {
                        instance.show()
                    })
                }else{
                    this.init()
                }
            } else {
                this.instanceArr.forEach((instance) => {
                    instance.hide()
                    if (instance.setDataSet) {
                        instance.setDataSet({
                            data: [],
                            max: 0,
                        })
                    }
                })
            }
        },
    },
     created() {
        this.instanceArr = []
        let fun = findAmapRoot.bind(this)
        this.$amap = fun()
        if(this.visible){
            this.init && this.init()
            this.hasLoad = true
        }
    },
    methods: {
        clearInstance() {
            this.instanceArr.forEach((instance) => {
                this.$amap.remove(instance)
                //热力图特殊处理
                if (instance.setDataSet) {
                    instance.setDataSet({
                        data: [],
                        max: 0,
                    })
                }
            })
            this.instanceArr = null
        }
    },
    beforeDestroy() {
        this.clearInstance()
    },
}
