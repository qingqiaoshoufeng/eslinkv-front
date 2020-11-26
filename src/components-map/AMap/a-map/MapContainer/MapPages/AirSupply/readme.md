### config.js 
#### 地图 legend 配置

```js
let legendMap = {
	GasStation: {
		label: '覆盖物中文含义',
		legendIcon: '图例图标',
		icon: '地图上图标',
		component: '覆盖物对应组件名称',
		isShow: '是否默认开启（true/false)',
	},
}
```

#### 地图覆盖物显示信息配置

```js
let overlayMap = {
	GasStation: {   //key值:覆盖物类型 对应 legend组件的key值
		fields: {   //弹窗显示的字段  
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
		isShowMore: false,  //是否显示查看详情
	},
	WARNEVENT: {
		fields: {
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
		isShowMore: true,
	},
}
```