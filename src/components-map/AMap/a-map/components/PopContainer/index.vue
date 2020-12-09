<template>
	<DashboardPanel
		:delay="0"
		:show="ready"
		:speed="800"
		:transition="true"
		enter="animated fadeIn"
		leave="animated fadeOut"
	>
		<div
			class="pop-container"
			:style="{
				transform: `translate(${translateX}, calc(${translateY})`,
				width,
			}"
		>
			<div class="close-btn" v-show="showPopCloseBtn" @click="$emit('input', false)">
				<svg-icon icon-name="iconbaseline-close-px"></svg-icon>
			</div>
			<div class="triangle"></div>
			<slot></slot>
		</div>
	</DashboardPanel>
</template>

<script>
import SvgIcon from '../SvgIcon/index';
import DashboardPanel from '../DashboardPanel/index';
export default {
	name: 'PopContainer',
	components: {
		SvgIcon,
		DashboardPanel,
	},
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		width: {
			type: String,
			default: '240px',
		},
		bottom: {
			type: Number,
			default: 19,
        },
        parentInfo:{
            type:Object,
            default(){
                return {}
            }
        },
        showPopCloseBtn:{
            type:Boolean,
            default:false
        }
	},
	data() {
		return {
			ready: false,
		};
    },
    created(){
        console.log(this.parentInfo)
    },
	computed: {
		scaleRatio() {
			return (this.parentInfo && this.parentInfo.scaleRatio) || 1;
		},
		translateX() {
            let { scaleRatio } = this;
            console.log(scaleRatio,'scaleRatio')
			return `-${((1 - scaleRatio) / scaleRatio + 1) * 50}%`;
		},
		translateY() {
            let { scaleRatio,bottom } = this;
            let marginBottom = bottom + 14
			return `-${(1 - scaleRatio)/scaleRatio*50 + 100}% - ${marginBottom}px`;
		},
	},
	mounted() {
		this.ready = true;
	},
};
</script>

<style lang="scss" scoped>
.pop-container {
	position: relative;
	min-width: 240px;
	padding: 16px;
	font-size: 16px;
	background: rgba(0, 11, 37, 0.8);
	border: 1px solid #00ddff;
	box-sizing: border-box;
	color: #fff;
	transform: translate(-50%, -100%);
	.triangle {
		width: 0;
		height: 0;
		position: absolute;
		bottom: -15px;
		left: 50%;
		transform: translateX(-50%);
		border-left: solid 15px transparent;
		border-right: solid 15px transparent;
		border-top: solid 15px #00ddff;
	}
	.close-btn {
		background: #0057a9;
		border: 1px solid #00ddff;
		box-sizing: border-box;
		width: 24px;
		height: 24px;
		position: absolute;
		top: -32px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:active {
			opacity: 0.8;
		}
	}
}
</style>
