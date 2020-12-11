<template>
	<div class="h-table-status widget-part" :style="styles" v-if="data">
		<ul class="h-table-status__title1">
			<li v-for="(k, i) in config.config.titles">{{ k }}</li>
		</ul>
		<div class="h-table-status__content1" @mouseenter="isStop = true" @mouseleave="isStop = false">
      <ul
          class="h-table-status__content1__row1"
          v-for="(item, index) in curr"
          :key="index"
      >
        <li>{{ item.time || '' }}</li>
        <li>{{ item.channel || '' }}</li>
        <li>{{ item.businessType || '' }}</li>
        <li>{{ item.statusDesc || '' }}</li>
      </ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

	const config = {
		animation: true,
		config: {
			titles: true
		}
	};
	const configSource = {
		config: {
			fields: {
				title: getInput('titles', '标题'),
			}
		}
	}
	const value = {
		api: {
			data: JSON.stringify([
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '在线客服',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					customer: '李的萌萌',
					statusDesc: '设备巡检故障',
				},
				{
					time: '06/03 09:11',
					channel: '李萌萌',
					businessType: '滨江区滨盛路1508号',
					statusDesc: '设备巡检故障',
				},
			]),
		},
		config: {
			titles: ['时间', '报警人', '地点', '工单内容']
		}
	};
	const SIZE = 5
	export default {
		mixins: [mixins],
    data() {
      return {
        timer: null,
        loop: 0,
        isStop: false
      }
    },
    watch: {
      data: {
        handler(val) {
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            if (this.isStop) return
            if (this.loop === Math.ceil(val.length / SIZE)- 1) {
              this.loop = 0
            } else {
              this.loop++
            }
          }, 2000)
        },
        deep: true,
        immediate: true
      },
    },
		computed: {
      curr () {
        if (!this.data) return []
        return this.data.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
      }
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		},
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    }
	};
</script>
<style lang="scss">
	.h-table-status {
		width: 100%;

		&__title1 {
			width: 100%;
			height: 32px;
			background: rgba(23, 123, 255, 0.2);
			display: flex;
			align-items: center;
			padding: 8px;
			box-sizing: border-box;

			& > li {
				font-size: 16px;
				line-height: 16px;
				color: #00CBF4;
				text-align: left;

				&:nth-child(1) {
					width: 16%;
				}

				&:nth-child(2) {
					width: 21%;
				}

				&:nth-child(3) {
					width: 36.3%;
				}

				&:nth-child(4) {
					width: 25.2%;
				}
			}
		}

		&__content1 {
			margin-top: 9px;
			height: 152px;

			&__seamless-warp1 {
				height: 152px;
				overflow: hidden;
			}

			&__row1 {
				width: 100%;
				height: 24px;
				display: flex;
				align-items: center;
				padding: 4px 8px;
				box-sizing: border-box;
				margin-top: 8px;

				& > li {
					text-align: left;
					font-size: 16px;
					line-height: 16px;
					color: #FFFFFF;

					&:nth-child(1) {
						width: 16%;
						color: rgba(255, 255, 255, 0.6);
					}

					&:nth-child(2) {
						width: 21%;
					}

					&:nth-child(3) {
						width: 36.3%;
					}

					&:nth-child(4) {
						width: 25.2%;
						color: #FFDC45;
					}
				}
			}
		}
	}
</style>

