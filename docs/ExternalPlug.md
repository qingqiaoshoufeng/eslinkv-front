## 参考js
```javascript
/**
 * @description 加载三方包
 */
export function loadJs(src, value) {
	if (!src) {
		return
	}
	if (!window.loadJS) {
		window.loadJS = {}
	}
	if (typeof src === 'string') {
		return new Promise(resolve => {
			if (window.loadJS[value]) {
				resolve()
			} else {
				const el = document.createElement('script')
				el.src = src
				el.onload = () => {
					resolve()
					window.loadJS[value] = true
				}
				document.head.appendChild(el)
			}
		})
	} else {
		const p = []
		src.forEach((item, index) => {
			p.push(
				new Promise(resolve => {
					if (window.loadJS[value[index]]) {
						resolve()
					} else {
						const el = document.createElement('script')
						el.src = item
						el.onload = () => {
							resolve()
							window.loadJS[value[index]] = true
						}
						document.head.appendChild(el)
					}
				}),
			)
		})
		return Promise.all(p)
	}
}

/**
 * @description 加载三方包css
 */
export function loadCss(src, value) {
	if (!src) return
	if (!window.loadCSS) {
		window.loadCSS = {}
	}
	if (typeof src === 'string') {
		return new Promise(resolve => {
			if (window.loadCSS[value]) {
				resolve()
			} else {
				const el = document.createElement('link')
				el.rel = 'stylesheet'
				el.href = src
				el.onload = () => {
					resolve()
					window.loadCSS[value] = true
				}
				document.head.appendChild(el)
			}
		})
	} else {
		const p = []
		src.forEach((item, index) => {
			p.push(
				new Promise(resolve => {
					if (window.loadCSS[value[index]]) {
						resolve()
					} else {
						const el = document.createElement('link')
						el.rel = 'stylesheet'
						el.href = item
						el.onload = () => {
							resolve()
							window.loadCSS[value[index]] = true
						}
						document.head.appendChild(el)
					}
				}),
			)
		})
		return Promise.all(p)
	}
}
```

## 使用
```javascript
await loadJs('/cdn/highcharts/highcharts-9.0.1.js', 'Highcharts')
```
