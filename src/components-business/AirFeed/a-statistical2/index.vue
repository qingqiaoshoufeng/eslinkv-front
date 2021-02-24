<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="statistical2-box">
			<div class="left fn-flex flex-column">
				<div class="time">{{ year }}{{config.config.timeDesc}}</div>
				<div class="decs">
					{{ config.config.desc }}
				</div>
			</div>
			<div class="right">
				<div class="value">
					<div
						v-for="(item, index) in statisticalVal"
						:key="index"
						class="font-num"
						:class="{ item: item !== ',', comma: item === ',' }"
					>
						<!-- 滚动盒子 -->
						<div class="scroll-box" v-if="item !== ','">
							<div
								class="scroll-list"
								ref="numberItem"
								:style="{
									transform: `translate(0, -${transform[index]}%)`,
								}"
							>
								<div
									class="scroll-item"
									v-for="(child, key) in scrollList"
									:key="key"
								>
									{{ key }}
								</div>
							</div>
						</div>
						<!-- 逗号盒子 -->
						<div class="comma" v-else>{{ item }}</div>
					</div>
				</div>
			</div>
			<div class="right-more pos-r" @click="handleClick" :class="{pointer:config.config.sceneId}">
				<div class="right-more-total font-num">{{data.todayData |toThousand}}</div>
				<div class="right-more-des">{{config.config.rightDesc}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import format from 'date-fns/format'
	import {config, configSource, value} from './index.component'
	import scene from '../../../../lib/store/scene.store'

	export default {
		data() {
			return {
				year: new Date().getFullYear(),
				scrollList: new Int8Array(10),
				transform: new Int8Array(9),
			};
		},
		mixins: [mixins],
		computed: {
			statisticalVal() {
				if (this.data) return Number(this.data.yearData).toLocaleString().split('');
				return [];
			},
			timeDesc() {
				if (!this.data || !this.config.config) return '2020年度';
				return this.config.config.timeDesc.replace('xxxx', this.data.time);
			},
		},
		methods: {
			handleClick() {
				if (this.config.config.sceneId) {
					scene.actions.createSceneInstance(this.config.config.sceneId, 'slideRight')
					if (this.config.config.componentId) {
						this.$nextTick(() => {
							scene.actions.updateComponent(this.config.config.componentId, {
								data: {
									selectType: '日',
									selectValue: format(new Date(), 'yyyy.MM.dd')
								}
							})
						})
					}
				}
			},
			setNumberTransform() {
				if (this.data) {
					const numberArr = Number(this.data.yearData).toLocaleString().split('');
					this.transform = numberArr.map(item => item * 10);
				}
			},
		},
		watch: {
			data: {
				handler(val) {
					if (val) {
						this.setNumberTransform();
					}
				},
				deep: true,
			},
		},
		created() {
			
			this.configValue = this.parseConfigValue(value);
		},
		mounted() {
			setTimeout(() => {
				this.setNumberTransform()
			}, 500)
			this.$sysApi.bussiness.year().then(res => {
				this.year = res
			})
		},
	};
</script>
<style lang="scss">
	.statistical2-box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;

		.left {
			min-width: 180px;
			height: 80px;

			.time {
				width: 100%;
				height: 32px;
				line-height: 32px;
				font-size: 32px;
				font-style: normal;
				font-weight: 600;
				letter-spacing: 0;
				text-align: right;
				color: #fff;
				margin-top: 11px;
			}

			.decs {
				width: 100%;
				font-size: 24px;
				font-style: normal;
				font-weight: 400;
				line-height: 24px;
				letter-spacing: 0;
				text-align: right;
				color: #00DDFF;
				margin-top: 16px;
			}
		}

		.right {

			.value {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;

				.item {
					height: 80px;
					width: 56px;
					margin: 0 8px;

					.scroll-box {
						height: 80px;
						width: 56px;
						overflow: hidden;

						.scroll-list {
							display: flex;
							flex-direction: column;
							transition: transform 1s ease-in-out;

							.scroll-item {
								height: 80px;
								width: 56px;
								border-radius: 2px;
								background-image: url('/static/images/airfeed/statistical.svg');
								line-height: 80px;
								background-repeat: no-repeat;
								background-size: 100% 100%;
								text-align: center;
								font-size: 48px;
								font-style: normal;
								font-weight: 700;
								color: #fff;
							}
						}
					}
				}

				.comma {
					width: 12px;
					height: 80px;
					font-size: 48px;
					font-style: normal;
					font-weight: 700;
					color: #fff;
					text-align: center;
					line-height: 80px;
				}
			}
		}

		.right-more {
			height: 80px;
			background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.5) 100%);
			border: 1px solid rgba(0, 221, 255, 0.5);
			margin-top: 4px;

			&:before {
				height: 2px;
				background: #00DDFF;
				width: 100%;
				left: 0;
				top: 0;
				content: '';
				position: absolute;
			}

			.right-more-des {
				min-width: 160px;
				color: #00DDFF;
				font-weight: 600;
			}

			.right-more-total {
				color: #fff;
				font-size: 40px;
				line-height: 32px;
				padding-top: 13px;
				margin-bottom: 7px;
			}
		}
	}
</style>

