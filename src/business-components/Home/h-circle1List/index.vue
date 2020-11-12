<template>
	<div class="widget-part fn-flex flex-row" :style="styles">
		<div class="circle1list-box">
			<div class="left-list"></div>
			<div class="right-circle">
				<circle1 :data="computedData" />
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import circle1 from './circle1';

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			color: [
				'rgba(0, 62, 144, 0.8)',
				'rgba(0, 145, 210, 0.8)',
				'rgba(0, 233, 194, 0.8)',
			],
			title: '钢管（米）',
			value: [
				{ title: '设计量：', value: 34452 },
				{ title: '领用量：', value: 23445 },
				{ title: '核销量：', value: 13345 },
			],
		}),
	},
};
export default {
	data() {
		return {};
	},
	mixins: [mixins],
    components: { circle1 },
    computed:{
        computedData(){
            return this.data
        }
    },
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss">
.circle1list-box {
	width: 100%;
	height: 100%;
	display: flex;
	.left-list {
		width: 100px;
		height: 140px;
		background-color: #000;
	}
}
</style>

