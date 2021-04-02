import format from 'date-fns/format'

const icon1 = '/static/icons/step-1.svg'
const icon2 = '/static/icons/step-2.svg'
const icon3 = '/static/icons/step-3.svg'
const icon4 = '/static/icons/step-4.svg'
const icon5 = '/static/icons/step-5.svg'
const icon6 = '/static/icons/step-6.svg'
const icon7 = '/static/icons/step-7.svg'
const icon8 = '/static/icons/step-8.svg'
export default {
	data() {
		return {
			icon1,
			icon2,
			icon3,
			icon4,
			icon5,
			icon6,
			icon7,
			icon8,
		}
	},
	props: {
		step: {
			type: Number,
		},
		left: {
			type: [String, Number],
		},
		step1: {
			type: Object,
			default() {
				return {}
			},
		},
		step2: {
			type: Object,
			default() {
				return {}
			},
		},
		step3: {
			type: Object,
			default() {
				return {}
			},
		},
		step4: {
			type: Object,
			default() {
				return {}
			},
		},
		step5: {
			type: Object,
			default() {
				return {}
			},
		},
		step6: {
			type: Object,
			default() {
				return {}
			},
		},
		step7: {
			type: Object,
			default() {
				return {}
			},
		},
		step8: {
			type: Object,
			default() {
				return {}
			},
		},
	},
	methods: {
		formatTime(value) {
			if (value) {
				return format(value, 'HH:mm')
			} else {
				return ''
			}
		},
	},
}
