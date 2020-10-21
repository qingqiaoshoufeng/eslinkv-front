<script>
	import {http} from '../../../../api/axios.js';
	import {Icon} from 'view-design'

	export default {
		name: 'upload-file',
		components: {
			Icon
		},
		props: {
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				innerValue: '',
				uploaded: false
			}
		},
		render: function (h) {
			const action = process.env.NODE_ENV !== 'production' ? 'api/oss/uploadFile' : 'oss/uploadFile'
			const getCurrentFile = h(
				'Upload',
				{
					'class': 'upload-file',
					props: {
						action,
						accept: '.json',
						maxSize: 5000,
						beforeUpload: this.beforeUpload,
						onSuccess: this.uploadDone,
						onRemove: this.deleteFile,
						onError: this.onError,
						onFormatError: this.onFormatError,
						onExceededSize: this.onExceededSize
					}
				},
				[
					h(
						'i-button',
						[
							h(
								'Icon',
								{
									props: {
										type: 'ios-cloud-upload-outline',
										size: '20'
									},
									style: 'color: #657180'
								}
							)
						]
					)
				]
			)
			return h(
				'div',
				{
					'class': ['upload-file'],
					ref: 'uploadFile'
				},
				[
					getCurrentFile
				]
			)
		},
		methods: {
			beforeUpload() {
				if (this.innerValue && this.uploaded) {
					this.$Message.success('请删除已上传文件！')
					return false
				}
			},
			uploadDone(response, file, files) {
				if (response.responseCode === '100000') {
					this.innerValue = response.result
					this.uploaded = true
				} else {
					this.innerValue = ''
					this.$Message.warning(`${file.name}上传失败：${response.message}`)
				}
			},
			deleteFile(file, files) {
				this.$api.deleteFile.post({ossUrl: file.response.result}).then(() => {
					this.innerValue = ''
					this.$Message.success('删除成功！')
				}).catch(e => {
					console.warn(e)
					this.$Message.warning('删除失败！')
				})
			},
			onError() {
				this.$Message.warning('上传失败！')
				this.innerValue = ''
			},
			onFormatError() {
				this.$Message.warning('只允许上传JSON类型附件！')
				this.innerValue = ''
			},
			onExceededSize() {
				this.$Message.warning('单个文件最大尺寸限制为5M！')
				this.innerValue = ''
			}
		},
		watch: {
			innerValue(value) {
				this.$emit('input', value)
			},
			value: {
				handler: function (value) {
					this.innerValue = value
				},
				immediate: true
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.upload-file {
		position: relative;

		/deep/ {
			ul.ivu-upload-list {
				position: absolute;
				left: 60px;
				right: 0;
				top: -6px;
			}
		}
	}
</style>
