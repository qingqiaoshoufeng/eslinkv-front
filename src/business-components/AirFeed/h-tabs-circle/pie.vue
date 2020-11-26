<template>
  <div class="chart" ref="chart"></div>
</template>

<script>

export default {
  props: ['data'],
  watch: {
    data: {
      handler(val) {
        this.$nextTick(() => {
          this.instance = echarts.init(this.$refs.chart).setOption(this.getOption())
        })
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getOption () {
      const total = this.data.reduce((p, n) => p + n.count, 0)
      const list = this.data.map(v => {
        return {
          name: v.name,
          value: v.count,
        }
      })
      return {
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['45%', '55%'],
          avoidLabelOverlap: false,
          startAngle: 270,
          color: ['#2c99ff', '#18CEB9', '#db4f49', '#367cf6', '#84e4fc', '#f8cd47', '#fceb50', '#ed9144', '#5fcbb9'],
          label: {
            formatter: function(params) {
              const percent = ~~(params.value * 100 / total)
              return `{normal|${params.name}}\n{value|${params.value} ${percent}%}`
            },
            padding: [0, -100],
            rich: {
              normal: {
                fontSize: 12,
                lineHeight: 24,
                color: '#fff',
                padding: [0, 11, 0, 10],
                align: 'left'
              },
              value: {
                align: 'left',
                fontSize: 12,
                lineHeight: 24,
                color: '#fff',
                padding: [0, 0, 0, 0],
              }
            }
          },
          labelLine: {
            length: 10,
            length2: 80
          },
          data: list
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>