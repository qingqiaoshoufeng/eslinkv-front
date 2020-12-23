import { store } from './index'

const state = {
    data: {},
    widgetsAdded: []
}

const actions = {
    setKanboard(value) {
        store.kanboard.data = value
    },
    setWidgetsAdded(value) {
        store.kanboard.widgetsAdded = value
    }
}

export default { state, actions }
