<template>
  <div class="d-footer fn-flex">
    <div class="d-footer-left fn-flex">
      <slot name="left"/>
    </div>
    <div class="d-footer-right fn-flex">
        <span style="padding-right: 25px">
          <a class="doc-link" href="http://zentao.eslink.cc/zentao/doc-browse-596-bymodule-2555-id_desc-doc.html"
             target="_blank" rel="nofollow" title="使用文档">
            使用文档 <i-icon type="md-help-circle"/>
          </a>
        </span>
      <slot name="right"/>
    </div>
  </div>
</template>
<script>
  import {Icon} from 'view-design'

  export default {
    name: 'DFooter',
    components: {
      'i-icon': Icon
    }
  }
</script>
<style lang="scss">
  .d-footer {
    width: 100%;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

    /deep/ button {
      margin-left: 10px;
    }

    .d-footer-left, .d-footer-right {
      align-items: center;

      .return {
        margin-left: 0;
      }
    }

    .d-footer-left {
      .d-footer-title {
        font-size: 15px;
        padding: 0 15px 0 0;
      }
    }
  }
</style>
