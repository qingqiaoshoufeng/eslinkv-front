import {getCompList, getLevel0} from '@/api/bussiness.api'

let widgetsArray: Array<any> = []

getLevel0().then(res => {
	res.forEach(child => {
		getCompList({componentTypeId: child.componentTypeId}).then(res => {
			widgetsArray = res
			window.GoldChart.mutations.setCustomWidgets({
				label: child.componentTypeName,
				widgets: widgetsArray
			})
		})
	})
})
