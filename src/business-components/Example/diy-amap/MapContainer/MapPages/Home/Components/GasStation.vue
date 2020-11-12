<template>
	<div>
		<Overlay
			v-for="(item, index) in list || []"
			:key="'GasStation' + index"
			:marker="{
				...item,
				icon: 'iconmenzhan',
			}"
			:visible="visible"
			@click="handleOverlayClick(item)"
		/>
	</div>
</template>
<script>
import overlayMixin from '../../mixins/overlayMixin.js';
import { Overlay } from '@/business-components/Example/diy-amap/components/index';
//配置项
import { GASSTATIONLIST } from '@/business-components/Example/diy-amap/config/index';
export default {
	name: 'GasStation',
	mixins: [overlayMixin],
	components: {
		Overlay,
	},
	data() {
		return {
			list: [],
		};
	},
	methods: {
		init() {
			this.getData();
		},
		async getData() {
			this.list = await this.$sysApi.map.home.gasStationList();
		},
		handleOverlayClick(marker) {
			this.$emit('overlay-click', marker, 'GASSTATION');
		},
	},
};
</script>

