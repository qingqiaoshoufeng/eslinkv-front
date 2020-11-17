<template>
	<div class="widget-part pos-r" :style="`${styles};top:0`">
		<div class="h-left-bg1">
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import addMonths from 'date-fns/addMonths'
	import isSameMonth from 'date-fns/isSameMonth'
	import format from 'date-fns/format'

	const config = {animation: true}

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config)
		}
	}
</script>
<style lang="scss" scoped>
	.h-left-bg1 {
		pointer-events: none;
		background-image: -webkit-linear-gradient(
				0deg,
				rgba(0, 5, 35, 0),
				rgba(0, 5, 35, 0.9)
		);
		width: 1128px;
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
					rgba(0, 5, 35, 0),
					rgba(0, 5, 35, 0.9)
			);
		}
	}

</style>

