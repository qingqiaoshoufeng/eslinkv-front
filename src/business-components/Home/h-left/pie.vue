<template>
  <div class="wrap">
    <div class="chart" ref="chart"></div>
    <div class="unit">单位：万m³</div>
  </div>
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
      const total = this.data.reduce((p, n) => p + n.value, 0)
      return {
        title: {
          text: '区域',
          subtext: '销售气量',
          left: 'center',
          top: '42%',
          textStyle: {
            color: '#fff',
            fontSize: 24,
            fontWeight: 600
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 24,
            fontWeight: 600
          }
        },
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['52%', '64%'],
          avoidLabelOverlap: false,
          startAngle: 270,
          color: ['#00FFCF', '#2194FF', '#E5615B'],
          label: {
            formatter: function(params) {
              const percent = (params.value * 100 / total).toFixed(2)
              return `{normal|${params.name}}\n{value|${params.value} ${percent}%}`
            },
            padding: [0, -100],
            rich: {
              normal: {
                fontSize: 20,
                lineHeight: 24,
                color: '#fff',
                padding: [0, 11, 0, 10],
                align: 'left'
              },
              value: {
                align: 'left',
                fontSize: 18,
                lineHeight: 24,
                color: '#fff',
                padding: [-6, 0, 0, 0],
              }
            }
          },
          labelLine: {
            length: 25,
            length2: 140
          },
          data: this.data
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
    width: 100%;
    height: 412px;
    .unit {
      position: absolute;
      bottom: 24px;
      right: 24px;
      font-size: 18px;
      line-height: 24px;
      color: #FFFFFF;
    }
  }
  .chart {
    width: 100%;
    height: 100%;
    background: url("/static/images/home/loop-bg.svg") no-repeat center;
  }
</style>