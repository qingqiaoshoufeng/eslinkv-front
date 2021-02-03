<template lang="pug">
	.svg-external-icon.svg-icon(v-if="isExternal" :style="styleExternalIcon" v-on="$listeners")
	svg(v-else :class="svgClass" aria-hidden="true" v-on="$listeners")
		use(:xlink:href="iconName")
</template>
<script lang="ts">
	import {Vue, Component, Prop} from 'vue-property-decorator'
	import {isExternal} from '../../utils'

	@Component
	export default class dIcon extends Vue {
		@Prop(String) iconClass
		@Prop(String) className

		get isExternal() {
			return isExternal(this.iconClass)
		}

		get iconName() {
			return `#icon-${this.iconClass}`
		}

		get svgClass() {
			if (this.className) {
				return 'svg-icon ' + this.className
			} else {
				return 'svg-icon'
			}
		}

		get styleExternalIcon() {
			return {
				mask: `url(${this.iconClass}) no-repeat 50% 50%`,
				'-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
			}
		}
	}
</script>
<style lang="scss" scoped>
	.svg-icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}

	.svg-external-icon {
		background-color: currentColor;
		mask-size: cover !important;
		display: inline-block;
	}
</style>
