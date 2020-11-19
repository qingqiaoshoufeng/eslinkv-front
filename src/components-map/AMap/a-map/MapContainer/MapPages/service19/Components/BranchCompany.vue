<template>
	<BaseOverlay
		v-bind="{
			overlayIcon,
			overlayType,
			visible,
			apiFun,
		}"
		ref="BranchCompanyList"
		@initComplete="initComplete"
		@click="overlayClickInner"
	/>
</template>
<script>
import { BaseOverlay } from '../../Components/index';

export default {
	name: 'BranchCompany',
	components: {
		BaseOverlay,
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
		overlayIcon: {
			type: String,
			default: '',
		},
		overlayType: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			apiFun: this.$sysApi.map.serve.getBranchCompanyWithDetialInfoList,
		};
	},
	methods: {
		overlayClickInner(marker) {
			// if (this.timer) {
			// 	clearInterval(this.timer);
			// 	this.timer = null;
			// }
			// this.$emit('overlay-click', marker, this.overlayType, false, false);
		},
		initComplete() {
			this.startCarousel();
		},
		startCarousel() {
			let data = this.$refs.BranchCompanyList.list;
			let dataLen = data.length;
			let i = 0;
			let beforeI = -1;
			let { overlayType } = this;
			this.timer = setInterval(() => {
				this.$emit('overlay-click', data[i], overlayType, false, false);
				this.$set(data[i], 'active', true);
				if (beforeI > -1) {
					data[beforeI].active = false;
				}
				beforeI = i;
				if (i < dataLen - 1) {
					i++;
				} else {
					i = 0;
				}
			}, 5000);
		},
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	},
};
</script>



