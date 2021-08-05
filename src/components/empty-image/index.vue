<template lang="pug">
div(
	v-if="image",
	:style="{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize, backgroundRepeat: 'no-repeat' }",
	@click="handleClick")
	slot
.empty-image(
	v-else,
	@click="handleClick",
	:style="{ backgroundImage: `url(${empty[index]})` }")
	slot
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

const empty = [
	require('../../assets/empty/screen-empty1.jpeg'),
	require('../../assets/empty/screen-empty2.jpeg'),
	require('../../assets/empty/screen-empty3.jpeg'),
	require('../../assets/empty/screen-empty4.jpeg'),
]
@Component
export default class EmptyImage extends Vue {
	@Prop(String) image: string
	@Prop({ default: '100% 100%' }) backgroundSize: string
	index = Math.floor(Math.random() * 4)
	empty = empty
	handleClick(): void {
		this.$emit('click')
	}
}
</script>
<style lang="scss">
.empty-image {
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
}
</style>
