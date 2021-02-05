<template lang="pug">
	ul.right-menu.pos-f(ref="rightMenu" @contextmenu.stop.prevent)
		li
			span 层叠 
			span.suffix 当前 {{ zIndex }}
			ul.sub-menu.pos-a
				li(@click="handleZIndex(1)") 上移一层
				li( @click="handleZIndex(-1)") 下移一层
				li(@click="handleZIndexTop") 置顶
				li( @click="handleZIndexBottom") 置底
		li(@click="copyWidget") 复制
		li(@click="handleUnActive") 取消选定
		li(@click="handleLock") {{ isLock ? '解锁' : '锁定' }}
		li(@click="hideWidget") 隐藏
		li(@click="deleteWidget") 删除
	</ul>
</template>
<script lang="ts">
	import {Vue, Component, Prop} from 'vue-property-decorator'
	import platform from '../../store/platform.store'

	@Component
	export default class rightMenu extends Vue {
		platform = platform.state
		@Prop deleteWidget
		@Prop copyWidget

		handleZIndex(num) {
			this.platform.widgetAdded[this.platform.chooseWidgetId].config.layout.zIndex = this.zIndex + num
		}

		handleZIndexTop() {

		}

		handleZIndexBottom() {

		}

		handleUnActive() {
			this.platform.chooseWidgetId = null
		}

		handleLock() {
			this.platform.widgetAdded[this.platform.chooseWidgetId].config.widget.locked = !this.isLock
		}

		get isLock() {
			return this.platform.widgetAdded[this.platform.chooseWidgetId].config.widget.locked
		}

		get zIndex() {
			return this.platform.widgetAdded[this.platform.chooseWidgetId].config.layout.zIndex
		}
	}
</script>
<style lang="scss">
	.right-menu {
		width: 120px;
		font-size: 12px;
		text-align: left;
		padding: 5px 0;
		border-radius: 5px;
		background-color: #fff;
		filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.15));
		opacity: 0;
		transform: translateY(10px);
		pointer-events: none;
		transition: transform 0.2s, opacity 0.2s;
		z-index: 2;

		.sub-menu {
			top: -5px;
			left: calc(100% + 5px);
			padding: 5px 0;
			border-radius: 5px;
			background-color: #fff;
			filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.15));
			opacity: 0;
			transform: translateY(-10px);
			pointer-events: none;
			transition: transform 0.2s, opacity 0.2s;

			&:before {
				content: '\23F4';
				position: absolute;
				top: 5px;
				left: -7px;
				color: #fff;
				font-size: 14px;
			}
		}

		li {
			position: relative;
			list-style: none;
			line-height: 30px;
			padding: 0 15px;
			white-space: nowrap;
			display: flex;
			justify-content: space-between;

			.suffix {
				font-size: 0.9em;
				opacity: 0.8;
			}

			&.disabled {
				pointer-events: none;
				opacity: 0.5;
			}

			& > .sub-menu:hover,
			&:hover > .sub-menu {
				opacity: 1;
				transform: translateY(0);
				pointer-events: auto;
				transition: transform 0.2s 0.2s, opacity 0.2s 0.2s;
			}
		}

		li:hover {
			background-color: #dcdcdc;
			cursor: pointer;
		}

		&.active {
			opacity: 1;
			transform: translateY(0);
			pointer-events: auto;
		}
	}
</style>
