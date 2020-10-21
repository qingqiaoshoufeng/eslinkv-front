import html2canvas from 'html2canvas'
export default {
    data () {
        return {
            screenshotCreating: false,
            metaCache: {
                Pragma: undefined,
                'Cache-Control': undefined,
                Expires: undefined
            }
        }
    },
    methods: {
        disabledCache () {
            const metaCache = this.metaCache
            Object.keys(metaCache).forEach(item => {
                const meta = document.querySelector(`meta[http-equiv="${item}"]`)
                if (meta) {
                    metaCache[item] = meta.content
                    meta.content = item !== 'Expires' ? 'no-cache' : 0
                } else {
                    const meta = document.createElement('meta')
                    meta.setAttribute('http-equiv', item)
                    meta.content = item !== 'Expires' ? 'no-cache' : 0
                    document.head.appendChild(meta)
                }
            })
        },
        resetCacheSetting () {
            const metaCache = this.metaCache
            Object.keys(metaCache).forEach(item => {
                const meta = document.querySelector(`meta[http-equiv="${item}"]`)
                const cachedValue = metaCache[item]
                if (cachedValue === undefined) {
                    meta.remove()
                } else {
                    meta.content = cachedValue
                }
            })
        },
        /**
         * 快照上传
         * @param {File} blob 快照数据
         * @param {Number} type 快照类型， 0：看板, 1:模板，2:布局模板
         * @param {*} resolve
         * @param {*} reject
         */
        upload (blob, type, resolve, reject) {
            const name = `kanboard-screenshot-${Date.now()}.jpg`
            const data = new FormData()
            data.append('file', blob, name)
            data.append('type', type)
            this.$api.uploadFile(data).then(({ data }) => {
                if (data.responseCode === '100000') {
                    resolve(data.result)
                } else {
                    this.$Message.success(data.message)
                    reject(data.message)
                }
            }).catch(reject).finally(() => {
                this.screenshotCreating = false
            })
        },
        /**
         * 请求创建快照
         * @param {Object} 参数表
         * selector: String 选择器，指定截取快照的元素
         * type: Number 快照类型
         * returnSource: Boolean 是否返回快照资源，默认为 false，返回快照链接
         * options: Object html2canvas 参数表
         */
        capture ({ selector, type = 0, returnSource = false, options = {} }) {
            this.screenshotCreating = true

            // 禁用图片缓存
            // this.disabledCache()

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    html2canvas(document.querySelector(selector), {
                        allowTaint: true,
                        scale: 1,
                        useCORS: true,
                        ...options,
                        onclone: function () {
                            // 确保一般短期入场动画执行完毕
                            return new Promise(resolve => {
                                setTimeout(resolve, 1000)
                            })
                        }
                    }).then(canvas => {
                        try {
                            if (!returnSource) {
                                canvas.toBlob(blob => {
                                    this.upload(blob, type, resolve, reject)
                                }, 'image/jpeg', 0.9)
                            } else {
                                resolve(canvas.toDataURL('image/jpeg', 0.9))
                            }
                        } catch (e) {
                            if (e.message.indexOf('Tainted canvases') > -1) {
                                this.$Message.warning('请检查是否使用了外部素材！')
                            }
                            this.screenshotCreating = false
                            reject(e)
                        }
                    }).catch(error => {
                        this.screenshotCreating = false
                        reject(error)
                    })
                }, 10)
            })
        }
    },
    watch: {
        screenshotCreating (value) {
            if (!value) {
                // this.resetCacheSetting()
            }
        }
    }
}
