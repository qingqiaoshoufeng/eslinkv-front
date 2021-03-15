/**
 * 全局事件总线
 * 事件总线用于组件间数据传递
 * 使用方法：
 * 1、在需要的组件内，引入 bus
 * import bus from '@/bus'
 * 2、广播消息：
 * bus.$emit('event-name', data)
 * 3、捕获消息：
 * bus.$on('event-name', data => {
 *   console.info(data)
 * })
 * 4、注销事件捕获监听：
 * bus.$off('event-name')
 * 或者使用
 * bus.$off(['event-name1', 'event-name2'])
 * 来一次性注销多个事件
 */
import Vue from 'vue'
export default new Vue()
