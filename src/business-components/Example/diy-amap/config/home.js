//首页报警列表
export const HOMESITUATIONAWARENESSLIST = [
	{
		content: '新星小区燃气泄漏',
		address: '三墩镇三墩街100号',
		id: 1,
		status: 0,
		timeInSeconds: 0,
		statusText: '已处理',
		lng: 120.0827009281194,
		lat: 30.323955044878687,
		eventType: 1,
	},
	{
		content: '易沙创业园燃气泄漏',
		address: '下沙二号大街九号大街交叉口',
		id: 10,
		status: 1,
		timeInSeconds: 1,
		statusText: '未处理',
		lng: 120.288668,
		lat: 30.316372,
		// lng: 120.3516411781311,
		// lat: 30.31174575966139,
		eventType: 1,
	},
	{
		content: '临平桂花城管道破裂',
		address: '人民大道746号',
		id: 3,
		status: 1,
		timeInSeconds: 2,
		statusText: '未处理',
		lng: 120.261363,
		lat: 30.384197,
		// lng: 120.31007766723633,
		// lat: 30.4205892087966,
		eventType: 0,
	},
	{
		content: '三里亭社区燃气泄漏',
		address: '江干区三里亭东苑11',
		id: 4,
		status: 1,
		timeInSeconds: 3,
		statusText: '未处理',
		lng: 120.179119,
		lat: 30.274648,
		// lng: 120.19330281642914,
		// lat: 30.296621575040618,
		eventType: 1,
	},
	{
		content: '西溪永乐城管道破裂',
		address: '余杭区仓前街道景兴路666号',
		id: 5,
		status: 1,
		timeInSeconds: 4,
		statusText: '未处理',
		// lng:  119.945781,
		// lat: 30.28569,
		lng: 120.00046491622925,
		lat: 30.276487794570983,
		eventType: 0,
	},
	{
		content: '萧山商业城管道破裂',
		address: '商城西路与商惠街交叉路口',
		id: 11,
		status: 0,
		statusText: '已处理',
		timeInSeconds: 5,
		lng: 120.28686046600342,
		lat: 30.169691809970953,
		eventType: 0,
	},
	{
		content: '金色家园管道破裂',
		address: '上城区滨江·金色家园6幢',
		id: 7,
		status: 0,
		statusText: '已处理',
		timeInSeconds: 6,
		lng: 120.17970552712964,
		lat: 30.224503168144224,
		eventType: 0,
	},
	{
		content: '中南购物中心燃气泄漏',
		address: '滨江区江南大道1090号',
		id: 8,
		status: 1,
		statusText: '未处理',
		timeInSeconds: 7,
		// lng:120.139931,
		// lat: 30.162778,
		lng: 120.18694803585602,
		lat: 30.196626964602952,
		eventType: 1,
	},
	{
		content: '兽王电商产业园燃气泄漏',
		address: '萧山经济技术开发区钱农东路257号',
		id: 6,
		status: 1,
		timeInSeconds: 8,
		statusText: '未处理',
		lng: 120.39309,
		lat: 30.254609,
		// lng: 120.30192375183105,
		// lat: 30.239140930210528,
		eventType: 1,
	},
	{
		content: '羊山公寓管道破裂',
		address: '余杭区羊城路440号',
		id: 2,
		status: 0,
		timeInSeconds: 9,
		statusText: '已处理',
		lng: 119.96636867523192,
		lat: 30.38109446979586,
		eventType: 1,
	},
]

export const OVERLAYINFOMAP = {
	GASSTATION: {
		name: {
			style: {
				fontSize: '24px',
			},
		},
		inlet: {
			style: {
				fontSize: '18px',
			},
		},
	},
	SURGESTATION: {
		name: {},
	},
	INSPECTIONCAR: {
		name: {},
	},
	WARN: {
		content: {
			style: {
				fontSize: '24px',
			},
		},
		address: {
			style: {
				fontSize: '18px',
				color: '#00DDFF',
			},
			errColor: '#FF7217',
		},
	},
}

