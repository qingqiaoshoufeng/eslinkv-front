<template lang="pug">
  .empty-image(@click="handleClick")
    slot
</template>
<script>
	import { Vue, Component } from 'vue-property-decorator'

  @Component
	export default class EmptyImage extends Vue {
		handleClick () {
			this.$emit('click')
		}
	}
</script>
<style lang="scss">
	.empty-image {
		background-color: #ddd;
		background-image: url('/static/images/logo.png');
		filter: grayscale(100%);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 20% !important;
	}
</style>
