export default {
  data () {
    return {
      isGroupExpand: {}
    }
  },
  methods: {
    addGroupItem (value, { keys }, max) {
      if (max && value.length >= max) {
        this.$Message.warning(`该字段最多只允许添加 ${max} 个项目`)
        return
      }
      const item = {}
      Object.keys(keys).forEach(key => {
        this.$set(item, key, keys[key])
      })
      value.push(item)
    },
    arrayGroupTemplateParser (template) {
      const result = {
        keys: {},
        template: []
      }
      template.forEach(item => {
        // 支持组合字段采集
        const isGroupFields = Array.isArray(item)
        if (isGroupFields) {
          item.forEach(item => {
            const { field } = item
            result.keys[field] = null
          })
          result.template.push(item)
          return
        }
        // 支持嵌套的配置面板
        const groupType = item.groupType
        const isConfigPanel = groupType && (groupType === 'Collapse' || groupType === 'Tabs')
        if (isConfigPanel) {
          const { group } = item
          result.keys[group] = {}
          result.template.push(item)
          return
        }
        // 支持普通单一的字段采集
        const { field } = item
        result.keys[field] = null
        result.template.push(item)
      })
      // console.info(result)
      return result
    },
    createGroup (h, value, { template }, {
      min, disableSort, noDeleteButton, hideItemsMoreThan
    }) {
      const length = value.length
      const actions = index => {
        const actions = !noDeleteButton ? [
          h(
            'Button',
            {
              'class': 'action-button delete-group',
              attrs: {
                title: '删除该组配置表单'
              },
              props: {
                icon: 'md-trash'
              },
              on: {
                click: e => {
                  e.stopPropagation()
                  if (min && length <= min) {
                    this.$Message.warning(`该字段须至少包含 ${min} 个项目`)
                    return
                  }
                  value.splice(index, 1)
                }
              }
            }
          )
        ] : []
        if (!disableSort) {
          actions.unshift(
            h(
              'Button',
              {
                'class': 'action-button sort-up',
                attrs: {
                  title: '上移'
                },
                props: {
                  icon: 'md-arrow-round-up',
                  size: 'small',
                  disabled: !index
                },
                on: {
                  click: e => {
                    e.stopPropagation()
                    const prevGroup = value.splice(index - 1, 1)[0]
                    value.splice(index, 0, prevGroup)
                  }
                }
              }
            ),
            h(
              'Button',
              {
                'class': 'action-button sort-down',
                attrs: {
                  title: '下移'
                },
                props: {
                  icon: 'md-arrow-round-down',
                  size: 'small',
                  disabled: index >= length - 1
                },
                on: {
                  click: e => {
                    e.stopPropagation()
                    const nextGroup = value.splice(index + 1, 1)[0]
                    value.splice(index, 0, nextGroup)
                  }
                }
              }
            )
          )
        }
        return actions
      }

      const groups = value.map((v, index) => {
        return h(
          'div',
          {
            class: 'fields-item'
          },
          [
            h(
              'fields',
              {
                props: {
                  value: v,
                  fields: template,
                  hideItemsMoreThan
                },
                on: {
                  input: data => {
                    value[index] = data
                  }
                }
              }
            ),
            h(
              'div',
              { 'class': 'group-action' },
              actions(index)
            )
          ]
        )
      })
      return groups
    },
    createArrayGroup (h, field, valueSet) {
      const {
        template, field: fieldName, label,
        min = 0, max, noHeader = false, disableSort = false,
        noAddButton = false, hideWhenEmpty = false, noDeleteButton = false,
        noHeaderAddButton = false, noHeaderClearButton = false,
        defaultCollapse = true, hideItemsMoreThan = 0, showCollapseButton = true
      } = field
      if (this.isGroupExpand[fieldName] === undefined) this.$set(this.isGroupExpand, fieldName, noHeader ? true : !defaultCollapse)
      const value = valueSet[fieldName]
      const parsedTemplate = this.arrayGroupTemplateParser(template)
      const isExpand = value.length ? this.isGroupExpand[fieldName] : true

      const hide = hideWhenEmpty && !value.length

      return h(
        'div',
        {
          class: ['array-group-wrapper', { hide }]
        },
        [
          !noHeader && h(
            'div',
            {
              class: 'array-group-title'
            },
            [
              this.createLabel(h, label, 'ios-photos'),
              h(
                'div',
                {
                  class: ['array-group-action']
                },
                [
                  showCollapseButton && value.length ? h(
                    'Button',
                    {
                      'class': ['action-button expand-group', { 'collapsed': !isExpand }],
                      attrs: {
                        title: isExpand ? '折叠配置组' : '展开配置组'
                      },
                      props: {
                        icon: isExpand ? 'ios-arrow-up' : 'ios-arrow-down',
                        shape: 'circle',
                        size: 'small'
                      },
                      on: {
                        click: e => {
                          e.stopPropagation()
                          this.isGroupExpand[fieldName] = !isExpand
                        }
                      }
                    }
                  ) : '',
                  !noHeaderAddButton ? h(
                    'Button',
                    {
                      'class': 'action-button add-group',
                      attrs: {
                        title: '添加组配置表单'
                      },
                      props: {
                        icon: 'md-add',
                        type: 'primary',
                        shape: 'circle',
                        size: 'small'
                      },
                      on: {
                        click: e => {
                          e.stopPropagation()
                          this.addGroupItem(value, parsedTemplate, max)
                        }
                      }
                    }
                  ) : '',
                  !noHeaderClearButton ? h(
                    'Button',
                    {
                      'class': 'action-button clear-group',
                      attrs: {
                        title: '清空组配置表单'
                      },
                      props: {
                        icon: 'md-close',
                        disabled: !value.length,
                        shape: 'circle',
                        size: 'small'
                      },
                      on: {
                        click: e => {
                          e.stopPropagation()
                          this.$Modal.confirm({
                            title: '确认',
                            content: '该操作不可恢复，确定清空当前配置吗？',
                            onOk: () => {
                              if (min) this.$Message.info(`该字段须至少包含 ${min} 个项目，清空时已保留最小数目！`)
                              value.splice(min || 0)
                            }
                          })
                        }
                      }
                    }
                  ) : ''
                ]
              )
            ]
          ),
          h(
            'div',
            {
              'class': ['array-group-body', { 'collapsed': !isExpand }]
            },
            this.createGroup(h, value, parsedTemplate, {
              min, disableSort, noDeleteButton, hideItemsMoreThan
            }).concat(!noAddButton ? [
              h(
                'Button',
                {
                  'class': 'action-button add-group',
                  attrs: {
                    title: '添加组配置表单'
                  },
                  props: {
                    icon: 'md-add',
                    size: 'small'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation()
                      this.addGroupItem(value, parsedTemplate, max)
                    }
                  }
                }
              )
            ] : [])
          )
        ]
      )
    }
  }
}