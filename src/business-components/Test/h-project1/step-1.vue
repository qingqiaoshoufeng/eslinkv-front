<template>
	<div class="h-project-1-step-1">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon1" alt=""/>
		</div>
		<h2 class="pos-a text-center">报警</h2>
		<h3 class="pos-a text-center">{{formatTime(step1.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-1 {
		left: 0;
	}
</style>
