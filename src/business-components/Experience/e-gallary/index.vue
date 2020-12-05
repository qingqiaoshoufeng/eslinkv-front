<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="container">
      <div class="item" v-for="(k, i) in data.list" :key="i">
        <div class="cover" :style="{backgroundImage:`url(${k.cover})`}">
          <div class="mask"></div>
        </div>
        <div class="sq">{{ k.name }}</div>
      </div>
    </div>
    <div class="main-mask"></div>
	</div>
</template>
<script>
import mixins from '../../mixins';

const config = {
  animation: true
};
const value = {
	api: {
		data: JSON.stringify({
      list: [
        {
          name: '第一期',
          cover: '/static/images/experience/cover01.png'
        },
        {
          name: '第二期',
          cover: '/static/images/experience/cover01.png'
        },
        {
          name: '第三期',
          cover: '/static/images/experience/cover01.png'
        },
        {
          name: '第四期',
          cover: '/static/images/experience/cover01.png'
        },
        {
          name: '第五期',
          cover: '/static/images/experience/cover01.png'
        },
        {
          name: '第六期',
          cover: '/static/images/experience/cover01.png'
        },
        {
          name: '第七期',
          cover: '/static/images/experience/cover01.png'
        },
        {
          name: '第八期',
          cover: '/static/images/experience/cover01.png'
        }
      ]
    })
	}
}
export default {
	mixins: [mixins],
  data () {
	  return {
    }
  },
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.container {
  padding-right: 30px;
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &::-webkit-scrollbar {
    width: 12px;
    height: 32px;
    /*height: 4px;*/
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: #00DDFF;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0,0,0,0);

  }

  .item {
    margin-bottom: 32px;
    &.active .sq, &:hover .sq {
      background-image: url("./img/sq-bg-active.svg");
    }
    .cover {
      position: relative;
      width: 120px;
      height: 172px;
      margin-bottom: 8px;
      background-size: 100% 100%;
      cursor: pointer;
      &:hover .mask{display: block;}
      .mask {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5) url("./img/search.svg") no-repeat center;
      }
    }
    .sq {
      width: 120px;
      height: 32px;
      line-height: 32px;
      background: url("./img/sq-bg.svg");
      background-size: 100% 100%;
      font-size: 20px;
      color: #fff;
    }
  }
}
.main-mask {
  background: linear-gradient(180deg, rgba(3, 9, 109, 0) 0%, #03096D 100%);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
}
</style>

