<template>
	<div class="h-project-1-step-6" :style="{left:`${left}%`}" v-if="step===6">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon6" alt=""/>
		</div>
		<h2 class="pos-a text-center">等待抢修</h2>
		<h3 v-if="step>6" class="pos-a text-center">{{formatTime(step6.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-6 {

	}
</style>
