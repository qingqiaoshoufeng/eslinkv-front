
export function lnglat2container1(inputVal, map) {
    var lnglat = new AMap.LngLat(inputVal[0], inputVal[1]);
    var pixel = map.lngLatToContainer(lnglat);
    return pixel.round()
}




export function lnglat2container(inputVal, inputVal2, map) {
    // 需要的中心点
    let x1 = map.getSize().width / 5
    let y1 = map.getSize().height / 2
    console.log(x1, y1, '余志强')

    let { x, y } = lnglat2container1(inputVal, map)
    let { x: x2, y: y2 } = lnglat2container1(inputVal2, map)
    y1 = y
    console.log(x1, y1, x, y, x2, y2, map)
    return { x: x + x1 - x2, y: y + y1 - y2 }
}