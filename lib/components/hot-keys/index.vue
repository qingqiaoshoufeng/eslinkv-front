<template lang="pug">
	label.hot-keys.pos-r
		span 查看快捷键
		.hot-key-list.pos-a
			table
				tr(v-for="item in hotKeys" :key="item.name")
					td.name {{ item.name }}
					td.key-code
						code.hot-key-item {{ item.key }}
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'

	@Component
	class hotKeys extends Vue {
		hotKeys: Array<any> = [
			{name: '插入水平参考线', key: 'Alt + H'},
			{name: '插入垂直参考线', key: 'Alt + V'},
			{name: '锁定标尺参考线', key: 'Alt + L'},
			{name: '清除全部参考线', key: 'Alt + C'},
			{name: '隐藏标尺参考线', key: 'Alt + R'},
			{name: '缩放画布', key: 'Ctrl + 滚轮'},
			{name: '抓手', key: '空格 + 左键'},
			{name: '移动画布', key: 'Shift + ←↑↓→'},
			{name: '水平移动画布', key: 'Shift + 滚轮'},
			{name: '垂直移动画布', key: '滚轮'},
			{name: '删除选定小工具', key: 'Delete'},
			{name: '画布全屏切换', key: 'F11'}
		]
	}

	export default hotKeys
</script>
<style lang="scss">
	.hot-keys {
		.hot-key-list {
			left: 50%;
			bottom: 100%;
			transform: translate3d(-50%, -20px, 0);
			opacity: 0;
			padding: 10px;
			pointer-events: none;
			transition: 0.2s;
			color: #717171;
			background: white;
			border-radius: 7px;
			border: #2d8cf0 3px solid;
			filter: drop-shadow( 0 4px 7px #2d8cf094);

			td {
				white-space: nowrap;

				&.name {
					text-align: right;
					padding: 3px 10px;
					letter-spacing: 0;
				}

				&.key-code {
					padding-right: 10px;

					.hot-key-item {
						background-color: #2d8cf0;
					}
				}
			}

			&:after {
				content: '';
				position: absolute;
				top: 100%;
				left: 0;
				right: 0;
				margin: auto;
				color: #2d8cf0;
				width: 36px;
				height: 36px;
			}
		}

		&:hover {
			color: #eaea2e;

			.hot-key-list {
				opacity: 1;
				pointer-events: auto;
				transform: translate3d(-50%, -10px, 0);
			}
		}
	}

	.hot-key-item {
		position: relative;
		background-color: grey;
		padding: 1px 5px;
		border-radius: 3px;
		color: white;
	}
</style>
