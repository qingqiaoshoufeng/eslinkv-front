<template lang="pug">
.home-container
	d-detail
	d-screen
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { dScreen, dDetail } from '@eslinkv/vue2'
import { market } from '@/api/marketComponentType.api.js'

@Component({
	components: { dScreen, dDetail },
})
export default class editor extends Vue {
	mounted(): void {
		market()
	}
}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
