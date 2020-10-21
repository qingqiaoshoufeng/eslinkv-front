export default {
  data () {
    return {
      crossFrameParams: {}
    }
  },
  methods: {
    handleMessageParam ({ data: message }) {
      const { type, data } = message
      if (type !== 'update-kanboard-params') return
      const crossFrameParams = this.crossFrameParams
      Object.keys(data).forEach(key => {
        const value = data[key]
        if (crossFrameParams[key] !== value) {
          this.$set(crossFrameParams, key, value)
        }
      })
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessageParam)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('message', this.handleMessageParam)
    })
  }
}