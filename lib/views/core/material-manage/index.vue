<template>
	<Modal
		title="素材管理"
		v-model="showModal"
		width="900"
		height="600"
		:isDirectCloseModal="false"
		class="material-modal"
		@on-cancel="exit"
		@on-visible-change="setVisibility"
	>
		<div class="modal-body">
			<ul class="group">
				<li v-for="{ label, group } in categories" :key="group" :class="{ active: group === currnetGroup }"
					class="item" @click="currnetGroup = group">
					{{ label }}
					<div class="number" @click.stop>
						{{ totalMap[group] || '--' }}
					</div>
				</li>
			</ul>
			<div class="material-list">
				<ul ref="list" class="materials">
					<li v-if="currnetGroup !== '-1'" class="item upload" @click="startUpload(currnetGroup)">
						<div class="thumbnail-wrapper">
							<div class="thumbnail">
								<Icon class="upload" type="md-cloud-upload" size="48"/>
								上传
							</div>
						</div>
					</li>
					<li v-for="item in materials" :key="item.id" class="item">
						<div class="thumbnail-wrapper">
							<div class="thumbnail" @click="preview(item)">
								<img :src="item.src" :alt="item.decription" :title="item.decription"/>
							</div>
						</div>
						<div class="title">{{ item.name || '未命名' }}</div>
						<div v-show="currnetGroup === '-1'" class="group-name">{{ categories.find((group) => group.group
							=== item.group).label }}
						</div>
						<div class="delete" title="删除" @click="deleteMaterial(item)">×</div>
					</li>
				</ul>
				<Page
					class="paganation"
					:current.sync="page"
					:total="totalMap[currnetGroup]"
					:page-size="count"
					:page-size-opts="[15, 30, 60, 120]"
					show-sizer
					show-total
				/>
				<Spin size="large" fix v-if="loading"></Spin>
				<material-upload
					:showModal="showUploadModal"
					:group="uploadGroup"
					:dataBoardId="dataBoardId"
					@close="
            showUploadModal = false
            getMaterials()
          "
				/>
			</div>
		</div>
		<div slot="footer">
			<Button type="default" @click.native="exit">关闭</Button>
		</div>
	</Modal>
</template>
<script>
	import {Spin, Modal, Button,Page} from 'view-design'
	import materialUpload from './material-upload'

	export default {
		name: 'material-manage-modal',
		components: {
			materialUpload, Spin, Modal, Button,Page
		},
		props: {
			// 弹窗状态
			showModal: {
				type: Boolean,
				default: false
			},
			group: {
				type: String,
				default: '-1'
			},
			dataBoardId: {
				type: String,
				default: undefined
			}
		},
		data() {
			return {
				isVisible: true,
				categories: [
					{
						group: '-1',
						label: '全部素材'
					},
					{
						group: '0',
						label: '看板背景'
					},
					{
						group: '1',
						label: '标题背景'
					},
					{
						group: '2',
						label: '容器背景'
					},
					{
						group: '3',
						label: '装饰素材'
					},
					{
						group: '4',
						label: '其他素材'
					}
				],
				currnetGroup: this.group,
				showUploadModal: false,
				materials: [],
				loading: false,
				totalMap: {
					'-1': 0,
					'0': 0,
					'1': 0,
					'2': 0,
					'3': 0,
					'4': 0
				},
				page: 1,
				count: 15,
				uploadGroup: undefined
			}
		},
		methods: {
			exit() {
				this.$emit('close');
			},
			setVisibility(status) {
				if (status) this.isVisible = true
				if (!status) {
					setTimeout(() => {
						this.isVisible = false
					}, 400)
				}
			},
			getMaterials() {
				this.loading = true
				let type = this.currnetGroup
				if (type === '-1') type = ''
				if (type) type = +type
				this.$api.getMaterials({
					dataBoardId: this.dataBoardId || null,
					type,
					pageSize: this.count,
					pageNum: this.page
				}).then(response => {
					if (response.responseCode === '100000') {
						const {list, total} = response.result
						this.materials = list.map(item => {
							if (item.src) return item
							item.src = item.url
							item.group = item.type.toString()
							delete item.url
							delete item.type
							return item
						})
						this.totalMap[type.toString() || '-1'] = total
						this.$refs.list.scrollTo({top: 0})
					}
					this.loading = false
				}).catch(error => {
					this.$Message.warning('素材列表获取失败！')
					console.warn('素材获取失败：', error)
					this.loading = false
				})
			},
			deleteMaterial({src, id}) {
				this.$Modal.confirm({
					title: '提示',
					content: '是否删除该素材？',
					onOk: () => {
						this.$api.deleteMaterial({id}).then(() => {
							this.$api.deleteFile.post({ossUrl: src}).then(() => {
							}).catch(() => {
								this.$Message.warning('素材记录已删除，远端素材删除失败！')
							})
							this.getMaterials()
						}).catch(error => {
							this.$Message.warning('素材删除失败！')
							console.warn('素材删除失败：', error)
						})
					}
				});
			},
			startUpload(group) {
				if (group === '-1') group = ''
				this.uploadGroup = group ? +group : null
				this.showUploadModal = true
			},
			preview({name, src}) {
				this.$Modal.info({
					title: name,
					render: h => h('img', {
						attrs: {
							src,
							alt: name,
							width: 960
						}
					}),
					width: 1000,
					'mask-closable': true,
					closable: true
				})
			}
		},
		watch: {
			showModal(show) {
				this.page = 1
				show && this.getMaterials()
			},
			currnetGroup() {
				this.page = 1
				this.getMaterials()
			},
			page() {
				this.getMaterials()
			},
			count() {
				this.getMaterials()
			}
		}
	};
