<template>
  <div class="widget-part" :style="styles" v-if="data">
    <image-view :images="images" :option="option" :show-image="false" class="art"></image-view>
    <img class="tooltip" src="./img/tooltip.svg">
  </div>
</template>
<script>
import ImageView from '@/components/ImageView'
import mixins from '../../mixins';

const config = {
  animation: true
}
const value = {
  api: {
    data: JSON.stringify({})
  }
}
export default {
  mixins: [mixins],
  components: {
    ImageView
  },
  data() {
    return {
      images: ['/static/images/airfeed/art.svg'],
      option: {
        "inline": true,
        "button": false,
        "navbar": false,
        "title": false,
        "toolbar": true,
        "tooltip": true,
        "movable": true,
        "zoomable": true,
        "rotatable": false,
        "scalable": false,
        "transition": false,
        "fullscreen": false,
        "keyboard": false
      },
    }
  },
  methods: {},
  created() {
    this.configSource = this.parseConfigSource(config)
    this.configValue = this.parseConfigValue(config, value)
  }
}
</script>
<style lang="scss" scoped>
.widget-part {
  .art {
    width: 100%;
    height: 100%;
  }
  .tooltip {
    position: absolute;
    right: 1.2%;
    top: 39.05%;
    width: 257px;
  }
}
</style>

