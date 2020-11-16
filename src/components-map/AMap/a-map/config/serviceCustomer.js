//legend配置
export const SERVICELEGENDCUSTOMERMAP = {
    InspectionPerson: {
        label: '巡检人员',
        legendIcon: 'icontulirenyuan',
        icon: 'iconrenyuan',
        component: 'InspectionPerson',
    },
    InspectionCar: {
        label: '巡检车辆',
        legendIcon: 'icontulicheliang',
        icon: 'iconcheliang',
        component: 'InspectionCar',
    },
    Grouphall: {
        label: '集团大厅',
        legendIcon: 'icontulijituandating',
        icon: 'iconjituandating',
        component: 'InspectionCar',
    }
}

export const SERVICELEGEND_CUSTOMER = {
    InspectionPerson: true,
    InspectionCar: true
}

//覆盖物详情
export const OVERLAYINFOMAP_SERVICE_CUSTOMER = {
    InspectionPerson: {
        name: {},
    },
    InspectionCar: {
        name: {},
    }
}