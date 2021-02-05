export default {
	methods: {
		// 新建看板
		saveBoard(data) {
			this.loading = true;
			this.$api.board
				.add(data)
				.then(res => {
					this.kanboardEdited = false;
					this.$Message.success('保存成功！');
					this.loading = false;
					this.$router.back();
				})
				.catch(() => {
					this.loading = false;
				});
		},

		async addBoard() {
			const data = this.platFormData()
			// 数据类型：0:看板, 1:小工具模板, 2:参考线模板
			data.type = 0;
			this.$Modal.confirm({
				title: '快照',
				content: '是否创建看板快照？',
				onOk: async () => {
					const snapshot = await this.capture({
						selector: '#kanban',
					}).catch(e => {
						console.warn('快照创建失败', e);
					});
					if (snapshot) data.snapshot = snapshot;
					this.saveBoard(data);
				},
				onCancel: () => {
					this.saveBoard(data);
				},
				okText: '创建',
				cancelText: '跳过',
			});
		},

		// 修改看板
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
					this.submitKanboard(data)
				},
				onCancel: () => {
					this.submitKanboard(data)
				},
				okText: '更新',
				cancelText: '跳过'
			})
		},

		submitKanboard(data) {
			this.saving = true
			const {params: {id}} = this.$route
			data.type = 0 // 数据类型：0:看板, 1:小工具模板, 2:参考线模板
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
