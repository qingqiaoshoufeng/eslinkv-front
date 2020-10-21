<template>
  <div class="import-kanboard">
    <div class="wrapper">
      <header class="wrapper-header">
        导入看板
        <div class="close" title="关闭" @click="$emit('close')">×</div>
      </header>
      <Form ref="importForm" class="import-edit" :label-width="80">
        <FormItem label="选择文件">
          <label :data-name="originFile ? originFile.name || '请选择文件' : '请选择文件'" for="originFile" class="select-file style-file-input">
            <input id="originFile" type="file" accept="application/json" @change="hangleFile" />
          </label>
        </FormItem>
        <FormItem label="看板名称">
          <Input v-model="data.name" />
        </FormItem>
        <FormItem label="看板说明">
          <Input v-model="data.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" />
        </FormItem>
        <FormItem v-if="widgets" class="widget-list" label="小工具清单">
          <div class="widgets-confirm-header">
            未勾选的小工具在导入时将被舍弃!
            <span class="count">{{ checkedNumber }} / {{ widgets.length }}</span>
            <Checkbox :value="isAllChecked" :indeterminate="!isAllChecked && !isAllUnChecked" @on-change="handleAllCheck">全选</Checkbox>
          </div>
          <div v-for="item in widgets" :key="item.id" class="style-checkbox" @click="widgetCheckedState[item.id] = !widgetCheckedState[item.id]">
            <Icon :color="widgetCheckedState[item.id] ? '#2d8cf0' : 'gray'" :type="`ios-checkbox${widgetCheckedState[item.id] ? '' : '-outline'}`" size="18" />
            <span class="id">{{ item.id }}</span>
            <span class="type">{{ item.type }}</span>
            <span class="name">{{ item.name }}</span>
          </div>
        </FormItem>
      </Form>
      <footer class="wrapper-footer">
        <Button @click="$emit('close')">取消导入</Button>
        <Button @click="handleReset">重置</Button>
        <Button type="primary" @click="startImport" :disabled="!this.config" :loading="loading">执行导入</Button>
      </footer>
    </div>
  </div>
</template>
<script>
import widgetTypes from '../core/widgets/widget-type-list'
export default {
  name: 'import-kanboard',
  components: {},
  data () {
    return {
      data: {
        name: '',
        remark: ''
      },
      originFile: null,
      config: null,
      widgetCheckedState: {},
      loading: false
    }
  },
  methods: {
    hangleFile (e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      this.originFile = file
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result)
          this.config = data
          this.data.name = data.name
          this.data.remark = data.remark
        } catch (e) {
          this.$Message.error('配置文件识别失败！')
        }
      }
      reader.onerror = e => {
        this.$Message.error('配置文件识别失败！')
      }
      reader.readAsText(file)
    },
    handleReset () {
      this.$refs.importForm.$el.reset()
      this.originFile = null
      this.config = null
      this.widgetCheckedState = {}
      this.data = {
        name: '',
        remark: ''
      }
    },
    startImport (e) {
      this.loading = true
      const data = { ...this.config.data }
      const { name, remark } = this.data
      const { kanboard, widgets } = data
      kanboard.info.name = name
      kanboard.info.remark = remark
      data.widgets = [...widgets.filter(widget => this.widgetCheckedState[widget.id])]
      this.$api.addBoard({
        name,
        remark,
        attribute: JSON.stringify(data),
        type: 0
      }).then(res => {
        if (res.responseCode == 100000) {
          this.$Message.success('导入成功！')
          console.info(res)
          this.$emit('update-list')
          this.$emit('close')
        }
      }).catch(() => {
        this.$Message.warning('导入失败')
      }).finally(() => {
        this.loading = false
      })
    },
    handleAllCheck (state) {
      Object.keys(this.widgetCheckedState).map(id => {
        this.widgetCheckedState[id] = state
      })
    }
  },
  computed: {
    widgets () {
      if (!this.config) return
      this.widgetCheckedState = {}
      return this.config.data.widgets.map(widget => {
        const { id, type, value } = widget
        const { name } = value.widget
        return {
          id,
          type: widgetTypes[type],
          name: name || '未命名小工具'
        }
      })
    },
    checkedNumber () {
      return Object.values(this.widgetCheckedState).filter(item => item).length
    },
    isAllChecked () {
      return Object.values(this.widgetCheckedState).findIndex(item => !item) === -1
    },
    isAllUnChecked () {
      return Object.values(this.widgetCheckedState).findIndex(item => item) === -1
    }
  },
  watch: {
    widgets: {
      handler: function (value) {
        if (!value) return
        value.forEach(item => {
          this.$set(this.widgetCheckedState, item.id, true)
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
  .import-kanboard {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.2);
    .wrapper {
      width: 600px;
      height: 540px;
      margin: auto;
      background-color: white;
      border: 1px solid #e2e2e2;
      box-shadow: rgba(0, 0, 0, 0.5) 0 10px 24px;
      padding: 10px 20px 10px 25px;
    }
  }
  .import-edit {
    width: 100%;
    height: calc(100% - 120px);
    padding-right: 5px;
    display: block;
    overflow-x: hidden;
  }
  .wrapper-header {
    font-size: 18px;
    line-height: 2em;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .close {
      font-size: 2em;
      cursor: pointer;
      font-weight: normal;
    }
  }
  .style-file-input {
    position: relative;
    overflow: hidden;
    min-width: 100px;
    padding: 7px 20px;
    text-align: center;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    input {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      pointer-events: none;
    }
    &:before {
      content: attr(data-name);
    }
    &:hover,
    &:focus {
      color: #57a3f3;
      border-color: currentColor;
    }
  }
  .style-checkbox {
    border: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    padding: 0 8px;
    margin-bottom: 5px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    .type {
      width: 120px;
      padding: 0 12px;
      white-space: nowrap;
    }
    .id {
      padding-left: 10px;
    }
  }
  .widgets-confirm-header {
    border: 1px solid #dcdfe6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding-left: 8px;
  }
  .wrapper-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-top: 15px;
    /deep/ .ivu-btn {
      margin: 0 7px;
    }
  }
  .widget-list {
    label {
      position: sticky;
      top: 15px;
    }
  }
</style>