</script>
<style lang="scss" scoped>
	/deep/ {
		.ivu-modal-body {
			padding: 0 !important;
		}
	}

	.modal-body {
		display: flex;
		height: 100%;

		.group,
		.material-list {
			height: 100%;
		}

		.group {
			width: 180px;
			border-right: 1px solid #f2f2f2;
			margin: 0;
			padding: 0;
			flex-shrink: 0;
			flex-grow: 0;

			.item {
				width: 100%;
				height: 60px;
				border-bottom: 1px solid #f2f2f2;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 25px;
				font-size: 14px;
				cursor: pointer;

				&:last-child {
					border-bottom: none;
				}

				&:hover {
					background-color: #f9f9f9;
				}

				.number {
					height: 18px;
					line-height: 18px;
					padding: 0 7px;
					font-size: 12px;
					border-radius: 9px;
					background-color: #a8a8a8;
					color: white;
				}

				&.active {
					background-color: #e9f4ff;
				}
			}
		}

		.material-list {
			position: relative;
			display: flex;
			flex-direction: column;
			flex-grow: 1;

			.materials {
				flex-grow: 1;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				padding: 5px 15px 0;
				height: 100%;
				overflow-x: hidden;

				.item {
					position: relative;
					width: 24%;
					display: flex;
					flex-direction: column;
					margin-top: 10px;
					margin-left: 1%;
					// &:nth-child(4) {
					//   margin-left: 0;
					// }
					.thumbnail-wrapper {
						position: relative;
						width: 100%;
						height: 0;
						padding-bottom: 100%;

						.thumbnail {
							position: absolute;
							top: 0;
							left: 0;
							bottom: 0;
							right: 0;
							display: flex;
							justify-content: center;
							align-items: center;
							border: 1px solid #e2e2e2;
							background-image: url(../icons/transparent-bg.png);
							background-size: 32px;
							overflow: hidden;
							cursor: pointer;

							img {
								max-width: 100%;
								max-height: 100%;
								transition: 1s cubic-bezier(0.1, 0.9, 0.55, 1);
							}
						}
					}

					.group-name,
					.delete {
						position: absolute;
						top: 5px;
						height: 18px;
						background-color: black;
						border-radius: 9px;
						color: white;
						font-weight: lighter;
						text-align: center;
						line-height: 18px;
					}

					.delete {
						width: 18px;
						right: 5px;
						font-size: 18px;
						opacity: 0;
						cursor: pointer;
						transition: 0.2s;

						&:hover {
							background-color: red;
							opacity: 1 !important;
						}
					}

					.group-name {
						background-color: grey;
						left: 5px;
						width: auto;
						padding: 0 7px;
						font-size: 12px;
					}

					.title {
						line-height: 1.5;
						white-space: pre-wrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding-top: 5px;
					}

					&:hover {
						.thumbnail {
							img {
								transform: scale(1.2);
							}
						}

						.delete {
							opacity: 0.4;
						}
					}

					&.upload {
						.thumbnail {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							line-height: 3;
							background-image: none;
							font-size: 15px;
							transition: 0.2s;

							&:hover {
								background-color: #e9f4ff;
							}
						}
					}
				}
			}

			.paganation {
				margin: 15px auto;

				/deep/ {
					.ivu-select-selection {
						height: 28px;
					}

					.ivu-select-selected-value {
						line-height: 28px;
					}

					.ivu-page-total {
						position: relative;
					}
				}
			}
		}
	}

	.material-modal /deep/ .ivu-modal-body {
		overflow: visible !important;
	}
</style>
