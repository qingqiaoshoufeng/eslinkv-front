//legend配置
export const SERVICELEGENDCUSTOMERMAP = {
<<<<<<< HEAD
    Grouphall: {
        label: '集团大厅',
        legendIcon: 'icontulijituandating',
        icon: 'iconjituandating',
        component: 'Grouphall',
    },
    BranchCompany: {
        label: '分公司',
        legendIcon: 'icontulifengongsi',
        icon: 'iconfengongsi1',
        component: 'BranchCompany',
    },
    ServiceNetworkStation: {
        label: '服务网点',
        legendIcon: 'icontulifuwuwangdian',
        icon: 'iconfuwuwangdian',
        component: 'ServiceNetworkStation',
    },
    ThreeSocialLinkage: {
        label: '三社联动',
        legendIcon: 'icontulisansheliandong',
        icon: 'iconsansheliandong',
        component: 'ThreeSocialLinkage',
    }
=======
	Grouphall: {
		label: '集团大厅',
		legendIcon: 'icontulijituandating',
		icon: 'iconjituandating',
		component: 'Grouphall',
	},
	BranchCompany: {
		label: '分公司',
		legendIcon: 'icontulifengongsi',
		icon: 'iconfengongsi',
		component: 'BranchCompany',
	},
	ServiceNetworkStation: {
		label: '服务网点',
		legendIcon: 'icontulifuwuwangdian',
		icon: 'iconfuwuwangdian',
		component: 'ServiceNetworkStation',
	},
	ThreeSocialLinkage: {
		label: '三社联动',
		legendIcon: 'icontulisansheliandong',
		icon: 'iconsansheliandong',
		component: 'ThreeSocialLinkage',
	},
>>>>>>> 88e162c5157e20a6a53d77f25916dd0bd0cec80b
}

export const SERVICELEGEND_CUSTOMER = {
	Grouphall: true,
	BranchCompany: true,
	ServiceNetworkStation: true,
	ThreeSocialLinkage: true,
}

//覆盖物详情
export const OVERLAYINFOMAP_SERVICE_CUSTOMER = {
	BranchCompany: {
		fields: {
			name: {},
		},
	},
	ServiceNetworkStation: {
		fields: {
			name: {},
		},
	},
	ThreeSocialLinkage: {
		fields: {
			name: {},
		},
		isShowMore: true,
	},
	Grouphall: {
		fields: {
			name: {},
		},
	},
}
