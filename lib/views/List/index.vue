<template>
  <!-- 大屏看板 -->
  <div class="layout-wrapper">
    <es-layout :column="1" :titles="['看板列表']" viewScale="1:0" :toolBar="{ viewScale: false }">
      <div slot="first-wrapper" class="es-wrapper">
        <es-table
          ref="esTable"
          :esTableObj="bigDataObj"
          :class="{ 'grid-mode': gridMode }"
          @pageNumFn="changePageNum"
          @btnFn="btnFn"
          @inquireFn="queryEvent"
          @on-reset-queryform="resetEvent"
        >
          <template #middleContent>
            <template v-if="gridMode">
              <div class="kanboard-list">
                <div v-for="item in bigDataObj.tableObj.data" :key="item.id" class="item">
                  <div
                    class="thumbnail"
                    :style="`background-image: url(${item.snapshot || 'static/images/kanban/no-snapshot.png'})`"
                    :title="item.name"
                    @click="showKanbaordImage(item)"
                  ></div>
                  <h3 class="title">
                    <span :title="item.name" class="name"
                          @click="$router.push({ name: 'big-data-edit', params: { kanboardId: item.id } })">
                      {{ item.name }}
                      <Icon class="edit-icon" size="18" type="ios-create"/>
                    </span>
                    <span class="create-time">{{ item.createTime }}</span>
                  </h3>
                  <div class="remark">
                    <div :title="item.remark" class="content">{{ item.remark || '暂无说明' }}</div>
                  </div>
                  <div class="action">
                    <div v-if="item.hexCode" class="kanboard-link">
                      看板链接
                      <Icon size="24" type="ios-copy" class="copy" title="复制" @click="copyLink(item)"/>
                      <a :href="generateKanboardLink(item)" target="_blank" title="打开">
                        <Icon size="24" type="md-open"></Icon>
                      </a>
                    </div>
                    <div v-else class="kanboard-link">
                      尚未发布
                      <span class="publish-kanboard" @click="publish(item)">发布看板</span>
                    </div>
                    <div class="buttons">
                      <div class="button" title="修改"
                           @click="$router.push({ name: 'big-data-edit', params: { kanboardId: item.id } })">
                        <Icon size="24" type="ios-create"/>
                      </div>
                      <div
                        class="button"
                        title="预览"
                        @click="
                          previewBoardId = item.id
                          showPreBoard = true
                        "
                      >
                        <Icon size="24" type="ios-eye"/>
                      </div>
                      <div class="button" title="删除" @click="delBoard(item)">
                        <Icon size="24" type="ios-trash"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </es-table>
      </div>
    </es-layout>
    <!-- 看板预览 -->
    <transition name="preview-fade">
      <pre-board
        v-if="showPreBoard"
        ref="previewBoard"
        :kanboardId="previewBoardId"
        @close="
          showPreBoard = false
          previewBoardId = null
        "
      />
    </transition>
    <transition name="fade">
      <import-kanboard v-if="showKanboardImport" @update-list="getKanboardList" @close="showKanboardImport = false"/>
    </transition>
  </div>
