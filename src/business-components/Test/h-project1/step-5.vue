<template>
	<div class="h-project-1-step-5" :style="{left}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon5" alt=""/>
		</div>
		<h2 class="pos-a text-center">{{step===5?'等待到达':'到达'}}</h2>
		<h3 v-if="step>5" class="pos-a text-center">{{formatTime(step5.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-5 {

	}
</style>
