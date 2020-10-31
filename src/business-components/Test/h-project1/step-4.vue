<template>
	<div class="h-project-1-step-4" :style="{left}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon4" alt=""/>
		</div>
		<h2 class="pos-a text-center">{{step===4?'等待出车':'出车时间'}}</h2>
		<h3 v-if="step>4" class="pos-a text-center">{{formatTime(step4.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-4 {

	}
</style>
