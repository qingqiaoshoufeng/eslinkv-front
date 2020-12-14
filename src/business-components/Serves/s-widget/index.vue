<template>
	<div class="widget-part" :style="styles" v-if="data">
    <ul class="list" @mouseenter="isStop = true" @mouseleave="isStop = false">
      <li v-for="(k, i) in curr" :key="i">
        <div class="top">
          <span>{{ k.name }}</span>
          <span class="font-num">{{ k.num | toThousand }}</span>
        </div>
        <div class="container">
          <div class="value" :style="{width: k.percent + '%'}"></div>
        </div>
      </li>
    </ul>
	</div>
</template>
<script>
	import mixins from '../../mixins';

	const config = {
		animation: true,
	};
	const value = {
		api: {
			data: JSON.stringify({
				list: Array(22).fill({
          name: '安装',
          num: 1231,
          percent: 60
        })
			})
		},
	};
  const SIZE = 16
	export default {
		mixins: [mixins],
    data() {
      return {
        timer: null,
        loop: 0,
        isStop: false
      }
    },
    watch: {
      data: {
        handler(val) {
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            if (this.isStop) return
            if (this.loop === Math.ceil(val.list.length / SIZE)- 1) {
              this.loop = 0
            } else {
              this.loop++
            }
          }, 2000)
        },
        deep: true,
        immediate: true
      },
    },
    computed: {
      curr () {
        if (!this.data) return []
        return this.data.list.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
      }
    },
    methods: {
      getIndex (n) {
        const num = n + 1 + this.loop * SIZE
        return num < 10 ? '0' + num : num
      }
    },
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    }
	};
</script>
<style lang="scss" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      margin-bottom: 30px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: 24px;
      line-height: 24px;
      color: #FFFFFF;
    }
    .container {
      width: 231px;
      height: 6px;
      background: #0057A9;
      margin-top: 4px;
      .value {
        background: #00DDFF;
        height: 100%;
        width: 0%;
      }
    }
  }
</style>

