<template>
	<div id="app">
		<router-view />
	</div>
</template>
<style lang="scss">
.viewer-backdrop {
	background: transparent !important;
}

.vjs-poster {
	transform: translateZ(0);
}

.vjs-big-play-button {
	backface-visibility: hidden;
}

.vjs-icon-placeholder::before {
	backface-visibility: hidden;
}
</style>
