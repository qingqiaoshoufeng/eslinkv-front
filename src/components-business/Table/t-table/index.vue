<template>
	<div class="widget-part" :style="styles" v-if="data">
    <ETable :list="data.list" :size="4" :titles="data.titles"></ETable>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import ETable from './ETable'

	const config = {animation: true};
	const value = {
		api: {
			data: JSON.stringify({
        titles: ['时间','工商户', '地点', '报警类型'],
				list: [
					{
						v1: '10/20 09:11',
						v2: '宝龙城市广场',
						v3: '滨江区滨盛路1508号',
						v4: '压力异常',
					},
					{
						v1: '10/20 09:11',
						v2: '宝龙城市广场',
						v3: '滨江区滨盛路1508号',
						v4: '压力异常',
					},
					{
						v1: '10/20 09:11',
						v2: '宝龙城市广场',
						v3: '滨江区滨盛路1508号',
						v4: '压力异常',
					},
					{
						v1: '10/20 09:11',
						v2: '宝龙城市广场',
						v3: '滨江区滨盛路1508号',
						v4: '压力异常',
					},
					{
						v1: '10/20 09:11',
						v2: '宝龙城市广场',
						v3: '滨江区滨盛路1508号',
						v4: '压力异常',
					},
					{
						v1: '10/20 09:11',
						v2: '宝龙城市广场',
						v3: '滨江区滨盛路1508号',
						v4: '压力异常',
					},
					{
						v1: '10/20 09:11',
						v2: '宝龙城市广场',
						v3: '滨江区滨盛路1508号',
						v4: '压力异常',
					}
				]
			}),
		},
	};
	export default {
		mixins: [mixins],
    components: { ETable },
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		}
	};
</script>
<style lang="scss" scoped>
	.widget-part {
		.title {
			width: 100%;
			height: 32px;
			background: rgba(23, 123, 255, 0.2);
			display: flex;
			align-items: center;
			box-sizing: border-box;

			& > li {
				font-size: 18px;
				line-height: 24px;
				color: #00CBF4;
        padding-left: 8px;
				text-align: left;

				&:nth-child(1) {
          margin-right: 8px;
          width: 24px;
          height: 24px;
				}

				&:nth-child(2) {
					width: 240px;
				}

				&:nth-child(3) {
					width: 90px;
				}

				&:nth-child(4) {
					width: 65px;
				}

				&:nth-child(5) {
					flex: 1;
				}
			}
		}

		.content {
			height: 170px;

			&__seamless-warp1 {
				height: 170px;
				overflow: hidden;
			}

			&__row1 {
				height: 32px;
				display: flex;
				align-items: center;
				padding-left: 8px;
				box-sizing: border-box;

        &:first-child>li.first{
          background: #FF7217;
        }
				& > li {
					text-align: left;
					font-size: 18px;
					line-height: 24px;
					color: #FFFFFF;

          &:nth-child(1) {
            width: 24px;
            height: 24px;
            background: #0057A9;
            font-weight: bold;
            text-align: center;
            margin-right: 8px;
          }

          &:nth-child(2) {
            width: 240px;
          }

          &:nth-child(3) {
            width: 90px;
          }

          &:nth-child(4) {
            width: 65px;
          }

          &:nth-child(5) {
            flex: 1;
          }
				}
			}
		}
	}
</style>

