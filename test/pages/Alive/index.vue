<template lang="pug">
	.pos-r(:style="{marginTop:'50px'}")
		live-video
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import LiveVideo from '../../../src/components/LiveVideo/index.vue'

	@Component({
		components:{LiveVideo}
	})
	export default class Alive extends Vue {

	}
</script>
