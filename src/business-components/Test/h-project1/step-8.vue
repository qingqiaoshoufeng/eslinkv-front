<template>
	<div class="h-project-1-step-8" :style="{left:`${left}%`}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon8" alt=""/>
		</div>
		<h2 class="pos-a text-center">抢修结束</h2>
		<h3 class="pos-a text-center">{{formatTime(step8.time)}}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step],
	}
</script>
<style lang="scss">
	.h-project-1-step-8 {

	}
</style>
