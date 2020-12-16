<template>
  <table @mouseenter="isStop = true" @mouseleave="isStop = false">
    <thead>
      <tr>
        <th v-for="(k, i) in titles" :key="i">{{ k }}</th>
      </tr>
    </thead>
    <tr v-for="(k, index) in curr" :key="index">
      <td>{{ k.v1 }}</td>
      <td>{{ k.v2 }}</td>
      <td>{{ k.v3 }}</td>
      <td>{{ k.v4 }}</td>
      <td :class="{handled: k.v5 === '已处理'}">{{ k.v5 }}</td>
    </tr>
  </table>
</template>
<script>

export default {
  props: {
    list: Array,
    titles: Array,
    size: Number
  },
  data() {
    return {
      timer: null,
      loop: 0,
      isStop: false
    }
  },
  watch: {
    list: {
      handler(val) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if (this.isStop) return
          if (this.loop === Math.ceil(val.length / this.size)- 1) {
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
      if (!this.list) return []
      return this.list.slice(this.loop * this.size, (this.loop + 1) * this.size)
    }
  },
  methods: {
    getIndex (n) {
      const num = n + 1 + this.loop * this.size
      return num < 10 ? '0' + num : num
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
};
</script>
<style lang="scss" scoped>
table{
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  thead {
    background: rgba(23,123,255,0.2);
  }
  th {
    font-size: 18px;
    line-height: 24px;
    font-weight: normal;
    color: #00CBF4;
    height: 40px;
  }
  td {
    font-size: 18px;
    line-height: 24px;
    color: #FFFFFF;
    height: 40px;
    &:nth-child(1) {
      width: 20%;
    }
    &:nth-child(2) {
      width: 35%;
    }
    &:nth-child(3) {
      width: 25%;
    }
    &:nth-child(4) {
      width: 20%;
      color: #FFDC45;
    }
    &:nth-child(5) {
      color: #FFDC45;
      &.handled {color: #00DDFF;}
    }
  }
}
</style>

