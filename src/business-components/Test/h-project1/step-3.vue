<template>
	<div class="h-project-1-step-3" :style="{left:`${left}%`}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon3" alt=""/>
		</div>
		<h2 class="pos-a text-center">{{step===3?'等待接单':'接单'}}</h2>
		<h3 v-if="step>3" class="pos-a text-center">{{formatTime(step3.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-3 {

	}
</style>
