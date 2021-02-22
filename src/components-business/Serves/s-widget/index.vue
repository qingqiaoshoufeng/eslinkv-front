<template>
	<div class="widget-part" :style="styles" v-if="data">
    <ul class="list">
      <li v-for="(k, i) in curr" :key="i">
        <div :class="['index', getIndexClass(i)]">{{ getIndex(i) }}</div>
        <div class="main">
          <div class="main-top">
            <span>{{ k.name }}</span>
            <b>{{ k.num | toThousand }}</b>
          </div>
          <div class="cons">
            <div class="val" :style="{width: k.percent + '%'}"></div>
          </div>
        </div>
      </li>
    </ul>
    <img src="./img/page.svg" class="page" @click="nextPage">
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import { config, value } from './index.component'

	const SIZE = 8
	export default {
		mixins: [mixins],
    data() {
      return {
        loop: 0
      }
    },
    computed: {
      curr () {
        if (!this.data) return []
        return this.data.list.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
      }
    },
    methods: {
      nextPage () {
        if (this.loop === Math.ceil(this.data.list.length / SIZE) - 1) {
          this.loop = 0
        } else {
          this.loop++
        }
      },
      getIndex (n) {
        const num = n + 1 + this.loop * SIZE
        return num < 10 ? '0' + num : num
      },
      getIndexClass (n) {
        let res = ''
        let num = this.getIndex(n)
        switch (num) {
          case '01':
          case '02':
          case '03':
            res = 'top'
            break
          default:
            res = ''
        }
        return res
      }
    },
		created() {
			this.configValue = this.parseConfigValue(value);
		}
	};
</script>
<style lang="scss" scoped>
.page {
  position: absolute;
  right: 0;
  top: 200px;
  cursor: pointer;
}
.list {
  padding: 0 16px 0 8px;
  position: relative;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .index {
      font-family: font-num;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      color: #FFFFFF;
      margin-right: 12px;
      background: rgba(0, 221, 255, 0.5);
      border-top: 2px solid #00DDFF;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.top {
        background: rgba(255, 114, 23, 0.6);
        border-top-color: #FF7217;;
      }
    }
    .main {
      .main-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        span {
          font-size: 20px;
          color: #FFFFFF;
        }
        b {
          font-family: font-num;
          font-style: normal;
          font-weight: bold;
          font-size: 24px;
          color: #FFFFFF;
        }
      }
      .cons {
        width: 404px;
        height: 8px;
        background: #0057A9;
        .val {
          position: relative;
          height: 100%;
          width: 0;
          background: linear-gradient(270deg, #00DDFF 0%, rgba(0, 221, 255, 0.5) 100%);
          &:after {
            content: '';
            display: block;
            width: 4px;
            height: 8px;
            background: #fff;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }
  }
}
</style>

