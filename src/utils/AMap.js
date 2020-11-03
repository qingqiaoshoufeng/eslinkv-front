export default function MapLoader(
	plugins = '&plugin=AMap.Scale,AMap.ToolBar,AMap.DistrictSearch',
	key = '8081bdaac8258a8a4a6244bf16084fed',
	version = '2.0'
) {
	return new Promise((resolve, reject) => {
		if (window.AMap) {
			resolve({AMap: window.AMap, AMapUI: window.AMapUI})
		} else {
			window.initAMapUI = () => {
				resolve({AMap: window.AMap, AMapUI: window.AMapUI})
			}
			window.initAMap = () => {
				const script = document.createElement('script')
				script.async = true
				script.src = `//webapi.amap.com/ui/1.1/main.js?v=1.1.1`
				script.onload = initAMapUI
				script.onerror = reject
				document.head.appendChild(script)
			}
			const script = document.createElement('script')
			script.async = true
			script.src = `//webapi.amap.com/maps?v=${version}${plugins}&callback=initAMap&key=${key}`
			script.onerror = reject
			document.head.appendChild(script)
		}
	})
}
