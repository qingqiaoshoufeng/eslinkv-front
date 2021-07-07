import { getLngStationData } from '@/components-map-api/map.airSupply.api'
// 覆盖物legend配置
export const AIRSUPPLY_LNG_LEGEND_MAP = {
	// YardsStation: {
	// 	label: '场站',
	// 	legendIcon: 'iconchangzhan',
	// 	component: 'MapMarkerIcon',
	// 	visible: true,
	// 	dataProp: 'yardsStationList',
	// 	detailHandler: getLngStationData
	// },
	BranchCompany: {
		label: '分公司',
		legendIcon: 'icontulitiaoyazhan',
		component: 'MapMarkerIcon',
		visible: true,
		dataProp: 'branchCompanyList',
		detailHandler: getLngStationData
	},
	EmergencyAirSourceStation: {
	    label: '应急气源站',
	    legendIcon: 'iconyingjiqiyuanzhan',
	    component: 'MapMarkerIcon',
	    visible: true,
		dataProp: 'emergencyAirSourceStationList',
		detailHandler: getLngStationData
	},
	// StorageDistributionStation: {
	//     label: '储配站',
	//     legendIcon: 'iconchupeizhan',
	//     component: 'MapMarkerIcon',
	//     visible: true,
	// 	dataProp: 'storageDistributionStationList',
	// },
	NaturalGasStation: {
	    label: '加气站',
	    legendIcon: 'iconjiaqizhan1',
	    component: 'MapMarkerIcon',
	    visible: true,
		dataProp: 'naturalGasStationList',
		detailHandler: getLngStationData
	},
	GreenEnergyStation: {
	    label: '绿色能源站',
	    legendIcon: 'iconzonghefuwuzhan2',
	    component: 'MapMarkerIcon',
	    visible: true,
		dataProp: 'greenEnergyStationList',
		detailHandler: getLngStationData
	},
}

// 覆盖物详情
export const AIRSUPPLY_LNG_OVERLAY_MAP = {
	EmergencyAirSourceStation: {
	    fields: {
	        name: {
	            style: {
	                fontSize: '32px',
	                color: '#FFDC45'
	            },
	            errColor: '#FFDC45'
	        },
	    },
	},
	BranchCompany: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
		},
	},
	StorageDistributionStation: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
		},
	},
	NaturalGasStation: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
		},
	},
	YardsStation: {
		fields: {
			name: {
				style: {
					fontSize: '32px',
					color: '#FFDC45',
				},
				errColor: '#FFDC45',
			},
		},
	}
}
// LNG统计数据
export const DATASTATISTICSLIST = [
	{
		label: '储配站',
		DW: '',
		prop: 'storageDistributionStation',
	},
	{
		label: '应急气源站',
		DW: '',
		prop: 'emergencyAirSourceStation',
	},
	{
		label: '加气站',
		DW: '',
		prop: 'naturalGasStation',
	},
	{
		label: '绿色能源站',
		DW: '',
		prop: 'greenEnergyStation',
	},
]
