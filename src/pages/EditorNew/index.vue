<template lang="pug">
.home-container
	d-detail
	d-screen
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
const { dScreen, market } = eslinkV
import dDetail from '../../components/d-detail/index.vue'
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
