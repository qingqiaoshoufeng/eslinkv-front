import CoordinateTransform from './CoordinateTransform'
import TransformClassSlippy from './TransformClassSlippy'

const TILE_WIDTH = 256

const XB = 119.3414085
const XK = 96366.23457
const YB = 29.52655159
const YK = 110689.4918

const coordinateTransform = new CoordinateTransform()

// 百度坐标系转杭然坐标系
function bd_2_HZGAS(x, b, k) {
	return (x - b) * k
}

/**
 * 百度地图墨卡托坐标系 转换杭州燃气GIS 坐标系
 * @param x
 * @param y
 * @param zoom
 * @returns {{leftBottomX: *, leftBottomY: *, rightTopX: *, rightTopY: *, width: number, height: number}}
 */
export default function getPosition(x, y, zoom) {
    let min = TransformClassSlippy.pixelToLnglat(null, null, x, y, zoom)
    min = coordinateTransform.GCJ2BD(min.lng,min.lat)
	let max = TransformClassSlippy.pixelToLnglat(
		null,
		null,
		x + 1,
		y + 1,
		zoom
    )
    max = coordinateTransform.GCJ2BD(max.lng,max.lat)
    
	const leftBottomX = bd_2_HZGAS(min[0], XB, XK)
	const leftBottomY = bd_2_HZGAS(min[1], YB, YK)
	const rightTopX = bd_2_HZGAS(max[0], XB, XK)
    const rightTopY = bd_2_HZGAS(max[1], YB, YK)
    
	return {
		leftBottomX,
		leftBottomY,
		rightTopX,
		rightTopY,
		width: TILE_WIDTH,
		height: TILE_WIDTH,
	}
}
