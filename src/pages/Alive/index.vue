<template lang="pug">
	.pos-r(:style="{marginTop:'50px'}")
		live-video
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import LiveVideo from '../../components/LiveVideo/index.vue'

	@Component({
		components:{LiveVideo}
	})
	class Alive extends Vue {

	}
	export default Alive
</script>
