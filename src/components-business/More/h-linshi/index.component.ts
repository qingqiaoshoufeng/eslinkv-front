import {getInput} from '../../../../lib'

const configSource = {
	config: {
		fields: {
			transform: getInput('transform', '旋转角度'),
			left: getInput('left', '位移'),
		}
	}
}
const config = {
	animation: true,
	config: {
		transform: true,
		left: true,
	}
}
const value = {
	layout: {
		size: {
			width: 600,
			height: 952
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: {
			total: 78528,
			air: {
				shop: 5,
				highPipeline: 236,
				pressureStation: 25,
				mediumPipeline: 2627,
				gasStation: 2,
				lowPipeline: 4652,
				voltageRegulator: 5438,
			},
			service: {
				household: 13253458,
				publicUsers: 9332,
				industrialUsers: 318,
				inUseUsers: 121865,
				registeredUsers: 254336,
			}
		}
	},
	config: {
		transform: 30,
		left: -50,
	}
}

export {config, value}
