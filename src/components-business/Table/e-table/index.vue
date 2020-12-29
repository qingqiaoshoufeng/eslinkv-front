<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul class="title">
			<li></li>
			<li>标题</li>
			<li>浏览</li>
			<li>收藏</li>
			<li>分享</li>
		</ul>
		<div class="content" @mouseenter="isStop = true" @mouseleave="isStop = false">
      <ul
          class="content__row1"
          v-for="(k, index) in curr"
          :key="index"
      >
        <li class="font-num" :class="{first: getIndex(index) === '01'}">{{ getIndex(index) }}</li>
        <li>{{ k.v1 }}</li>
        <li>{{ k.v2 | toThousand }}</li>
        <li>{{ k.v3 | toThousand }}</li>
        <li>{{ k.v4 | toThousand }}</li>
      </ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins';

	const config = {animation: true};
	const value = {
		api: {
			data: JSON.stringify({
				list: [
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					},
					{
						v1: '说出来你可能不会相信',
						v2: 45886,
						v3: 320,
						v4: 479,
					}
				]
			}),
		},
	};
  const SIZE = 6
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
			this.loop = 0
          this.timer = setInterval(() => {
            if (this.isStop) return
            if (this.loop === Math.ceil(val.list.length / SIZE)- 1) {
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
        return this.data.list.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
      }
    },
    methods: {
		  getIndex (n) {
		    const num = n + 1 + this.loop * SIZE
        return num < 10 ? '0' + num : num
      }
    },
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
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

