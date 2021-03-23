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

interface ComponentTypeCreate {
    componentTypeId?: string
    componentTypeName: string
    componentTypeEnName?: string
    componentTypeParentId?: string
}