//首页legend配置
export const HOMELEGEND_STATION = {
	HighPressureLine: {
		label: '高压管网',
		icon: 'icontuligaoyaguanwang',
		component: 'HighPressureLine',
		isShow: true,
	},
	HighPressureLine_Process: {
		label: '高压管网(建设中)',
		icon: 'icontulizhongyaguanwang-progress',
		component: 'HighPressureLine_Process',
		isShow: true,
	},
	MiddlePressureLine: {
		label: '中压管网',
		icon: 'icontulizhongyaguanwang',
		component: 'MiddlePressureLine',
		isShow: true,
	},
	LowPressureLine: {
		label: '低压管网',
		icon: 'icontulidiyaguanwang',
		component: 'LowPressureLine',
		isShow: true,
	},
	InspectionPerson: {
		label: '巡检人员',
		icon: 'icontulirenyuan',
		component: 'InspectionPerson',
		isShow: true,
	},
	InspectionCar: {
		label: '巡检车辆',
		icon: 'icontulicheliang',
		component: 'InspectionCar',
		isShow: true,
	},
	GasStation: {
		label: '门站',
		icon: 'icontulimenzhan',
		component: 'GasStation',
		isShow: true,
	},
	PressureRegulatingStation: {
		label: '调压站',
		icon: 'icontulitiaoyazhan',
		component: 'PressureRegulatingStation',
		isShow: true,
	},
	EmergencyAirSourceStation: {
		label: '应急气源站',
		icon: 'icontuliqiyuanzhan',
		component: 'EmergencyAirSourceStation',
		isShow: true,
	},
	ComprehensiveServiceStation: {
		label: '综合服务站',
		icon: 'icontulizonghefuwuzhan',
		component: 'ComprehensiveServiceStation',
		isShow: false,
	},
	PipeManageMentStation: {
		label: '管网运行管理站',
		icon: 'icontuliguanwangyunhangguanlizhan',
		component: 'PipeManageMentStation',
		isShow: false,
	},
	UndergroundRepairStation: {
		label: '地下抢修点',
		icon: 'icontulidixiaqiangxiudian',
		component: 'UndergroundRepairStation',
		isShow: false,
	},
	LNGStation: {
		label: 'LNG站',
		icon: 'icontulilNG',
		component: 'LNGStation',
		isShow: false,
	},
	LiquefiedGasStation: {
		label: '液化气站',
		icon: 'icontuliyehuaqi',
		component: 'LiquefiedGasStation',
		isShow: false,
	},
	NaturalGasStation: {
		label: '加气站',
		icon: 'icontulijiaqizhan',
		component: 'NaturalGasStation',
		isShow: false,
	},
	DistributedEnergyResource: {
		label: '分布式能源',
		icon: 'icontulinengyuanzhan',
		component: 'DistributedEnergyResource',
		isShow: false,
	},
}
export const HOMELEGEND_PIPE = {
	HighPressureLine: {
		label: '高压管网',
		icon: 'icontuligaoyaguanwang',
		component: 'HighPressureLine',
		isShow: true,
	},
	HighPressureLine_Process: {
		label: '高压管网(建设中)',
		icon: 'icontulizhongyaguanwang-progress',
		component: 'HighPressureLine_Process',
		isShow: true,
	},
	MiddlePressureLine: {
		label: '中压管网',
		icon: 'icontulizhongyaguanwang',
		component: 'MiddlePressureLine',
		isShow: true,
	},
	LowPressureLine: {
		label: '低压管网',
		icon: 'icontulidiyaguanwang',
		component: 'LowPressureLine',
		isShow: true,
	},
	InspectionPerson: {
		label: '巡检人员',
		icon: 'icontulirenyuan',
		component: 'InspectionPerson',
		isShow: true,
	},
	InspectionCar: {
		label: '巡检车辆',
		icon: 'icontulicheliang',
		component: 'InspectionCar',
		isShow: true,
	},
	ComprehensiveServiceStation: {
		label: '综合服务站',
		icon: 'icontulizonghefuwuzhan',
		component: 'ComprehensiveServiceStation',
		isShow: true,
	},
	PipeManageMentStation: {
		label: '管网运行管理站',
		icon: 'icontuliguanwangyunhangguanlizhan',
		component: 'PipeManageMentStation',
		isShow: true,
	},
	UndergroundRepairStation: {
		label: '地下抢修点',
		icon: 'icontulidixiaqiangxiudian',
		component: 'UndergroundRepairStation',
		isShow: true,
	},
	GasStation: {
		label: '门站',
		icon: 'icontulimenzhan',
		component: 'GasStation',
		isShow: false,
	},
	PressureRegulatingStation: {
		label: '调压站',
		icon: 'icontulitiaoyazhan',
		component: 'PressureRegulatingStation',
		isShow: false,
	},
	EmergencyAirSourceStation: {
		label: '应急气源站',
		icon: 'icontuliqiyuanzhan',
		component: 'EmergencyAirSourceStation',
		isShow: false,
	},
	LNGStation: {
		label: 'LNG站',
		icon: 'icontulilNG',
		component: 'LNGStation',
		isShow: false,
	},
	LiquefiedGasStation: {
		label: '液化气站',
		icon: 'icontuliyehuaqi',
		component: 'LiquefiedGasStation',
		isShow: false,
	},
	NaturalGasStation: {
		label: '加气站',
		icon: 'icontulijiaqizhan',
		component: 'NaturalGasStation',
		isShow: false,
	},
	DistributedEnergyResource: {
		label: '分布式能源',
		icon: 'icontulinengyuanzhan',
		component: 'DistributedEnergyResource',
		isShow: false,
	},
}
export const HOMELEGEND_UCAN = {
	LiquefiedGasStation: {
		label: '液化气站',
		icon: 'icontuliyehuaqi',
		component: 'LiquefiedGasStation',
		isShow: true,
	},
	NaturalGasStation: {
		label: '加气站',
		icon: 'icontulijiaqizhan',
		component: 'NaturalGasStation',
		isShow: true,
	},
	DistributedEnergyResource: {
		label: '分布式能源',
		icon: 'icontulinengyuanzhan',
		component: 'DistributedEnergyResource',
		isShow: true,
	},
	HighPressureLine: {
		label: '高压管网',
		icon: 'icontuligaoyaguanwang',
		component: 'HighPressureLine',
		isShow: false,
	},
	HighPressureLine_Process: {
		label: '高压管网(建设中)',
		icon: 'icontulizhongyaguanwang-progress',
		component: 'HighPressureLine_Process',
		isShow: false,
	},
	MiddlePressureLine: {
		label: '中压管网',
		icon: 'icontulizhongyaguanwang',
		component: 'MiddlePressureLine',
		isShow: false,
	},
	LowPressureLine: {
		label: '低压管网',
		icon: 'icontulidiyaguanwang',
		component: 'LowPressureLine',
		isShow: false,
	},
	InspectionPerson: {
		label: '巡检人员',
		icon: 'icontulirenyuan',
		component: 'InspectionPerson',
		isShow: false,
	},
	InspectionCar: {
		label: '巡检车辆',
		icon: 'icontulicheliang',
		component: 'InspectionCar',
		isShow: false,
	},
	LNGStation: {
		label: 'LNG站',
		icon: 'icontulilNG',
		component: 'LNGStation',
		isShow: false,
	},
	GasStation: {
		label: '门站',
		icon: 'icontulimenzhan',
		component: 'GasStation',
		isShow: false,
	},
	PressureRegulatingStation: {
		label: '调压站',
		icon: 'icontulitiaoyazhan',
		component: 'PressureRegulatingStation',
		isShow: false,
	},
	EmergencyAirSourceStation: {
		label: '应急气源站',
		icon: 'icontuliqiyuanzhan',
		component: 'EmergencyAirSourceStation',
		isShow: false,
	},
	ComprehensiveServiceStation: {
		label: '综合服务站',
		icon: 'icontulizonghefuwuzhan',
		component: 'ComprehensiveServiceStation',
		isShow: false,
	},
	PipeManageMentStation: {
		label: '管网运行管理站',
		icon: 'icontuliguanwangyunhangguanlizhan',
		component: 'PipeManageMentStation',
		isShow: false,
	},
	UndergroundRepairStation: {
		label: '地下抢修点',
		icon: 'icontulidixiaqiangxiudian',
		component: 'UndergroundRepairStation',
		isShow: false,
	},
}
