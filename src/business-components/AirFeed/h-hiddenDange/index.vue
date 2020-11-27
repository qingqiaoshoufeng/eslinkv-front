<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="container":style="{
	  transform: `translateX(-${100*tabSwitch}%)`
	}">
      <dangerList :data="data.data1"></dangerList>
      <dangerTable :data="data.data2"></dangerTable>
    </div>
    <div class="icon-right" @click="changeTab"></div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import dangerList from "./dangerList";
import dangerTable from "./dangerTable";

const config = {
	animation: true
};
const value = {
	api: {
		data: JSON.stringify({
      data1: {
        dangerNum: 32,
        handleDangerNum: 9,
        unhandleDangerNum: 23,
        finishRate: 78,
      },
      data2: [
        {
          name: '阀门异常',
          type: '调压器',
          total: 32,
          handled: 31,
          unhandled: 1,
        },
        {
          name: '压力异常',
          type: '调压器',
          total: 30,
          handled: 28,
          unhandled: 2,
        },
        {
          name: '管道破裂',
          type: '调压器',
          total: 27,
          handled: 25,
          unhandled: 2,
        },
        {
          name: '阀门异常',
          type: '调压器',
          total: 20,
          handled: 20,
          unhandled: 0,
        },
        {
          name: '阀门异常',
          type: '调压器',
          total: 18,
          handled: 16,
          unhandled: 2,
        },
        {
          name: '阀门异常',
          type: '调压器',
          total: 18,
          handled: 16,
          unhandled: 2,
        },
        {
          name: '阀门异常',
          type: '调压器',
          total: 18,
          handled: 16,
          unhandled: 2,
        }
      ]
    })
	}
};
export default {
	mixins: [mixins],
  components: {
    dangerList, dangerTable
  },
  data () {
	  return {
	    tabSwitch: false
    }
  },
  methods: {
    changeTab () {
      this.tabSwitch = !this.tabSwitch
    }
  },
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	}
};
</script>
<style lang="scss" scoped>
.widget-part {
  position: relative;
  overflow: hidden;
  .container {
    display: flex;
    transition: transform 0.4s;
  }
  .icon-right {
    position: absolute;
    background: url("./img/page.svg") no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 40px;
    right: 0;
    top: 74px;
    cursor: pointer;
  }
}
</style>

