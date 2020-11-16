// eg 文件名  map.home.js  调用  this.$sysApi.map.home.xxx函数
import Vue from 'vue'
const context = require.context('/', false, /\.(api.js)$/)
const apis = {}
context.keys().forEach((name) => {
    console.log(name)
    let key = name.replace(/^\.\//, '').replace(/\.(api.js)$/, '')
    let keyArr = key.split('.')
    let content = null
    if (context(name).default) {
        content = context(name).default
    } else {
        content = context(name)
    }
    let keyArrLen = keyArr.length
    let target = apis
    keyArr.forEach((key, index) => {
        target[key] = index < keyArrLen - 1 ? {} : content
        target = target[key]
    })
})

Vue.prototype.$sysApi = apis
