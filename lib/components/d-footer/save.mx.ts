import html2canvas from 'html2canvas'

export default {
	data() {
		return {
			screenshotCreating: false,
		}
	},
	methods: {
		async addBoard() {
			const data = this.platFormData()
			data.type = this.type
			this.$Modal.confirm({
				title: '快照',
				content: '是否创建看板快照？',
				onOk: async () => {
					const snapshot = await this.capture({
						selector: '#kanban',
					}).catch(e => {
						console.warn('快照创建失败', e)
					});
					if (snapshot) data.snapshot = snapshot
					this.submitAdd(data)
				},
				onCancel: () => {
					this.submitAdd(data)
				},
				okText: '创建',
				cancelText: '跳过',
			})
		},
		editBoard() {
			if (this.isNew) {
				this.addBoard()
				return
			}
			const data = this.platFormData()
			this.$Modal.confirm({
				title: '快照',
				content: '是否更新看板快照？',
				onOk: async () => {
					const snapshot = await this.capture({selector: '#kanban'}).catch(e => {
						console.warn('快照创建失败', e)
					})
					if (snapshot) data.snapshot = snapshot
					this.submitEdit(data)
				},
				onCancel: () => {
					this.submitEdit(data)
				},
				okText: '更新',
				cancelText: '跳过'
			})
		},
		submitAdd(data) {
			this.loading = true
			this.$api.board.add(data).then(res => {
				this.kanboardEdited = false
				this.$Message.success('保存成功！')
				this.loading = false
				this.$router.back()
			}).catch(() => {
				this.loading = false
			})
		},
		submitEdit(data) {
			this.saving = true
			const {params: {id}} = this.$route
			data.type = this.type
			this.$api.board.update({...data, id}).then((res) => {
				this.kanboardEdited = false
				this.$Message.success('修改成功')
				this.loading = false
				this.saving = false
			}).catch(() => {
				this.loading = false
				this.saving = false
			})
		},
		/**
		 * 快照上传
		 * @param {File} blob 快照数据
		 * @param {Number} type 快照类型， 0：看板, 1:模板，2:布局模板
		 * @param {*} resolve
		 * @param {*} reject
		 */
		upload(blob, resolve, reject) {
			const name = `screenShot-${Date.now()}.jpg`
			const data = new FormData()
			data.append('file', blob, name)
			data.append('type', this.type)
			this.$api.uploadFile(data).then((data) => {
				resolve(data)
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
		capture({selector, returnSource = false, options = {}}) {
			this.screenshotCreating = true

			// 禁用图片缓存
			// this.disabledCache()
			return new Promise((resolve, reject) => {
				html2canvas(document.querySelector(selector), {
					allowTaint: true,
					scale: 1,
					useCORS: true,
					...options,
					// onclone: function () {
					// 	return new Promise(resolve)
					// }
				}).then(canvas => {
					console.log(canvas.toDataURL('image/jpeg', 0.9))
					try {
						if (!returnSource) {
							canvas.toBlob(blob => {
								this.upload(blob, resolve, reject)
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
			})
		}
	}
}
