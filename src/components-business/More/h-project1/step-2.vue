<template>
	<div class="h-project-1-step-2" :style="{left:`${left}%`}">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon2" alt=""/>
		</div>
		<h2 class="pos-a text-center">受理</h2>
		<h3 class="pos-a text-center">{{ formatTime(step2.time) }}</h3>
	</div>
</template>
<script>
	import step from './step'

	export default {
		mixins: [step]
	}
</script>
<style lang="scss">
	.h-project-1-step-icon {
		position: relative;
	}
</style>