</template>
<script>
  /**
   * @description
   *
   * todo 待重构
   * 1. 分离 esvcp-pc-ui
   * 2. 分离 item-card
   * 3. 分离 item-table
   * 4. 命名规范
   */
  import {Debounce} from '../../vendor/debounce'
  import preBoard from '../preview'
  import importKanboard from './import-kanboard'

  export default {
    components: {
      preBoard,
      importKanboard
    },
    data() {
      return {
        gridMode: true,
        kanboardId: null, // 修改项ID
        previewBoardId: null, // 修改项ID
        // table 当前页
        currentPage: 1,
        // table 配置
        bigDataObj: {
          parent: 'event-table-container',
          queryObj: {
            col: 7,
            btnArr: [],
            btnConcat: true,
            dictArr: {
              projectId: [],
              status: [
                {
                  key: '0',
                  value: '未发布'
                },
                {
                  key: '1',
                  value: '已发布'
                }
              ]
            },
            formArr: [
              {
                name: '看板名称',
                type: 0,
                key: 'name',
                isShow: true
              }, {
                name: '创建日期',
                type: 5,
                key: 'createTime',
                isShow: true
              }, {
                name: '状态',
                type: 1,
                key: 'status',
                isShow: true
              }
            ]
          },
          tableObj: {
            selectable: true,
            pageObj: {
              total: 0,
              pageNum: 1,
              pageSize: 10,
              showElevator: true
            },
            btnArr: [
              {
                name: '新建看板',
                type: 'primary',
                id: 'add'
              },
              {
                name: '导入看板',
                type: 'default',
                id: 'import-kanboard'
              },
              {
                name: '切换视图',
                type: 'default',
                id: 'layout-toggle'
              }
            ],
            columns: [
              {
                title: '看板标题',
                minWidth: 150,
                key: 'name'
              },
              {
                title: '缩略图',
                minWidth: 100,
                key: 'snapshot',
                render: (h, params) => {
                  const item = params.row
                  if (!item.snapshot) {
                    return h('img', {
                      attrs: {
                        src: 'static/images/kanban/no-snapshot.png',
                        alt: item.name,
                        title: '暂无快照',
                        height: 50
                      },
                      style: {
                        display: 'block',
                        margin: '5px'
                      }
                    })
                  }
                  return h('img', {
                    attrs: {
                      src: item.snapshot,
                      alt: item.name,
                      title: item.name,
                      height: 50
                    },
                    style: {
                      display: 'block',
                      cursor: 'pointer',
                      margin: '5px'
                    },
                    on: {
                      click: () => {
                        this.showKanbaordImage(item)
                      },
                      error: () => {
                        item.snapshot = 'static/images/kanban/no-snapshot.png'
                      }
                    }
                  })
                }
              },
              {
                title: '创建时间',
                width: 190,
                key: 'createTime'
              },
              {
                title: '更新时间',
                width: 190,
                key: 'updateTime'
              },
              {
                title: '看板链接',
                minWidth: 320,
                key: 'shareUrl',
                render: (h, params) => {
                  if (!params.row.hexCode) {
                    return [
                      h('span', '尚未发布'),
                      h(
                        'span',
                        {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#459dee',
                            cursor: 'pointer',
                            marginLeft: '8px'
                          },
                          on: {
                            click: () => {
                              this.publish(params.row)
                            }
                          }
                        },
                        '发布看板'
                      )
                    ]
                  }
                  const shareUrl = this.generateKanboardLink(params.row)
                  return h('div', {
                    style: {
                      display: 'flex',
                      'align-items': 'center'
                    }
                  }, [
                    h('Icon', {
                      style: {
                        marginRight: '5px',
                        cursor: 'pointer'
                      },
                      attrs: {
                        title: '复制'
                      },
                      props: {
                        type: 'ios-copy',
                        size: 24,
                        color: '#2d8cf0'
                      },
                      on: {
                        click: () => {
                          if (this.$clipboard(shareUrl)) {
                            this.$Message.success('复制成功！')
                          }
                        }
                      }
                    }),
                    h(
                      'a',
                      {
                        style: {
                          display: 'inline-flex',
                          'align-items': 'center',
                          'line-height': 1.2
                        },
                        attrs: {
                          href: shareUrl,
                          target: '_blank'
                        }
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'md-open',
                            size: 20
                          }
                        }),
                        shareUrl
                      ]
                    )
                  ])
                }
              },
              {
                title: '说明',
                minWidth: 200,
                key: 'remark',
                ellipsis: true,
                render: (h, params) => {
                  const text = params.row.remark
                  return h(
                    'div',
                    {
                      'class': 'ivu-table-cell-ellipsis',
                      attrs: {
                        title: text
                      }
                    },
                    text
                  )
                }
              },
              {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 115,
                render: (h, params) => {
                  return h('div', [
                    h(
                      'span',
                      {
                        props: {
                          type: 'text',
                          size: 'small'
                        },
                        style: {
                          color: '#459dee',
                          cursor: 'pointer',
                          marginRight: '8px'
                        },
                        on: {
                          click: () => {
                            this.btnFn({id: 'edit', pro: params.row})
                          }
                        }
                      },
                      '修改'
                    ),
                    h(
                      'span',
                      {
                        props: {
                          type: 'text',
                          size: 'small'
                        },
                        style: {
                          color: '#459dee',
                          cursor: 'pointer',
                          marginRight: '8px'
                        },
                        on: {
                          click: () => {
                            this.showPre(params.row)
                          }
                        }
                      },
                      '预览'
                    ),
                    h(
                      'span',
                      {
                        props: {
                          type: 'text',
                          size: 'small'
                        },
                        style: {
                          color: '#f54e40',
                          cursor: 'pointer'
                        },
                        on: {
                          click: () => {
                            this.delBoard(params.row);
                          }
                        }
                      },
                      '删除'
                    )
                  ]);
                }
              }
            ],
            data: []
          }
        },
        showKanboardImport: false,
        showPreBoard: false // 预览弹窗
      };
    },
    created() {
      this.getKanboardList()
    },
    methods: {
      generateKanboardLink(data) {
        const time = data.publishTime || data.updateTime || data.createTime
        const version = time ? new Date(time).getTime() : ''
        // todo 接口需求：接口生成分享 id (即发布 id)
        return `${location.origin}/#/kanboard/${data.hexCode}?v=${version}`
      },
      copyLink(item) {
        if (this.$clipboard(this.generateKanboardLink(item))) {
          this.$Message.success('复制成功！')
        }
      },
      showKanbaordImage(item) {
        this.$Modal.info({
          title: item.name,
          render: h => h('img', {
            attrs: {
              src: item.snapshot,
              alt: item.name,
              width: 960
            }
          }),
          width: 1000,
          'mask-closable': true,
          closable: true,
          mask: false
        })
      },
      setTitle(title) {
        document.title = title
      },
      // 列表页页面跳转
      changePageNum(pageNum, pageSize, formItem) {
        this.currentPage = pageNum;
        this.getKanboardList();
      },
      // 获取项目列表
      getKanboardList() {
        const list = this.bigDataObj.tableObj
        const pageObj = list.pageObj
        const params = {
          pageSize: pageObj.pageSize,
          pageNum: this.currentPage,
          type: 0
        };
        this.$api.getKanbanDataList(params, 'postPaging').then(res => {
          if (res.responseCode == 100000) {
            const records = res.result.list || []
            list.data = records;
            pageObj.total = Number(res.result.total);
          }
        }).catch(e => console.warn(e))
      },
      // 列表页查询
      queryEvent: Debounce(function (params = {}) {
        const list = this.bigDataObj.tableObj;
        const pageObj = list.pageObj
        pageObj.pageNum = 1;
        params.pageSize = pageObj.pageSize
        params.pageNum = pageObj.pageNum
        params.type = 0
        const createTime = params.createTime
        if (createTime) {
          params.startDate = createTime[0]
          params.endDate = createTime[1]
        }
        const queryParams = {...params}
        delete queryParams.createTime
        this.$api.getKanbanDataList(queryParams, 'postPaging').then(res => {
          if (res.responseCode == 100000) {
            const records = res.result.list || []
            list.data = records;
            pageObj.total = Number(res.result.total);
          }
        }).catch(e => console.warn(e))
      }, 500),
      // 重置
      resetEvent: Debounce(function () {
        this.currentPage = 1;
        this.bigDataObj.tableObj.pageObj.pageNum = 1;
        this.getKanboardList();
      }, 500),
      // 列表页按钮操作
      btnFn(obj) {
        switch (obj.id) {
          case 'add':
            this.$router.push({name: 'big-data-new'})
            break;
          case 'edit':
            this.$router.push({name: 'big-data-edit', params: {kanboardId: obj.pro.id}})
            break;
          case 'layout-toggle':
            this.gridMode = !this.gridMode
            break;
          case 'import-kanboard':
            this.importKanboard()
            break;
          default:
            break;
        }
      },
      // 删除
      delBoard({id: dataBoardId}) {
        this.$Modal.confirm({
          title: '提示',
          content: '确认删除此看板吗？',
          loading: true,
          onOk: () => {
            this.$api.delBoard({dataBoardId}).then(res => {
              if (res.responseCode == '100000') {
                this.$Message.success('删除成功')
                this.getKanboardList()
                this.$Modal.remove()
              }
            }).catch((err) => {
              console.info(err)
              this.$Modal.remove()
            })
          }
        })
      },
      // 预览
      showPre({id}) {
        this.previewBoardId = id
        this.showPreBoard = true
      },
      publish({id}) {
        this.$Modal.confirm({
          title: '提示',
          content: '确认发布此看板吗？',
          loading: true,
          onOk: () => {
            this.$api.publishBoard({id}).then(res => {
              if (res.responseCode == 100000) {
                this.$Message.success('发布成功！')
                this.getKanboardList()
                this.$Modal.remove()
              }
            }).catch((err) => {
              this.$Modal.remove()
            })
          }
        })
      },
      importKanboard() {
        this.showKanboardImport = true
      }
    },
    watch: {
      showPreBoard(value) {
        if (value) {
          document.body.requestFullscreen()
        } else {
          document.fullscreenElement && document.exitFullscreen()
        }
      },
      title: {
        handler: function (value) {
          this.setTitle(value)
        },
        immediate: true
      }
    },
    computed: {
      title() {
        const title = ['数据看板']
        this.showPreBoard && title.unshift('预览')
        return title.join(' - ')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-wrapper {
    padding: 0 !important;
  }

  .preview-fade-enter-active,
  .preview-fade-leave-active {
    transition: 0.4s;
  }

  .preview-fade-enter,
  .preview-fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  .grid-mode {
    height: 100%;

    /deep/ {
      .ivu-table-wrapper {
        display: none;
      }

      .middle-content-slot {
        height: calc(100% - 100px);
      }
    }
  }

  .kanboard-list {
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
      width: calc((100% - 120px) / 5);
      border-radius: 5px;
      background-color: white;
      overflow: hidden;
      margin: 0 30px 25px 0;
      transition: 0.2s;

      &:nth-child(5n) {
        margin-right: 0;
      }

      &:hover {
        box-shadow: 0 2px 10px rgba(45, 140, 240, 0.5);
      }
    }

    @media (max-width: 1600px) {
      .item {
        width: calc((100% - 90px) / 4);

        &:nth-child(5n) {
          margin-right: 30px;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
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
      font-size: 1.5em;
      border-left: #e2e2e2 1px solid;
      border-right: #e2e2e2 1px solid;

      .edit-icon {
        margin-top: -2px;
        color: #727272;
      }

      &:hover {
        cursor: pointer;
      }

      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .create-time {
        width: 75px;
        line-height: 1.1;
        font-size: 12px;
        letter-spacing: 0;
        opacity: 0.9;
        font-weight: normal;
        text-align: right;
      }
    }

    .remark {
      padding: 15px;
      color: #565656;
      border: 1px solid #e2e2e2;
      border-bottom: none;
      font-size: 1.3rem;
      line-height: 1.3;

      .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
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
      font-size: 1.4em;
      overflow: hidden;
      color: #333;

      .kanboard-link {
        .copy {
          cursor: pointer;
        }

        opacity: 0.7;

        &:hover {
          opacity: 0.9;
        }
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

    .publish-kanboard {
      cursor: pointer;
      color: #2d8cf0;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
<style lang="scss">
  body {
    letter-spacing: 0;
  }

  .screenshot {
    /deep/ {
      .vdr-custom-style {
        &:before,
        &:after {
          display: none;
        }

        .handle {
          display: none !important;
        }
      }

      .guides-wrapper {
        overflow: hidden;
      }

      .layout-grid-row,
      .layout-grid-col {
        background-color: rgba(0, 0, 0, 0.1);

        .grid {
          background-color: rgba(0, 87, 145, 0.2);
        }

        .widget-part {
          &:before,
          &:after {
            display: none;
          }
        }
      }
    }
  }
</style>

