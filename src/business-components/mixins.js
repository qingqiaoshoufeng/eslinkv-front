import {styleParser, widgetMixin} from '../../lib'

export default {
    data() {
        return {
            instance: null,
            animateTimer: null,
            animateActiveIndex: -1,
            output: null,
        }
    },
    mixins: [widgetMixin],
    beforeDestroy() {
        this.instance = null
        clearInterval(this.animateTimer)
        clearTimeout(this.animateTimer)
        this.animateTimer = null
        this.animateActiveIndex = -1
    },
    computed: {
        styles() {
            const {layout} = this.config
            return styleParser(layout)
        },
        mergedConfig() {
            if (!this.config.config) return false
            return {...this.config.config}
        },
        id() {
            if (this.config) {
                if (this.config.widget) {
                    return `widget-part-${this.config.widget.id}${new Date * 1}`
                }
                return ''
            } else {
                return ''
            }
        }
    },
}
