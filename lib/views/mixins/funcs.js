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
    },
    mounted () {
        window.addEventListener('resize', this.updateModelHeight)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.updateModelHeight)
    }
}
