/**
 * 比例条指令，根据传入的比值伸展条的视觉宽度
 * 使用方法：
 * <div class="my-ratio-bar-item absolute" v-ratio-bar.name="ratio"></div>
 * 指令值可以是对象类型，以实现更丰富的配置
 * js：
 * const option = {
 *   ratio: 0.75,
 *   color: 'red',
 *   duration: 1000,
 *   easing: ease,
 *   align: left,
 *   ready: (el, ratio, ratioBarName) => {
 *     console.info('ratio bar ready =>', el, ratio, ratioBarName)
 *   }
 * }
 * <div class="my-ratio-bar-item absolute" v-ratio-bar.name="option"></div>
 * 配置说明
 * ratio {number} 比值，0 <= ratio <=1
 * color {string|function} 颜色字符串或函数，函数用来根据自定义规则生成颜色值，函数携带当前 ratio 等参数，默认值 '#a80562'
 * duration {number} bar 图生长动画时长，单位: ms，默认 1000
 * easing {string} 缓动函数名称，支持全部 css3 animation-timing-function 属性值
 * align {string} 对齐方向，支持 left/right/top/bottom 四个方向
 * ready 指令执行完成回调函数，以提供更多可能性，函数携带 el, ratio 等参数
 */

const baseClassMark = {}

const ratioBarOptions = {}

function setBaseStyle (name, duration, easing, align) {
  // if (baseClassMark[name]) return
  const classStringArray = [`[data-ratio-bar^="${name}"]:before{`]
  duration && classStringArray.push(`transition: transform ${duration}ms;`)
  easing && classStringArray.push(`transition-timing-function: ${easing};`)
  align && classStringArray.push(`${align}: 0; transform-origin: ${align};`)
  if (!align || align === 'left' || align === 'right') {
    classStringArray.push('width: 1px; height: 100%;')
  } else {
    classStringArray.push('width: 100%; height: 1px;')
  }
  classStringArray.push('}')
  appendStyle(name, classStringArray)
  baseClassMark[name] = true
}

function appendStyle (name, classStringArray) {
  const styleElement = document.createElement('style')
  styleElement.innerHTML = classStringArray.join('')
  styleElement.setAttribute('id', name)
  const isStyleElementExist = document.getElementById(name)
  if (isStyleElementExist) {
    isStyleElementExist.innerHTML = styleElement.innerHTML
  } else {
    document.head.appendChild(styleElement)
  }
}

function styleWrapSelector (name, classStringArray) {
  classStringArray.unshift(`[data-ratio-bar="${name}"]:before{`)
  classStringArray.push('}')
  return classStringArray
}

const setStyle = {
  left: (name, scale, color) => {
    const classStringArray = styleWrapSelector(name, [
      `transform: scale(${scale.toFixed(0) - 0}, 1);`,
      color && `background-color: ${color};`
    ])
    appendStyle(name, classStringArray)
  },
  right: (name, scale, color) => {
    const classStringArray = styleWrapSelector(name, [
      `transform: scale(${scale.toFixed(0) - 0}, 1);`,
      color && `background-color: ${color};`
    ])
    appendStyle(name, classStringArray)
  },
  top: (name, scale, color) => {
    const classStringArray = styleWrapSelector(name, [
      `transform: scale(1, ${scale.toFixed(0) - 0});`,
      color && `background-color: ${color};`
    ])
    appendStyle(name, classStringArray)
  },
  bottom: (name, scale, color) => {
    const classStringArray = styleWrapSelector(name, [
      `transform: scale(1, ${scale.toFixed(0) - 0});`,
      color && `background-color: ${color};`
    ])
    appendStyle(name, classStringArray)
  }
}

function initRatioBar (el, binding) {
  const ratioBarName = Object.keys(binding.modifiers)[0] || 'default'
  if (ratioBarOptions[ratioBarName]) return
  const value = binding.value
  let duration
  let easing
  let align
  let readyCallback
  if (typeof value === 'object') {
    duration = value.duration
    easing = value.easing
    align = value.align
    readyCallback = value.ready
  }
  const ratioBarBaseClassName = `ratio-bar-${ratioBarName}`
  setBaseStyle(ratioBarBaseClassName, duration, easing, align)
  el.setAttribute('data-ratio-bar-base', ratioBarBaseClassName)
  ratioBarOptions[ratioBarName] = {
    duration,
    easing,
    align,
    readyCallback,
    ratioBarBaseClassName
  }
}

function setRatioBar (el, binding) {
  const ratioBarName = Object.keys(binding.modifiers)[0] || 'default'
  const value = binding.value
  let ratio = value
  let color
  if (typeof value === 'object') {
    ratio = value.ratio
    color = value.color
  }
  el.setAttribute('ratio', ratio)
  if (color && typeof color === 'function') {
    color = color(ratio, el, ratioBarName)
  }

  const ratioBarOption = ratioBarOptions[ratioBarName]
  const { readyCallback,ratioBarBaseClassName } = ratioBarOption
  const { align, duration, easing } = value
  ratioBarOptions[ratioBarName] = {
    duration,
    easing,
    align,
    readyCallback,
    ratioBarBaseClassName
  }
  let ratioBarClassName = el.getAttribute('data-ratio-bar')
  setBaseStyle(ratioBarBaseClassName, duration, easing, align)
  if (!ratioBarClassName) {
    ratioBarClassName = `${ratioBarBaseClassName}-${Math.random().toString(36).substring(2, 8)}`
    el.setAttribute('data-ratio-bar', ratioBarClassName)
  }
  setTimeout(() => {
    if (!align || align === 'left' || align === 'right') {
      const width = el.getBoundingClientRect().width
      // 动态插入水平过度动画样式
      setStyle[align || 'left'](ratioBarClassName, width * ratio, color)
    } else {
      const width = el.getBoundingClientRect().height
      // 动态插入垂直过度动画样式
      setStyle[align](ratioBarClassName, width * ratio, color)
    }
  })
  readyCallback && setTimeout(() => {
    readyCallback(el, ratio, ratioBarName)
  }, duration || 1000)
}

function clearRatioBar (el) {
  const ratioBarBaseClassName = el.getAttribute('data-ratio-bar-base')
  const baseStyleElement = document.getElementById(ratioBarBaseClassName)
  baseStyleElement && baseStyleElement.remove()
  const ratioBarClassName = el.getAttribute('data-ratio-bar')
  const styleElement = document.getElementById(ratioBarClassName)
  styleElement && styleElement.remove()
  el.removeAttribute('data-ratio-bar')
}

export default {
  bind: initRatioBar,
  componentUpdated: setRatioBar,
  unbind: clearRatioBar
}
