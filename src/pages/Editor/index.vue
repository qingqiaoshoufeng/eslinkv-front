<template lang="pug">
.home-container
	d-detail
	d-screen
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
const { dScreen, dDetail } = eslinkV
@Component({
	components: { dScreen, dDetail },
})
export default class editor extends Vue {
	mounted() {
		this.$api.marketComponentType.market()
	}
}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
