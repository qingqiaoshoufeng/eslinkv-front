<template>
	<div class="widget-part" :style="styles">
		<div class="tip-box1">
            <div class="left-icon1">
                <img :src="`/static/images/project/tip-${data&&data.img}.svg`" alt="" class="img">
                <div class="tip-name" v-if="data&&data.name">{{data&&data.name}}</div>
            </div>
            <div class="title-name" v-for="(index,item) in data&&data.recommend" :key="item.context">
                <div class="recommend-item">
                    <div class="recommend-value">{{item.value}}</div>
                    <div class="recommend-desc">{{item.context}}</div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	const config = {animation: true}
	const value = {
		api: {
			data: JSON.stringify({
                img:'zhucai',
                title: 'name',
                recommend:[
                    {
                        value:3,
                        context:'起重机'
                    }
                ]
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
    .tip-box1{
        height: 32rpx;
        width: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        .left-icon{
            height: 30px;
            width: 30px;
            flex: none;
            .img{
                background: #00529E;
            }
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

