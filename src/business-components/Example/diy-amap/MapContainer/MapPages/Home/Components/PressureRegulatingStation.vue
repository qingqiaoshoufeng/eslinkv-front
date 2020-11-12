调压站
<template>
	<div>
		<Overlay
			v-for="(item, index) in list || []"
			:key="'PressurereGulatingStation' + index"
			:marker="{
				...item,
				icon: 'icontiaoyazhan',
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
import { PRESSUREREGULATINGSTATIONLIST } from '@/business-components/Example/diy-amap/config/index';
export default {
	name: 'PressurereGulatingStation',
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
		getData() {
			this.list = PRESSUREREGULATINGSTATIONLIST;
		},
		handleOverlayClick(marker) {
			this.$emit('overlay-click', marker, 'PRESSUREREGULATINGSTATION');
		},
	},
};
</script>

