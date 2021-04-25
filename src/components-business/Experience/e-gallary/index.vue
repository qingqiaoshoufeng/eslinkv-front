<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="container">
			<div class="item" v-for="(k, i) in data.list" :key="i">
				<div
					class="cover"
					:style="{ backgroundImage: `url(${k.cover})` }"
				>
					<div class="mask"></div>
				</div>
				<div class="sq">{{ k.name }}</div>
			</div>
		</div>
		<div class="main-mask"></div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	data() {
		return {}
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding-right: 30px;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 12px;
		height: 32px;

		/* height: 4px; */
	}

	&::-webkit-scrollbar-thumb {
		background: #0df;
		border-radius: 6px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0);
		border-radius: 0;
	}

	.item {
		margin-bottom: 32px;

		&.active .sq,
		&:hover .sq {
			background-image: url('./img/sq-bg-active.svg');
		}

		.cover {
			position: relative;
			width: 120px;
			height: 172px;
			margin-bottom: 8px;
			cursor: pointer;
			background-size: 100% 100%;

			&:hover .mask {
				display: block;
			}

			.mask {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: none;
				background: rgba(0, 0, 0, 0.5) url('./img/search.svg') no-repeat
					center;
			}
		}

		.sq {
			width: 120px;
			height: 32px;
			font-size: 20px;
			line-height: 32px;
			color: #fff;
			background: url('./img/sq-bg.svg');
			background-size: 100% 100%;
		}
	}
}

.main-mask {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 64px;
	background: linear-gradient(180deg, rgba(3, 9, 109, 0) 0%, #03096d 100%);
}
</style>
