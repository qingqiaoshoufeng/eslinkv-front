/*
 * Created by CntChen 2016.04.30
 * 参考资料：http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 * 适用地图：高德，Google Map，OSM
 */

function _Math_sinh (x) {
	return (Math.exp(x) - Math.exp(-x)) / 2
}


class TransformClassSlippy {
	constructor (levelRange_max, LevelRange_min) {
		this.levelMax = levelRange_max
		this.levelMin = LevelRange_min
	}

    /*
     * 某一瓦片等级下瓦片地图X轴(Y轴)上的瓦片数目
     */
	_getMapSize (level) {
		return Math.pow(2, level)
	}

    /*
     * 分辨率，表示水平方向上一个像素点代表的真实距离(m)
     */
	getResolution (latitude, level) {
		return 6378137.0 * 2 * Math.PI * Math.cos(latitude) / 256 / this._getMapSize(level)
	}

	_lngToTileX (longitude, level) {
		const x = (longitude + 180) / 360
		return Math.floor(x * this._getMapSize(level))
	}

	_latToTileY (latitude, level) {
		const lat_rad = latitude * Math.PI / 180
		const y = (1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI) / 2
		return Math.floor(y * this._getMapSize(level))
	}

    /*
     * 从经纬度获取某一级别瓦片坐标编号
     */
	lnglatToTile (longitude, latitude, level) {
		const tileX = this._lngToTileX(longitude, level)
		const tileY = this._latToTileY(latitude, level)

		return {
			tileX,
			tileY
		}
	}

	_lngToPixelX (longitude, level) {
		const x = (longitude + 180) / 360
		return Math.floor(x * this._getMapSize(level) * 256 % 256)
	}

	_latToPixelY (latitude, level) {
		const sinLatitude = Math.sin(latitude * Math.PI / 180)
		const y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI)
		return Math.floor(y * this._getMapSize(level) * 256 % 256)
	}

    /*
     * 从经纬度获取点在某一级别瓦片中的像素坐标
     */
	lnglatToPixel (longitude, latitude, level) {
		const pixelX = this._lngToPixelX(longitude, level)
		const pixelY = this._latToPixelY(latitude, level)

		return {
			pixelX,
			pixelY
		}
	}

	_pixelXTolng (pixelX, tileX, level) {
		const pixelXToTileAddition = pixelX / 256.0
		return (tileX + pixelXToTileAddition) / this._getMapSize(level) * 360 - 180
	}

	_pixelYToLat (pixelY, tileY, level) {
		const pixelYToTileAddition = pixelY / 256.0
		return Math.atan(_Math_sinh(Math.PI * (1 - 2 * (tileY + pixelYToTileAddition) / this._getMapSize(level)))) * 180.0 / Math.PI
	}

    /*
     * 从某一瓦片的某一像素点到经纬度
     */
	pixelToLnglat (pixelX, pixelY, tileX, tileY, level) {
		const lng = this._pixelXTolng(pixelX, tileX, level)
		const lat = this._pixelYToLat(pixelY, tileY, level)

		return {
			lng,
			lat
		}
	}
}

// uglifyJS时保持字段名称
export default new TransformClassSlippy(1, 19)
