const types = {
  json: 'application/json',
  txt: 'text/plain',
  html: 'text/html',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg'
}

/**
 * 文件下载函数
 * @author ferrinweb
 * @param {*} data 导出内容，可以是文本、对象、文件
 * @param {String} filename 文件名
 * @param {String} type 文件后缀
 */
export default function downloadFile (data, filename, type) {
  let blob
  if (typeof data === 'string') {
    blob = new Blob([data], { type: types[type] })
  } else {
    if (data instanceof Blob || data instanceof File) {
      blob = data
    } else {
      blob = new Blob([JSON.stringify(data, null, 2)], { type: types[type] })
    }
  }
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.download = filename
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}
