
// 通过经纬度 获取坐标方法
export function lnglat2container(pos, map) {
    var lnglat = new AMap.LngLat(pos[0], pos[1]);
    var pixel = map.lngLatToContainer(lnglat);
    return pixel.round()
}

// 获取相对距离偏移位置获取panBy方法的偏移量
export function latlngtopx(pos, map) {
    // 杭燃码需要的中心点
    let x1 = map.getSize().width / 5
    let y1 = map.getSize().height / 2
    let { x: x2, y: y2 } = lnglat2container(pos, map)
    return { x: x1 - x2, y: y1 - y2 }
}