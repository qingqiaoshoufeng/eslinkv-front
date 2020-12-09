<template>
	<div class="widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options'
	import {getInput, getBooleanInput, getSelect} from '../../../../lib';

	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
        icon: getSelect('icon', '折线上的图标', [
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgBjVPRUYNAEH2XcfxOB9KByViASQWxBNNBOhArSDqADtAKknw5oxPBCkIHYAGyvuUOORhksjMvYZe3u+9uF4O+yccCuF4B1QO9wEUzh2eYee7TJ21iOiW2wFXC5G9GliSbGsCaOBL7mqNcZ+YvWV8CX8SGSSWGrOZVIfveuwZl80Kr7nCpSRpbtdYJiLMvS0QCYk8UYi3RWO+4BbEwkCwCfo4wd3GTzL+UmPb6qty5MSa3RU6hcniJMuOZMo+4HUiGi0WtO4mJlcqRzvHGrUD3LmQy0Gl4Aq2KjmmBHPJ548WykQKvXveZclmgYlDWHmn9jwqNbTy/LqCVFm4k/TEmzbndSAOv+9SN3sXktKMT4VLzFq+/ygfYD2Zklesxq/x6le0UbMKS96EFUyp6hLzP2sQ33dYnPp2J5kMrWwXdLgF/Q+LWdVLLYSfwwsSDT/8FGjPas7LeaZQAAAAASUVORK5CYII=',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFKSURBVHgBjVPbUcNADNwz/wwlOMPwTUogFUAHkA7ogFABdBA6MKnAUIH9TTB2BzYFgLKSnfj8ymRndL7T6bEnyQ59bOUGDneUW55C0wlSnlMEeMbMFb55cNjlckF5oSaiQ8XvApfOmZxhSd0n/hEjo01C2w7U+VsSypvtp1DbvZptJ4hm1otToYmUSeMc8pD7mUUkpMSUUmpEquswyaS0ejW073vOe0cfZSfIVlY1a33Pl8y9AJFMI/ZY1My5iP88OY6yUwv6BiMlqjCNQYc0QGF0WqRHAmzQPmGuAxZw2XBAHjyj5QQL1T0eTn+Y23RaK7QlyaCNkVf9eKSNectc25HJGqdiMHga8YftHJ1zoJd5ba1vBq/uwsxVfM+C9XA4R2KD5c2GUc3libXKafPLn2thPoQbyRKyQCvurnm7D1JYsQXvuHIfvvkO+Uc0txLiEPoAAAAASUVORK5CYII='
        ]),
        isShowMaxMarker: getBooleanInput('isShowMaxMarker', '显示最大值标记'),
			}
		}
	}

	const config = {
		animation: true,
		config: {
			title: true,
			icon: true,
      isShowMaxMarker: true
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
				data: [
					{
						name: "1月",
						value: 10
					},
					{
						name: "2月",
						value: 40
					},
					{
						name: "3",
						value: 30
					},
					{
						name: "4月",
						value: 20
					},
					{
						name: "5月",
						value: 10
					},
					{
						name: "6月",
						value: 50
					}
				]
			})
		},
		config: {
			title: '%',
      isShowMaxMarker: true,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgBjVPRUYNAEH2XcfxOB9KByViASQWxBNNBOhArSDqADtAKknw5oxPBCkIHYAGyvuUOORhksjMvYZe3u+9uF4O+yccCuF4B1QO9wEUzh2eYee7TJ21iOiW2wFXC5G9GliSbGsCaOBL7mqNcZ+YvWV8CX8SGSSWGrOZVIfveuwZl80Kr7nCpSRpbtdYJiLMvS0QCYk8UYi3RWO+4BbEwkCwCfo4wd3GTzL+UmPb6qty5MSa3RU6hcniJMuOZMo+4HUiGi0WtO4mJlcqRzvHGrUD3LmQy0Gl4Aq2KjmmBHPJ548WykQKvXveZclmgYlDWHmn9jwqNbTy/LqCVFm4k/TEmzbndSAOv+9SN3sXktKMT4VLzFq+/ygfYD2Zklesxq/x6le0UbMKS96EFUyp6hLzP2sQ33dYnPp2J5kMrWwXdLgF/Q+LWdVLLYSfwwsSDT/8FGjPas7LeaZQAAAAASUVORK5CYII=',
    }
	}
	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data.data, this.config.config))
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(val)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		}
	}
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>

