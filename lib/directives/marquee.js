/**
 * 文本超出执行走马灯特效
 * 使用方法：
 * <div class="my-marquee-item relative over-hidden" v-marquee.marqueeName>
 *   <div class="absolute">这里也许是一行比较长的文字</div>
 * </div>
 * 可以指定动画周期时长, 默认值是 6000, 单位毫秒
 * <div class="my-marquee-item relative" v-marquee.marqueeName="3000">
 *   <div class="absolute">这里也许是一行比较长的文字</div>
 * </div>
 */
const marquees = []
const marqueeWrappers = {}

function setKeyFrame (name, offset) {
  if (marquees.includes(name)) return
  const classString = `@keyframes ${name} {
    0%, 15%, 85%, 100%{
      transform: translate3d(0, 0, 0)
    }
    40%, 60% {
      transform: translate3d(calc(${offset} - 100% - 10px), 0, 0)
    }
  }`
  const styleElement = document.createElement('style')
  styleElement.innerHTML = classString
  styleElement.setAttribute('id', name)
  document.head.appendChild(styleElement)
  marquees.push(name)
}

function setAnimateClass (target, name, duration = 6000) {
  target.style.animation = name
  target.style.animationDuration = duration + 'ms'
  target.style.animationIterationCount = 'infinite'
  target.style.animationTimingFunction = 'linear'
}

function setMarquee (el, binding) {
  const marqueeTarget = el.children[0]
  if (marqueeTarget) {
    const marqueeName = Object.keys(binding.modifiers)[0] || 'default'
    let duration = binding.value
    setTimeout(() => {
      const width = marqueeTarget.getBoundingClientRect().width
      // 通常一组跑马灯（同名的跑马灯）形式一致，可以缓存灯罩宽度
      let wrapperWidth = el.getBoundingClientRect().width
      marqueeWrappers[marqueeName] = {
        width: wrapperWidth
      }
      const cachedDuration = marqueeWrappers[marqueeName].duration
      if (!duration) {
        duration = marqueeWrappers[marqueeName].duration
      } else if (!cachedDuration) {
        // 缓存马儿跑一圈的周期，这样仅在一组跑马灯的第一个指令上设置周期即可
        marqueeWrappers[marqueeName].duration = duration
      }
      clearMarquee(el)
      if (width > wrapperWidth) {
        const keyFrameName = `marquee-${marqueeName}`
        const offset = `${wrapperWidth}px`
        // 动态插入过度动画关键帧
        setKeyFrame(keyFrameName, offset)
        // 动态插入动画样式
        setAnimateClass(marqueeTarget, keyFrameName, duration)
        el.setAttribute('data-marquee', keyFrameName)
      }
    })
  }
}

function clearMarquee (el) {
  const keyFrameName = el.getAttribute('data-marquee')
  if (!keyFrameName) return
  const styleElement = document.getElementById(keyFrameName)
  styleElement && styleElement.remove()
  const index = marquees.findIndex(item => keyFrameName)
  index > -1 && marquees.splice(index, 1)
  delete marqueeWrappers[keyFrameName.replace('marquee-', '')]
}

export default {
  componentUpdated: setMarquee,
  unbind: clearMarquee
}
