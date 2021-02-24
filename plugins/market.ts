import {getCompList, getLevel0} from '../lib/api/bussiness.api'
import custom from '../lib/store/custom.store'

let widgetsArray = []

getLevel0().then(res => {
	res.forEach(child => {
		getCompList({componentTypeId: child.componentTypeId}).then(res => {
			widgetsArray = res
			custom.actions.setCustomWidgets({
				label: child.componentTypeName,
				widgets: widgetsArray,
			})
		})
	})
})
