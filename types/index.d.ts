interface Components {
    [key: string]: any
}

interface ComponentsWidgetsItem {
    label: string
    type: string
    config?: any
    layout?: any
    widgets?: ComponentsWidgetsItem[]
}

type ComponentsWidgetsArray = ComponentsWidgetsItem[]

interface ComponentsWidgetsObject {
    [key: string]: ComponentsWidgetsItem
}
