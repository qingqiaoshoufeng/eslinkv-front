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
        isModified () {
            return this.kanboardEdited
        },
        exit () {
            if (this.isModified()) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '看板已编辑，关闭窗口将丢失未保存的数据，确认关闭吗？',
                    onOk: () => {
                        this.kanboardEdited = false
                        this.$router.replace({ name: 'big-data-list' })
                    }
                })
                return
            }
			this.$router.go(-1)
        },
        goBack () {
            if (this.isModified()) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '看板已编辑，回到上一步将丢失未保存的数据，确认返回吗？',
                    onOk: () => {
                        this.currentStep = 0
                        this.kanboardEdited = false
                    }
                });
                return
            }
            this.currentStep = 0
        },
        publishBoard () {
            if (this.isModified()) {
                this.$Message.warning('请先保存看板！')
                return
            }
            this.$Modal.confirm({
                title: '提示',
                content: '确认发布此看板吗？',
                loading: true,
                onOk: () => {
                    this.$api.publishBoard({ id: this.kanboardId }).then(res => {
                        if (res.responseCode == 100000) {
                            this.$Message.success('发布成功！')
                            this.$emit('update-kanboard-list')
                            this.exit()
                        }
                        this.$Modal.remove()
                    }).catch((err) => {
                        this.$Modal.remove()
                    });
                }
            })
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
