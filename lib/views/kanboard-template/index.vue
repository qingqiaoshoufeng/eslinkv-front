<template>
  <!-- 选择模板 -->
  <div class="step kanboard-template">
    <div class="blank-template">
      <div class="no-config template" title="创建空白画布" @click="$emit('create-kanboard', {})"><Icon type="ios-add" size="48" /></div>
      <div class="size-preset-template">
        <div v-for="item in sizePreset" :key="`${item.size.width}-${item.size.height}`" class="template" @click="$emit('create-kanboard', item)">
          <div class="title">{{ item.title }}</div>
          <div class="size">{{ item.size.width + '×' + item.size.height }}</div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </div>
    </div>
    <div class="templates">
      <div class="select-template-title">选择模板</div>
      <template-list type="1" title="预设小工具模板" style="margin-right: 30px;" @use-template="(data) => $emit('create-kanboard', data)" />
      <template-list type="2" title="预设布局和参考线模板" @use-template="(data) => $emit('create-kanboard', data)" />
    </div>
  </div>
</template>
<script>
import templateList from "./list.vue"

export default {
  name: 'select-template',
  components: {
    templateList
  },
  data () {
    return {
      sizePreset: [
        {
          title: 'PC',
          size: {
            width: 1920,
            height: 1080,
            isMobileKanboard: false,
            deviceType: 'pc'
          },
          description: '桌面'
        },
        {
          title: 'PC',
          size: {
            width: 1600,
            height: 900,
            isMobileKanboard: false,
            deviceType: 'pc'
          },
          description: '桌面小尺寸'
        },
        {
          title: 'Laptop',
          size: {
            width: 1366,
            height: 768,
            isMobileKanboard: false,
            deviceType: 'laptop'
          },
          description: '笔记本'
        },
        {
          title: 'Pad',
          size: {
            width: 768,
            height: 1024,
            isMobileKanboard: true,
            deviceType: 'pad'
          },
          description: '平板竖屏'
        },
        {
          title: 'Pad',
          size: {
            width: 1024,
            height: 768,
            isMobileKanboard: true,
            deviceType: 'pad'
          },
          description: '平板横屏'
        },
        {
          title: 'Mobile',
          size: {
            width: 375,
            height: 667,
            isMobileKanboard: true,
            deviceType: 'mobile'
          },
          description: '手机竖屏'
        },
        {
          title: 'Mobile',
          size: {
            width: 667,
            height: 375,
            isMobileKanboard: true,
            deviceType: 'mobile'
          },
          description: '手机横屏'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .kanboard-template {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px 100px 0;
    .blank-template {
      display: flex;
      justify-content: center;
      min-height: 180px;
      .no-config {
        width: 240px;
      }
      .template {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #e2e2e2;
        border: currentColor 1px solid;
        cursor: pointer;
        margin: 15px;
        transition: 0.4s;
        &:hover {
          color: #2d8cf0;
          box-shadow: #2d8bf07e 0 2px 10px;
        }
      }
      .size-preset-template {
        display: flex;
        flex-wrap: wrap;
        .template {
          padding: 15px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 140px;
          .title {
            color: #797979;
            font-size: 1.3em;
            text-align: center;
            line-height: 1.2;
            margin-bottom: 15px;
          }
          .desc {
            margin-top: 15px;
            color: #969696;
          }
        }
      }
    }

    .templates {
      position: relative;
      height: calc(100% - 180px);
      display: flex;
      padding-top: 110px;
    }
    .select-template-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-size: 1.8em;
      font-weight: bold;
      letter-spacing: 2px;
      margin: 36px 0;
      &:before,
      &:after {
        content: '';
        width: 210px;
        height: 1px;
        background-color: #e2e2e2;
        margin: 0 15px;
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .kanboard-template {
      padding-left: 50px;
      padding-right: 50px;
      .select-template-title {
        margin: 25px 0;
      }
    }
  }
  @media screen and (max-width: 1440px) {
    .kanboard-template {
      padding-left: 0;
      padding-right: 0;
      .blank-template {
        min-height: 150px;
        .template {
          margin: 10px;
        }
      }
      .templates {
        height: calc(100% - 150px);
        padding-top: 60px;
      }
      .select-template-title {
        margin: 15px 0;
      }
    }
  }
</style>
