<template>
	<div class="widget-part pos-r" :style="`${styles};top:0;${inPreview?'pointer-events: none;':''}`">
		<div class="h-left-bg1">
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import { config, value } from './index.component'

	export default {
		mixins: [mixins],
		created() {
			
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.h-left-bg1 {
		pointer-events: none;
		background-image: -webkit-linear-gradient(
				0deg,
				rgba(0, 4, 98, 0),
				rgba(0, 4, 98, 1)
		);
		width: 100%;
		height: 1050px;
		transform: rotateY(180deg);

		&:after {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-image: -webkit-linear-gradient(
					0deg,
					rgba(0, 4, 98, 0),
					rgba(0, 4, 98, 1)
			);
		}
	}

</style>

