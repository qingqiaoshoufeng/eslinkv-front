<template>
	<div class="widget-part" :style="styles" @click="back">
    <img src="/static/icons/back.svg">
		<div class="txt">返回</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

  const config = {animation: true}
  const value = {
    api: {
      data: JSON.stringify({
        sceneId: ''
      })
    }
  }

	export default {
		mixins: [mixins],
		created() {
      this.configSource = this.parseConfigSource(config);
      this.configValue = this.parseConfigValue(config, value);
		},
    methods: {
		  back () {
		    if (!this.data.sceneId) return
        console.log(this.data.sceneId)
		    window.GoldChart.scene.destroyScene(this.data.sceneId)
      }
    }
	}
</script>
<style lang="scss" scoped>
.widget-part {
  display: flex;
  align-items: center;
  >img {
    width: 23px;
    height: 23px;
    margin-right: 12px;
  }
  .txt {
    font-size: 32px;
    line-height: 32px;
    color: #FEFFFF;
  }
}
</style>

