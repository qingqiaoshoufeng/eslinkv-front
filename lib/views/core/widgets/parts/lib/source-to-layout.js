const sourceToLayout = configSource => {
    const layout = {}
    Object.keys(configSource).forEach(key => {
        if (['groupType', 'groupLabel', 'groupActive', 'groupEnable'].includes(key)) return
        const value = configSource[key]
        const type = value.groupType
        if (!type) {
            layout.fields = Object.values(value)
            return
        }
        if (!layout[type]) layout[type] = []
        layout[type].push({
            label: value.groupLabel,
            group: key,
            active: value.groupActive,
            enable: value.groupEnable,
            value: sourceToLayout(value)
        })
    })
    return layout
}

export default sourceToLayout
