<template>
  <es-modal title="素材上传" :show-modal="showModal" height="400" :isDirectCloseModal="false" @on-cancel="exit" @on-visible-change="setVisibility">
    <div slot="body" class="modal-body">
      <Upload
        v-if="showModal"
        multiple
        :action="url"
        :max-size="5000"
        :before-upload="() => (uploading = true)"
        :on-success="uploadDone"
        :on-remove="deleteFile"
        :on-error="onError"
        :on-format-error="onFormatError"
        :on-exceeded-size="onExceededSize"
        :format="['jpeg', 'png', 'gif', 'webp', 'webm', 'jpg', 'svg']"
        :class="{ 'show-file-list': uploading || uploadTotal }"
        type="drag"
        accept="image/*,.svg,.webp,.webm"
      >
        <div style="padding: 20px 0;">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff;"></Icon>
          <p>点击选择文件或将文件拖入此处以上传</p>
        </div>
      </Upload>
      <Spin size="large" fix v-if="uploading"></Spin>
    </div>
    <div slot="footer">
      <Button type="default" @click.native="exit" :disabled="uploading">关闭</Button>
    </div>
  </es-modal>
</template>
<script>

export default {
  name: 'material-upload',
  components: {
  },
  props: {
    // 弹窗状态
    showModal: {
      type: Boolean,
      default: false
    },
    group: {
      type: Number,
      default: null
    },
    dataBoardId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      height: '100%',
      isVisible: true,
      url: process.env.NODE_ENV !== 'production' ? 'api/oss/uploadFile' : 'oss/uploadFile',
      uploading: false,
      uploadTotal: 0,
      uploadedCount: 0,
      uploadedMaterials: []
    }
  },
  methods: {
    exit () {
      this.$emit('close');
    },
    setVisibility (status) {
      if (status) this.isVisible = true
      if (!status) {
        setTimeout(() => {
          this.isVisible = false
        }, 400)
      }
    },
    saveMaterials () {
      let material = this.uploadedMaterials
      if (material.length) {
        material = JSON.stringify(material)
        this.$api.saveMaterials({ material }).then(response => {
          if (response.responseCode === '100000') {
            this.$Message.success('上传成功！')
            this.uploadedMaterials.splice(0)
          } else {
            this.$Message.warning(`上传失败：${response.message}`)
          }
        }).catch(error => {
          this.$Message.warning('上传失败!')
          console.warn(`上传失败：`, error)
        }).finally(() => {
          this.uploading = false
        })
      } else {
        this.uploading = false
      }
    },
    uploadDone (response, file, files) {
      this.uploadTotal = files.length
      if (response.responseCode === '100000') {
        this.uploadedMaterials.push({
          dataBoardId: this.dataBoardId || null,
          name: file.name,
          src: response.result,
          type: this.group
        })
        this.uploadedCount++
      } else {
        this.$Message.warning(`${file.name}上传失败：${response.message}`)
        this.uploadedCount++
      }
    },
    deleteFile (file, files) {
      this.$api.deleteFile.post({ ossUrl: file.response.result }).then(() => {
        this.$Message.success('删除成功！')
      }).catch(e => {
        console.warn(e)
        this.$Message.warning('删除失败！')
      })
    },
    onError () {
      this.uploading = false
      this.$Message.warning('上传失败！')
    },
    onFormatError () {
      this.uploading = false
      this.$Message.warning('只允许上传图片类型附件！')
    },
    onExceededSize () {
      this.uploading = false
      this.$Message.warning('单个文件最大尺寸限制为5M！')
    }
  },
  watch: {
    uploadedCount (count) {
      if (count === this.uploadTotal) this.saveMaterials()
    },
    showModal (show) {
      if (!show) {
        this.uploadedMaterials.splice(0)
        this.uploadTotal = 0
        this.uploadedCount = 0
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  /deep/ {
    .ivu-modal-body {
      padding: 15px !important;
    }
    .ivu-upload {
      height: 100%;
      display: flex;
      .ivu-upload-drag {
        height: 100%;
        flex-grow: 1;
        & > div {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      .ivu-upload-list {
        width: 50%;
        height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        overflow-x: hidden;
        margin: 0;
        display: none;
        border-radius: 4px;
        background: #f9f9f9;
        .ivu-upload-list-file {
          padding: 4px 7px;
        }
      }
      &.show-file-list {
        .ivu-upload-list {
          margin-left: 15px;
          display: unset;
        }
      }
    }
  }
  .modal-body {
    position: relative;
    height: 100%;
  }
</style>
