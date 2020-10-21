import axios from 'axios'

// 查询看板列表
export default (data) => axios.post('/material/page', data)
