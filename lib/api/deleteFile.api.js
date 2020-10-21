import axios from 'axios'

export function post(data) {
	return axios.post(
		'/oss/delete',
		data
	)
}
