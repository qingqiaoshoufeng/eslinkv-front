<template lang="pug">
 .at-container(:id="id")
        div(:style="pageTransform")
            .at-content(:style="textExpend?'max-height:600px':'max-height:400px'" :class="ready?'ready':''" ) 
                div(@click.stop="close")
                    svg-icon.close-btn.pointer(icon-name="iconbaseline-close-px")
                ms-item(:data="innerData" @changeExpend="changeExpend" :alwaysExpend="true" @refresh="refresh")    
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MsItem from '../messageItem/index.vue'
import SvgIcon from '../../../SvgIcon/index.vue'

@Component({ components: { 'ms-item': MsItem, 'svg-icon': SvgIcon } })
class MessageAlert extends Vue {
	id: string = ''
	innerData: object = {}
	ready: boolean = false
	showTextExpend: boolean = false
	textExpend: boolean = false
	pageTransform: string = 'scale(1) translate3d(0px, 0px, 0px)'
	@Prop(Object) data: any
	created() {
		this.id = 'MessageAlert' + Math.ceil(Math.random() * 100)
		this.innerData = this.data
		this.pageTransform = document.getElementById('kanban').style.cssText
	}
	mounted() {
		setTimeout(() => {
			this.ready = true
		}, 300)
	}
	close() {
		this.ready = false
		setTimeout(() => {
			this.$destroy()
		}, 300)
	}
	refresh(data) {
		if (data === false) return
		this.innerData = data
	}
	changeExpend(val) {
		this.textExpend = val
	}
	beforeDestroy() {
		document.getElementById(this.id)?.remove()
	}
}

export default MessageAlert
</script>
<style lang="scss">
.at-container {
	pointer-events: auto;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	inset: 0px;
	z-index: 99999;
	justify-content: center;
	align-items: center;
	display: flex;
	pointer-events: none;
	> div {
		position: relative;
		flex-shrink: 0;
		flex-grow: 0;
		overflow: hidden;
		background-color: transparent;
		z-index: 99999;
		right: 0px;
		pointer-events: none;
		.at-content {
			pointer-events: all;
			position: absolute;
			width: 480px;
			color: #fff;
			background: #012f87;
			border-top: 4px solid #00ddff;
			bottom: -100%;
			right: 32px;
			z-index: 2000;
			font-size: 20px;
			transition: all 0.3s ease 0s;

			&.ready {
				opacity: 1;
				bottom: 24px;
			}
			.close-btn {
				position: absolute;
				top: 24px;
				right: 24px;
				font-size: 34px;
				color: #fff;
				z-index: 2;
			}
			/deep/ {
				.title {
					font-size: 32px;
					line-height: 32px;
					color: #ffdc45;
					font-weight: 600;
				}
				.message-item {
					overflow: auto;
					max-height: 600px;
				}
			}
		}
	}
	::-webkit-scrollbar {
		display: none;
	}
}
</style>
