<template lang="pug">
.at-container(:id="id")
	div(:style="pageTransform")
		.at-content(
			:style="textExpend ? 'max-height:600px' : 'max-height:400px'",
			:class="ready ? 'ready' : ''")
			div(@click.stop="close")
				svg-icon.close-btn.pointer(icon-name="iconbaseline-close-px")
			ms-item(
				:data="innerData",
				@changeExpend="changeExpend",
				:alwaysExpend="true",
				@refresh="refresh")
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MsItem from '../messageItem/index.vue'
import SvgIcon from '../../../SvgIcon/index.vue'

@Component({ components: { 'ms-item': MsItem, 'svg-icon': SvgIcon } })
class MessageAlert extends Vue {
	id = ''
	innerData: any = {}
	ready = false
	showTextExpend = false
	textExpend = false
	pageTransform = 'scale(1) translate3d(0px, 0px, 0px)'
	@Prop(Object) data: any
	created() {
		this.id = 'MessageAlert' + Math.ceil(Math.random() * 100)
		this.innerData = this.data
		const arr = document.getElementById('kanban').style.cssText.split(';')
		let s = ''
		arr.forEach(item => {
			if (item.indexOf('background') === -1) s += `${item};`
		})
		this.pageTransform = s
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
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99999;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: auto;
	pointer-events: none;
	inset: 0;

	> div {
		position: relative;
		right: 0;
		z-index: 99999;
		flex-grow: 0;
		flex-shrink: 0;
		overflow: hidden;
		pointer-events: none;
		background-color: transparent;

		.at-content {
			position: absolute;
			right: 32px;
			bottom: -100%;
			z-index: 2000;
			width: 480px;
			font-size: 20px;
			color: #fff;
			pointer-events: all;
			background: #012f87;
			border-top: 4px solid #0df;
			transition: all 0.3s ease 0s;

			&.ready {
				bottom: 24px;
				opacity: 1;
			}

			.close-btn {
				position: absolute;
				top: 24px;
				right: 24px;
				z-index: 2;
				font-size: 34px;
				color: #fff;
			}

			&::v-deep {
				.title {
					font-size: 32px;
					font-weight: 600;
					line-height: 32px;
					color: #ffdc45;
				}

				.message-item {
					max-height: 600px;
					overflow: auto;
				}
			}
		}
	}

	::-webkit-scrollbar {
		display: none;
	}
}
</style>
