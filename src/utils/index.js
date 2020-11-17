/**
 * @description 获取url参数
 */
export function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
	let r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

/**
 *
 * @param hex 例如:"#23ff45"
 * @param opacity 透明度
 * @returns {string}
 */
export function hexToRgba(hex, opacity) {
	return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}