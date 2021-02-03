<template lang="pug">
	.d-bottom-bar.fn-flex.flex-row.pos-a(v-show="platform.rulerVisible")
		label.d-bottom-info.fn-flex.flex-row(v-if="platform.panelConfig.info")
			i-icon(type="md-information-circle" size="18")
			span {{ platform.panelConfig.size.width}}×{{platform.panelConfig.size.height}}{{ platform.panelConfig.size.unit}}
		label.d-bottom-hot-keys.pos-r.fn-flex.flex-row
			d-svg.pointer(icon-class="keyboard" title="快捷键")
			.d-bottom-hot-key-list.pos-a
				ul
					li.fn-flex.flex-row(v-for="item in platform.hotKeys" :key="item.name")
						label.d-bottom-name {{ item.name }}
						.d-bottom-key-code.fn-flex.flex-row(v-for="child in item.key")
							i.d-bottom-hot-key-text(v-if="child.type==='text'") {{ child.value }}
							span.d-bottom-hot-key-item(v-if="child.type==='+'") +
							img.d-bottom-hot-key-img(v-if="child.type==='img'" :src="child.value")
		label.d-bottom-auto-align-guide.fn-flex.flex-row
			i-checkbox(v-model="platform.autoAlignGuide")
			span 自动贴靠参考线
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import platform from '../../store/platform.store'
	import {Icon, Checkbox} from 'view-design'

	@Component({
		components: {
			'i-icon': Icon,
			'i-checkbox': Checkbox,
		}
	})
	export default class bottomBar extends Vue {
		platform = platform.state
	}
</script>
<style lang="scss">
	@import "../../../src/scss/conf";

	.d-bottom-bar {
		align-items: center;
		justify-content: center;
		right: 15px;
		padding: 4px 10px;
		background-color: rgba(0, 0, 0, 0.5);
		user-select: none;
		transition: all .3s;
		opacity: .5;
		bottom: 15px;
		z-index: 2;
		color: $white_08;
		border-radius: 2px;

		&:hover {
			opacity: 1;
		}
	}

	.d-bottom-auto-align-guide, .d-bottom-hot-keys, .d-bottom-info {
		align-items: center;
		justify-content: center;
	}

	.d-bottom-info {
		margin-right: 10px;
	}

	.d-bottom-hot-keys {
		margin-right: 10px;

		.d-bottom-hot-key-list {
			left: 50%;
			bottom: 100%;
			transform: translate3d(-50%, -20px, 0);
			opacity: 0;
			padding: 10px;
			pointer-events: none;
			transition: all .3s;
			color: #717171;
			background: #fff;
			border-radius: 2px;
			border: 1px solid $borderColor;

			li {
				white-space: nowrap;
				align-items: center;
				padding: 4px 0;

				label {
					margin-right: auto;
				}

				.d-bottom-name {
					text-align: right;
					padding: 3px 10px;
					letter-spacing: 0;
				}

				.d-bottom-key-code {
					padding-right: 10px;
				}

				.d-bottom-hot-key-img {
					width: 22px;
					padding: 0 2px;
					text-align: center;
				}

				.d-bottom-hot-key-text {
					border: 1px solid #ddd;
					min-width: 22px;
					padding: 0 4px;
					text-align: center;
					font-style: normal;
					border-radius: 2px;
				}
			}
		}

		&:hover {
			color: $white;

			.d-bottom-hot-key-list {
				opacity: 1;
				transform: translate3d(-50%, -10px, 0);
			}
		}
	}
</style>
