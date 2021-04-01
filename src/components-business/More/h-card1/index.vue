<template>
	<div class="widget-part" :style="styles">
		<div class="h-card-1 pos-a"/>
		<div class="h-card-1-title fn-flex flex-row pos-r">
			<ul class="h-card-1-icon pos-r">
				<li
					class="pos-a"
					v-for="(item,index) in icon"
					:key="index"
					:style="{transform:`rotate(${18 * index}deg)`}"
				></li>
				<img class="pos-a" src="" alt=""/>
			</ul>
			<h2>{{ data && data.title }}</h2>
		</div>
		<ul class="h-card-1-list fn-flex flex-row pos-a">
			<li class="fn-flex flex-column" v-for="(item,index) in data ? data.value : []" :key="index">
				<h3>{{ item.title }}</h3>
				<p>{{ item.value }}<span>{{ item.suffix }}</span></p>
			</li>
		</ul>
		<div class="pos-a h-card-1-top-left"></div>
		<div class="pos-a h-card-1-top-right"></div>
		<div class="pos-a h-card-1-bottom-left"></div>
		<div class="pos-a h-card-1-bottom-right"></div>
	</div>
</template>

<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { config, value } from './index.component'

	export default {
		mixins: [widgetMixin],
		data () {
			return {
				icon: new Int8Array(20)
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">

	.h-card-1-list {
		bottom: 14px;
		left: 16px;

		h3 {
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.6);
		}
	}

	.h-card-1-icon {
		width: 24px;
		height: 24px;

		li {
			top: 0;
			left: 50%;
			width: 2px;
			height: 1px;
			margin-left: -0.5px;
			background-color: #0df;
			transform-origin: 0 12px;
		}
	}

	.h-card-1-title {
		top: 14px;
		left: 16px;
		align-items: center;

		h2 {
			margin-left: 8px;
			font-size: 20px;
			line-height: 28px;
			color: #fff;
		}
	}

	.h-card-1 {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 1px solid #0df;
		box-shadow: inset 0 0 24px rgba(0, 221, 255, 0.4);
		opacity: 0.2;
	}

	.h-card-1-top-left,
	.h-card-1-top-right,
	.h-card-1-bottom-left,
	.h-card-1-bottom-right {
		&::before,
		&::after {
			position: absolute;
			width: 2px;
			height: 16px;
			content: '';
			background-color: #0df;
		}

		&::after {
			transform: rotate(90deg);
		}
	}

	.h-card-1-top-left {
		top: 0;
		left: 0;

		&::before {
			top: 0;
			left: -0.5px;
		}

		&::after {
			top: -7.5px;
			left: 6.5px;
		}
	}

	.h-card-1-top-right {
		top: 0;
		right: 0;

		&::before {
			top: 0;
			left: -1.5px;
		}

		&::after {
			top: -7.5px;
			left: -8.5px;
		}
	}

	.h-card-1-bottom-left {
		bottom: 0;
		left: 0;

		&::before {
			top: -15.5px;
			left: -0.5px;
		}

		&::after {
			top: -8.5px;
			left: 6.5px;
		}
	}

	.h-card-1-bottom-right {
		right: 0;
		bottom: 0;

		&::before {
			top: -15.5px;
			left: -1.5px;
		}

		&::after {
			top: -8.5px;
			left: -8.5px;
		}
	}

</style>

