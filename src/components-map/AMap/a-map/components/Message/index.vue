<template lang="pug">
    .message.pointer(v-if="JSON.stringify(message)!=='{}'"  :class="{'un-read':unReadStatus,active}")
        svg-icon.icon(iconName="iconmessage" @click="showFullTagger")
        span.content(@click="handleClick")
            marquee {{message.interactionContent}}
        span.time {{message.createTime}}
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import MessageAlert from './components/alert/index.js'
    import MessageList from './components/messageList/index.js'
    import SvgIcon from '../SvgIcon/index.vue'
    import format from 'date-fns/format'

    @Component({
        components: {'svg-icon': SvgIcon},
    })
    class AlertContent extends Vue {
        message: any = {}
        unReadStatus: boolean = true
        timer: any = null
        alertInstance: any = null
        active: boolean = false

        showFullTagger() {
            console.log(1)
            this.active = !this.active
        }

        created() {
            this.getUnReadMessage()
            this.timer = setInterval(() => {
                this.getUnReadMessage()
            }, 10000)
        }

        beforeDestroy() {
            this.$off('message', this.showFullTagger)
            if (this.timer) {
                clearInterval(this.timer)
            }
        }

        getUnReadMessage() {
            this.$sysApi.message.getUnReadMessage().then((data) => {
                if (data) {
                    this.unReadStatus = true
                    if (this.alertInstance) {
                        this.alertInstance.close()
                    }
                    setTimeout(() => {
                        this.alertInstance = MessageAlert({
                            data: data,
                        })
                    }, 1000)
                    this.formatTime(data)
                } else {
                    this.getData()
                    this.unReadStatus = false
                }
            })
        }

        formatTime(message = {}) {
            let {createTime} = message
            if (createTime) {
                createTime = format(new Date(createTime), 'MM.dd HH:mm')
            }
            this.message = {
                ...message,
                createTime,
            }
        }

        async getData(messageStatus = '1') {
            this.$sysApi.message
                .getRecentMessageList({
                    messageStatus,
                })
                .then((data) => {
                    if (data && data.length > 0) {
                        this.formatTime(data[0])
                    }
                })
        }

        handleClick() {
            MessageList()
            document.removeEventListener('mapMessage', this.showFullTagger)
            document.addEventListener('mapMessage', this.showFullTagger, false)
        }
    }

    export default AlertContent
</script>
<style lang="scss">
    .message {
        position: absolute;
        align-items: center;
        font-size: 18px;
        z-index: 10;
        top: 108px;
        right: 32px;
        width: 480px;
        height: 32px;
        box-sizing: border-box;
        color: #fff;
        border-radius: 20px;
        
        &.un-read::after {
            content: ' ';
            display: inline-block;
            position: absolute;
            top: 4px;
            left: 24px;
            border: 5px solid red;
            border-radius: 50%;
        }
        
        .icon {
            position: absolute;
            right: 8px;
            top: 4px;
            font-size: 24px;
            vertical-align: middle;
        }
        
        &.active {
            background: #001a77;
            border: 1px solid #00ddff;
            
            .icon {
                left: 8px;
                right: auto;
            }
            
            .content, .time {
                display: block;
            }
        }
        
        .content {
            position: absolute;
            left: 40px;
            right: 120px;
            bottom: 0;
            top: 0;
            white-space: nowrap;
            overflow: hidden;
            display: none;
        }
        
        .time {
            position: absolute;
            right: 8px;
            opacity: 0.75;
            display: none;
        }
    }
</style>
