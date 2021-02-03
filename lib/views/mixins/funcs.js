export default {
    data () {
        return {
            height: '100%',
            kanboardEdited: false,
            isInEditor: true
        }
    },
    methods: {
        updateModelHeight (e) {
            this.height = e.clientHeight
        },
        // 预览按钮
        clickPre () {
            const parent = this.$parent
            parent.showPreBoard = true
            this.$nextTick(() => {
                const value = this.$refs.kanboardEditor.prepareKanboardData().attribute
                parent.$refs.previewBoard.refill(JSON.parse(value))
            })
        }
    },
    mounted () {
        window.addEventListener('resize', this.updateModelHeight)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.updateModelHeight)
    }
}
