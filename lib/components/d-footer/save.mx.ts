export default {
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
		}
	}
}
