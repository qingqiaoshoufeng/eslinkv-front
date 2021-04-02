<template lang="pug">
.pos-r(:style="{ marginTop: '50px' }")
	live-video
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LiveVideo from '../../../src/components-business/More/h-project1/live-video.vue'

@Component({
	components: { LiveVideo },
})
export default class Alive extends Vue {}
</script>
