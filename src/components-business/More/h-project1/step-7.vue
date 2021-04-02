<template>
	<div class="h-project-1-step-7" :style="{ left: `${left}%` }">
		<div class="h-project-1-step-icon fn-flex">
			<img :src="icon7" alt="" />
		</div>
		<h2 class="pos-a text-center">抢修中</h2>
	</div>
</template>
<script>
import step from './step'

export default {
	mixins: [step],
}
</script>
<style lang="scss">
.h-project-1-step-7 {
}
</style>
