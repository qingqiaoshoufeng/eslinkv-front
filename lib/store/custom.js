import { store } from './index'

/**
 * @description 业务组件
 */
const state = {
    widgets: [],
    components: {}
}

const actions = {
    setCustomComponents(value) {
        console.log(value)
        store.custom.components = { ...store.custom.components, ...value }
    },
    setCustomWidgets(value) {
        store.custom.widgets.push({ ...value, name: `custom${store.custom.widgets.length}` })
    }
}

export default { state, actions }
