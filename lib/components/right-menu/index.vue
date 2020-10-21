<template>
	<ul class="right-menu pos-f" ref="rightMenu" @contextmenu.stop.prevent>
		<li :class="{disabled: rightMenuGrid}">
			层叠 <span class="suffix">当前 {{ zIndexMap[rightMenuBindWidgetId] }}</span>
			<ul class="sub-menu pos-a">
				<li @click="updateWidgetZIndex(1)">上移一层</li>
				<li :class="{ disabled: zIndexMap[rightMenuBindWidgetId] === 0 }" @click="updateWidgetZIndex(-1)">下移一层
				</li>
				<li @click="updateWidgetZIndex('top')">置顶</li>
				<li :class="{ disabled: zIndexMap[rightMenuBindWidgetId] === 0 }" @click="updateWidgetZIndex('bottom')">
					置底
				</li>
			</ul>
		</li>
		<li @click="copyWidget">复制</li>
		<li :class="{disabled: rightMenuBindWidgetId !== activatedWidgetId}"
			@click="deactivateWidget(activatedWidgetId)">
			取消选定
		</li>
		<li @click="toggleWidgetLock">{{ isWidgetLocked ? '解锁' : '锁定' }}</li>
		<li :class="{disabled: rightMenuGrid}" @click="hideWidget">隐藏</li>
		<li :class="{disabled: rightMenuBindWidgetId !== activatedWidgetId || rightMenuGrid}" @click="deleteWidget">删除</li>
	</ul>
</template>
<script>
	export default {
		props: [
			'hideWidget',
			'isWidgetLocked',
			'zIndexMap',
			'updateWidgetZIndex',
			'rightMenuGrid',
			'rightMenuBindWidgetId',
			'toggleWidgetLock',
			'copyWidget',
			'deactivateWidget',
			'activatedWidgetId',
			'deleteWidget'
		]
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
