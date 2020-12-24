
export function lnglat2container(pos, map) {
    var lnglat = new AMap.LngLat(pos[0], pos[1]);
    var pixel = map.lngLatToContainer(lnglat);
    return pixel.round()
}




export function latlngtopx(pos, map) {
    // 需要的中心点
    let x1 = map.getSize().width / 5
    let y1 = map.getSize().height / 2
    pos

    let { x: x2, y: y2 } = lnglat2container(pos, map)
    return { x: x1 - x2, y: y1 - y2 }
}