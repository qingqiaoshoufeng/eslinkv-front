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
		getData() {
			this.list = GASSTATIONLIST;
		},
	},
};
</script>

