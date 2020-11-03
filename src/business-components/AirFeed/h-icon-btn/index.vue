<template>
	<div class="h-icon-btn" :style="styles" @click="btnClickEvt">
		<div class="h-icon-btn__icon" :style="`background-image: url(${iconBgImg})`"></div>
		<div class="h-icon-btn__text" :style="`color: ${textColor}`">{{ data && data.text }}</div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	const config = {}
	const value = {
		api: {
			data: JSONStringify({
				icon: '/static/icons/2d-map.svg',
				text: '3D地图',
				activedIcon: '/static/icons/2d-map.svg',
				color: 'rgba(255, 255, 255, 0.75)',
				activedColor: '#ffffff',
				actived: false
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			btnClickEvt(){
				this.data && (this.data.actived = !this.data.actived)
			}
		},
		computed: {
			iconBgImg(){
				const data = this.data || {};
				return (data.actived  &&  data.activedIcon) || data.icon;
			},
			textColor(){
				const data = this.data || {};
				return (data.actived  &&  data.activedColor) || data.color;
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	}
</script>
<style lang="scss">
.h-icon-btn {
	display: flex;
	padding: 8px 8px 8px 12px;
	background: #000A40;
	border: 1px solid #0057A9;
	align-items: center;
	cursor: pointer;
	&__icon {
		width: 24px;
		height: 24px;
		background-size: 16px;
		background-repeat: no-repeat;
		background-position: center;
		margin-right: 12px;
	}
	&__text{
		font-size: 16px;
		line-height: 16px;
		color: rgba(255, 255, 255, 0.75);
	}
}
</style>

