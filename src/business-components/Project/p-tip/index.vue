<template>
	<div class="widget-part" :style="styles">
        <div class="context-box">
            <div class="context-iocn" v-if="data&&data.isIocn">
                <img :src="`/static/images/project/tip-${data&&data.isIocn}.svg`" >
            </div>
            <div class="tip-context-box">
                <div class="context-value font-num" :style="data&&data.value.style">
                    <div>{{data&&data.value.context}}</div> 
                </div>
                <div class="context-desc" :style="data&&data.desc.style">
                    <div>{{data&&data.desc.context}}</div> 
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
                isIocn:"qizhong",
                desc: {
                    context:'标题',
                    style:{
                        fontSize:'20px',
                        textAlign:'left',
                        height:'60%',
                        lineHeight:'40%'
                    }
                },
                value:{
                    context:24,
                    style:{
                        fontSize:'20px',
                        textAlign:'left',
                        height:'40%',
                        lineHeight:'40%',
                    }
                }
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
    .context-box{
        height: 100%;
        width: 100%;
        display: flex;
        .context-iocn{
            width: 72px;
            height: 72px;
            position: relative;
            img{
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
            }
        }
        .tip-context-box{
            flex: 1;
            color: #fff;
            display: flex;
            flex-direction: column;
            .context-value{
                width: 100%;
                position: relative;
                // height: 100%;
                div{
                    position: absolute;
                    left: 0;
                    top:50%;
                    transform: translate(0,-50%);
                }
            }
            .context-desc{
                width: 100%;
                position: relative;
                div{
                    position: absolute;
                    left: 0;
                    top:50%;
                    transform: translate(0,-50%);
                    font-family:PingFang SC;
                } 
            }
        }
    }
    

</style>

