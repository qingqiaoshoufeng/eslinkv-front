<template lang="pug">
	label.hot-keys.pos-r
		span 查看快捷键
		.hot-key-list.pos-a
			table
				tr(v-for="item in _hotKeys" :key="item.name")
					td.name {{ item.name }}
					td.key-code
						code.hot-key-item {{ item.key }}
</template>
<script>
  export default {
    name: 'hot-keys',
    created() {
      this._hotKeys = [
        {name: '插入水平参考线', key: 'Alt+H'},
        {name: '插入垂直参考线', key: 'Alt+V'},
        {name: '锁定标尺参考线', key: 'Alt+L'},
        {name: '清除全部参考线', key: 'Alt+C'},
        {name: '隐藏标尺参考线', key: 'Alt+R'},
        {name: '缩放画布', key: 'Ctrl+滚轮'},
        {name: '移动画布', key: 'Ctrl+左键'},
        {name: '水平移动画布', key: 'Shift+滚轮'},
        {name: '垂直移动画布', key: '滚轮'},
        {name: '删除选定小工具', key: 'Delete'},
        {name: '画布全屏切换', key: 'F11'}
      ]
    }
  }
</script>

<style lang="scss">
  .hot-keys {
    .hot-key-list {
      left: 50%;
      bottom: 100%;
      transform: translate3d(-50%, -20px, 0);
      opacity: 0;
      padding: 10px;
      pointer-events: none;
      transition: 0.2s;
      color: #717171;
      background: white;
      border-radius: 7px;
      border: #2d8cf0 3px solid;
      filter: drop-shadow(#2d8cf094 0 4px 7px);

      td {
        white-space: nowrap;

        &.name {
          text-align: right;
          padding: 3px 10px;
          letter-spacing: 0;
        }

        &.key-code {
          padding-right: 10px;

          .hot-key-item {
            background-color: #2d8cf0;
          }
        }
      }

      &:after {
        content: '\1F893';
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin: auto;
        color: #2d8cf0;
        font-size: 48px;
        line-height: 48px;
        width: 36px;
        text-align: center;
        height: 0;
        filter: drop-shadow(0 4px 4px rgba(45, 140, 240, 0.58));
        pointer-events: none;
      }
    }

    &:hover {
      color: #eaea2e;

      .hot-key-list {
        opacity: 1;
        pointer-events: auto;
        transform: translate3d(-50%, -10px, 0);
      }
    }
  }

  .hot-key-item {
    position: relative;
    background-color: grey;
    padding: 1px 5px;
    border-radius: 3px;
    color: white;
  }
</style>
