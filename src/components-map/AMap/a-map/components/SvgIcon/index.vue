<template>
	<div
		:style="styleExternalIcon"
		class="svg-external-icon svg-icon"
		v-if="isExternal"
		v-on="$listeners"
		@click="handleClick"
	/>
	<svg
		:class="svgClass"
		aria-hidden="true"
		:style="{ backfaceVisibility: 'hidden' }"
		v-else
		@click="handleClick"
	>
		<use :xlink:href="iconNameComputed" />
	</svg>
</template>

<script>
export default {
	name: 'SvgIcon',
	props: {
		iconName: {
			type: String,
			required: true,
		},
		iconPrefix: {
			type: String,
			default: '',
		},
		className: {
			type: String,
			default: '',
		},
	},
	computed: {
		isExternal() {
			return /^(https?:|mailto:|tel:)/.test(this.iconName)
		},
		iconNameComputed() {
			const { iconPrefix, iconName } = this
			if (iconPrefix) {
				return `#${iconPrefix}-${iconName}`
			} else {
				return `#${iconName}`
			}
		},
		svgClass() {
			if (this.className) {
				return 'svg-icon ' + this.className
			} else {
				return 'svg-icon'
			}
		},
		styleExternalIcon() {
			return {
				mask: `url(${this.iconName}) no-repeat 50% 50%`,
				'-webkit-mask': `url(${this.iconName}) no-repeat 50% 50%`,
			}
		},
	},
	methods: {
		handleClick() {
			this.$emit('click')
		},
	},
}
</script>

<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	overflow: hidden;
	vertical-align: middle;
	fill: currentColor;
}

.svg-external-icon {
	display: inline-block;
	background-color: currentColor;
	mask-size: cover !important;
}
</style>
