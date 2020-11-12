<template>
	<div>
		<Overlay
			v-for="(item, index) in list || []"
			:key="'InspectionCar' + index"
			:marker="{
				...item,
				icon: 'iconcheliang',
			}"
			:visible="visible"
		/>
	</div>
</template>
<script>
import overlayMixin from '../../mixins/overlayMixin.js';
import { Overlay } from '@/business-components/Example/diy-amap/components/index';
//配置项
import { INSPECTIONCAR } from '@/business-components/Example/diy-amap/config/index';
export default {
	name: 'ComprehensiveServiceStation',
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
			this.list = INSPECTIONCAR;
		},
	},
};
</script>

