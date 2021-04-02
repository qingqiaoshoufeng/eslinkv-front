<template lang="pug">
div(
	v-if="image",
	:style="{ backgroundImage: `url(${image})` }",
	@click="handleClick")
	slot
.empty-image(v-else, @click="handleClick")
	slot
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EmptyImage extends Vue {
	@Prop(String) image: string

	handleClick() {
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
