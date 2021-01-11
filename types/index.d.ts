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

interface ComponentValueLayout {
    size: ComponentValueLayoutSize
    position: ComponentValueLayoutPosition
}

interface ComponentValueLayoutSize {
    width: number
    height: number
}

type ComponentValueLayoutPositionValue = 'relative' | 'absolute' | 'fixed'

interface ComponentValueLayoutPosition {
    value: ComponentValueLayoutPositionValue
}

interface ComponentValue {
    layout: ComponentValueLayout
    api: ComponentValueApi
    config?: any
}

interface ComponentValueApi {
    data: any
}

interface ComponentConfigSource {
    config: ComponentConfigSourceConfig
}

interface ComponentConfigSourceConfig {
    fields: any
}

interface ComponentConfig {
    animation?: boolean
    config?: any
}
