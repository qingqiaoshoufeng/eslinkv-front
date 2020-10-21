<template>
  <div>
    <button class="ivu-btn ivu-btn-primary field-button" @click="setQueryCond">{{ label }}</button>
    <template v-if="opened">
      <es-modal
        title="图表参数函数配置"
        :show-modal="openModal"
        :height="height"
        :isDirectCloseModal="false"
        @on-cancel="exit"
        @on-visible-change="setVisibility"
        @keyup.native.46.stop
      >
        <div slot="body" class="modal-body">
          <js-editor ref="editor" v-if="isVisible" v-model="source" />
        </div>
        <div slot="footer" class="footer">
          <Button type="default" @click.native="exit">取消</Button>
          <Button type="primary" @click.native="ok">确定</Button>
        </div>
      </es-modal>
    </template>
  </div>
</template>
<script>
import jsEditor from '../../../../components/js-editor.vue'
export default {
  name: 'echarts-function-edit',
  components: {
    jsEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '函数配置'
    },
    tips: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    enable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      opened: false,
      openModal: false,
      height: '100%',
      source: '',
      isVisible: false,
      activeKey: 0,
      collectTemplate: []
    }
  },
  methods: {
    setQueryCond () {
      if (!this.enable) {
        this.$Message.warning('请先在小工具配置面板开启函数配置！')
        return
      }
      this.opened = true
      const value = this.value ? JSON.parse(this.value) : {}
      const methodBody = value.methodBody || ''
      this.source = this.tips + methodBody
      setTimeout(() => {
        this.opened = true
        this.openModal = true
      })
    },
    exit () {
      this.openModal = false
    },
    ok () {
      const source = this.source.replace(this.tips, '')
      this.$emit('input', JSON.stringify({
        anonymous: this.options,
        methodBody: source
      }))
      this.openModal = false
    },
    setVisibility (status) {
      status ? requestAnimationFrame(() => {
        this.isVisible = true
        setTimeout(() => {
          // console.info(this.$refs)
         this.$refs && this.$refs.editor.$forceUpdate()
        })
      }) : setTimeout(() => {
        this.isVisible = false
      }, 400)
    }
  }
}
</script>
<style lang="scss" scoped>
  /deep/ {
    .ivu-modal-body {
      padding: 0 15px 0 0 !important;
      .CodeMirror-gutter-wrapper {
        left: -30px !important;
      }
    }
    .ivu-tabs-bar {
      margin-bottom: 5px;
    }
    .ivu-table-wrapper {
      border-top: none;
      border-left: none;
      .ivu-table:before {
        height: 0;
      }
      .ivu-table:after {
        width: 0;
      }
      tbody {
        tr:last-of-type {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
