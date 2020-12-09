<template>
	<div
		class="tab-panel"
		v-show="active"
		role="tabpan"
		:aria-hidden="!active"
		:id="`pane-${name}`"
		:aria-labledby="`tab-${name}`"
	>
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: 'TabPane',
	props: {
		label: String,
		name: String,
		lazy: Boolean,
	},

	data() {
		return {
			loaded: false,
		};
    },

	computed: {
		active() {
            const active = this.$parent.currentName === this.name;
			if (active) {
				this.loaded = true;
				this.$parent.activeTab = this.name;
            }
			return active;
		},
	},
};
</script>
