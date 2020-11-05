<template>
	<div class="widget-part" :style="styles">
		<div class="flex-box">
            <div class="left-icon">
                <img src="/static/images/project/title-icon.svg" alt="">
            </div>
            <div class="title-name">{{data&&data.title}}</div>
        </div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
                title: '标题',
			})
		}
	}
	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValue({animation: true}, value)
		}
	}
</script>
<style lang="scss">
    .flex-box{
        height: 32rpx;
        width: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        .left-icon{
            height: 30px;
            width: 30px;
            flex: none;
        }
        .title-name{
            height: 30px;
            line-height: 30px;
            flex: 1;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 32px;
            color:#fff;
            text-align: left;
            padding-left: 16px;
        }
    }

</style>

