<template lang="pug">
    .widget-part(:style="styles")
        .fn-flex.flex-row.h-title-3
            .left-box.circle.fn-flex(:style="{borderColor:config.config&&config.config.color}")
                img(:src="config.config&&config.config.background")
            .right-box.text-left
                h2
                    i.font-num {{data&&data.title}}
                    span {{config.config&&config.config.suffix}}
                ul.fn-flex.flex-row
                    li(v-for="(item,index) in icons" :key="index")
                p {{config.config&&config.config.subTitle}}
</template>
<script lang="ts">
	import { widgetMixin } from 'eslinkv-npm'
	import { Component } from 'vue-property-decorator'
	import { mixins } from 'vue-class-component'
	import { customConfig, value } from './index.component'

    @Component
    class HTitle3 extends mixins(widgetMixin) {
        icons: Int8Array = new Int8Array(50)

        created () {
            this.configValue = this.parseConfigValue(value, customConfig)
        }
    }

	export default HTitle3
</script>
<style lang="scss">
	.h-title-3 {
		width: 100%;
		height: 100%;

		.left-box {
			align-items: center;
			justify-content: center;
			width: 56px;
			height: 56px;
			margin-right: 12px;
			border: 1px dashed;
		}

		.right-box {
			ul {
				margin: 2px 0;
			}

			li {
				width: 1px;
				height: 4px;
				margin-right: 2px;
				background-color: rgba(96, 230, 255, 0.32);
				transform: rotate(-10deg);
			}

			h2 {
				font-size: 24px;
				line-height: 24px;
				color: #feffff;

				i {
					font-style: normal;
				}

				span {
					margin-left: 8px;
					font-size: 20px;
					font-weight: normal;
					line-height: 24px;
				}
			}

			p {
				font-size: 20px;
				line-height: 24px;
				color: rgba(254, 255, 255, 0.6);
			}
		}
	}
</style>

