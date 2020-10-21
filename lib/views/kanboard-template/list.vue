<template>
  <div class="template-list-wrapper">
    <div class="group-title">
      {{ title }}
      <span class="create-template" @click="createTemplate">新建 <Icon type="md-add" title="新建模板" /></span>
    </div>
    <div class="template-list">
      <div v-for="item in templateList" :key="item.id" class="item">
        <div
          class="thumbnail"
          :style="`background-image: url(${item.snapshot || 'static/images/kanban/no-snapshot.png'})`"
          :title="item.name"
          @click="item.snapshot && showTemplateImage(item)"
        ></div>
        <h3 class="title">
          <span :title="item.name" class="name">{{ item.name }}</span>
        </h3>
        <div class="action">
          <Button class="copy-link" type="primary" size="small" @click="$emit('use-template', { templateId: item.id })">使用模板</Button>
          <div class="buttons">
            <div class="button" title="编辑模板" @click="editTemplate(item.id)">
              <Icon size="24" type="ios-create" />
            </div>
            <div class="button" title="删除模板" @click="delTemplate(item.id)"><Icon size="24" type="ios-trash" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: [Number, String],
      required: true,
      validator: value => [1, 2].includes(+value)
    }
  },
  data () {
    return {
      keywords: '',
      templateList: []
    }
  },
  methods: {
    // 获取模板列表
    getTemplateList () {
      // todo 接口需求：支持 type 查询参数
      this.$api.getKanbanDataList({
        name: this.keywords,
        type: this.type
      }).then(res => {
        if (res.responseCode == 100000) {
          const records = res.result.list || []
          this.templateList = records
        }
      }).catch(err => console.warn(err))
    },
    showTemplateImage (item) {
      this.$Modal.info({
        title: item.name,
        render: h => h('div', {
          style: 'position: relative;'
        }, [
          h('img', {
            attrs: {
              src: item.snapshot,
              alt: item.name,
              width: 960
            }
          }),
          h('div', {
            'class': 'use-button',
            on: {
              click: () => {
                this.$Modal.remove();
                setTimeout(() => {
                  this.$emit('use-template', { templateId: item.id })
                })
              }
            }
          }, '使用模板')
        ]),
        width: 1000,
        closable: true
      })
    },
    delTemplate (id) {
      this.$Modal.confirm({
        title: '提示',
        content: '确认删除此模板吗？',
        loading: true,
        onOk: () => {
          this.$api.delBoard({ dataBoardId: id }).then(res => {
            if (res.responseCode == 100000) {
              this.$Message.success('删除成功');
              this.$Modal.remove();
              this.getTemplateList()
            }
          }).catch((err) => {
            this.$Modal.remove();
          });
        }
      })
    },
    createTemplate () {
      this.$router.push({ name: 'big-data-template-add', params: { templateType: this.type } })
    },
    editTemplate (templateId) {
      this.$router.push({ name: 'big-data-template-edit', params: { templateId } })
    }
  },
  created () {
    this.getTemplateList()
  }
}
</script>

<style lang="scss" scoped>
  .template-list-wrapper {
    position: relative;
    width: calc(50% - 15px);
    height: calc(100% - 30px);
    min-height: 200px;
    padding: 50px 15px 15px;
    background-color: #f9f9f9;
    margin-right: 30px;
    .group-title {
      position: absolute;
      left: 25px;
      right: 25px;
      top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.5rem;
      .create-template {
        display: flex;
        align-items: center;
        opacity: 0.6;
        cursor: pointer;
        i {
          font-size: 17px;
          margin-top: -1px;
        }
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  .template-list {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 10px;
    overflow: hidden;
    overflow-y: auto;
    .item {
      display: flex;
      flex-direction: column;
      width: calc((100% - 60px) / 3);
      border-radius: 5px;
      background-color: white;
      overflow: hidden;
      margin: 0 30px 30px 0;
      transition: 0.2s;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 0 2px 10px rgba(45, 140, 240, 0.5);
      }
    }
    .thumbnail {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border: 1px solid #e2e2e2;
      border-radius: 5px 5px 0 0;
      cursor: pointer;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      font-size: 1.2em;
      border-left: #e2e2e2 1px solid;
      border-right: #e2e2e2 1px solid;
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .create-time {
        font-size: 12px;
        letter-spacing: 0;
        opacity: 0.9;
        font-weight: normal;
      }
    }
    .action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 15px;
      height: 42px;
      border: 1px solid #e2e2e2;
      border-radius: 0 0 5px 5px;
      font-size: 1.2em;
      overflow: hidden;
      color: #333;
      .copy-link {
        cursor: pointer;
      }
      .buttons {
        display: flex;
        .button {
          padding: 0 10px;
          height: 42px;
          line-height: 42px;
          border-left: 1px solid #e2e2e2;
          text-align: center;
          opacity: 0.7;
          cursor: pointer;
          &:hover {
            opacity: 0.9;
            background-color: #f9f9f9;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .template-list-wrapper {
      padding: 40px 10px 10px;
    }
    .template-list {
      .item {
        width: calc((100% - 30px) / 3);
        margin: 0 15px 15px 0;
      }
    }
  }
  @media screen and (max-width: 1440px) {
    .template-list {
      .item {
        width: calc((100% - 30px) / 2);
        margin: 0 30px 30px 0;
        &:nth-child(3n) {
          margin-right: 30px;
        }
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
</style>

<style lang="scss">
  .use-button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.3;
    width: 80px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    color: #333333;
    background: white;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
</style>
