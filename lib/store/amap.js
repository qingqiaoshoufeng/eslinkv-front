import { store } from './index'

/**
 * @description 实例化对象缓存
 */
const state = {

    iccusto: null,
}

const actions = {
    setInstance(key, value) {
        store.instance[key] = value
    },
}