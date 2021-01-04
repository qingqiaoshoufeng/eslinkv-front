import JSONStringify from "@lib/vendor/JSONStringify";

export const config = {animation: true};
export const value = {
	layout: {
		size: {
			width: 480,
			height:370
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSONStringify({
			list: [
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 14500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
				{
					name: '开户',
					amount: 4500,
				},
			],
		}),
	},
};
