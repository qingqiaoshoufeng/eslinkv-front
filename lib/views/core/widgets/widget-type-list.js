import decoration from './widget-list/decoration'
import dvChart from './widget-list/dv-chart'
import eChart from './widget-list/e-chart'
import other from './widget-list/other'

const types = [...decoration.widgets, ...eChart.widgets, ...dvChart.widgets, ...other.widgets].reduce((result, next) => {
  const { type, label, widgets } = next
  if (widgets) {
    widgets.forEach(({ type, label }) => {
      if (result[type]) return
      result[type] = label
    })
  } else {
    result[type] = label
  }
  return result
}, {})

export default types
