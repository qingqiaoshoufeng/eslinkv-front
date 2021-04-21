## 参考js
```javascript
/**
 * @description 加载三方包
 */
export function loadJs(src, value) {
	if (!src) {
		return
	}
	if (typeof src === 'string') {
		return new Promise(resolve => {
			if (window[value]) {
				resolve()
			} else {
				const el = document.createElement('script')
				el.src = src
				el.onload = () => {
					resolve()
					if (!window[value]) window[value] = true
				}
				document.head.appendChild(el)
			}
		})
	} else {
		const p = []
		src.forEach((item, index) => {
			p.push(
				new Promise(resolve => {
					if (window[value[index]]) {
						resolve()
					} else {
						const el = document.createElement('script')
						el.src = item
						el.onload = () => {
							resolve()
							if (!window[value]) window[value] = true
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
