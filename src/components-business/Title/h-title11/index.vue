<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-11 fn-flex">
			<p class="font-num">{{ data && data.value }}</p>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { value } from './index.component'

	export default {
		mixins: [mixins],
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">
	.h-title-11 {
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 4px 16px;
		background: rgba(0, 221, 255, 0.2);
		border-radius: 16px;

		p {
			font-size: 18px;
			line-height: 24px;
			color: #00ffcf;
		}
	}

</style>

