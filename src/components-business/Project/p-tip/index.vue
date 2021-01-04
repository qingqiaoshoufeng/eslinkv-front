<template>
    <div class="widget-part" :style="styles">
        <div class="context-box">
            <div class="context-icon" v-if="computeData && computeData.isIcon">
                <img :src="computeData && computeData.isIcon"/>
            </div>
            <div class="tip-context-box">
                <div
                        class="context-value font-num"
                        :style="computeData && computeData.value.style"
                >
                    <div>{{ computeData && computeData.value.context }}</div>
                </div>
                <div
                        class="context-desc"
                        :style="computeData && computeData.desc.style"
                >
                    <div>{{ computeData && computeData.desc.context }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import {config, configSource, value} from './index.component'

    export default {
        mixins: [mixins],
        computed: {
            computeData() {
                if (!this.data || !this.config.config) return;
                this.data.isIcon = this.config.config.icon;
                this.data.desc = {};
                this.data.desc.context = this.config.config.desc;
                this.data.desc.style = {
                    fontSize: '20px',
                    textAlign: 'left',
                    height: '60%',
                    lineHeight: '40%',
                };
                this.data.value.style = {
                    fontSize: '20px',
                    textAlign: 'left',
                    height: '40%',
                    lineHeight: '40%',
                };
                return this.data;
            },
        },
        created() {
            this.configSource = this.parseConfigSource(config, configSource)
            this.configValue = this.parseConfigValue(config, value)
        }
    };
</script>
<style lang="scss">
    .context-box {
        height: 100%;
        width: 100%;
        display: flex;

        .context-icon {
            width: 72px;
            height: 72px;
            position: relative;

            img {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .tip-context-box {
            flex: 1;
            color: #fff;

            .context-desc {
                font-size: 20px;
                text-align: left;
                height: 60%;
                line-height: 40%;
            }

            .context-value {
                font-size: 20px;
                text-align: left;
                height: 40%;
                line-height: 40%;
                margin-top: 15px;
            }

            .context-iocn {
                width: 72px;
                height: 72px;
                position: relative;

                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            .tip-context-box {
                flex: 1;
                color: #fff;

                .context-value {
                    width: 100%;
                    position: relative;
                    // height: 100%;
                    div {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                }

                .context-desc {
                    width: 100%;
                    position: relative;

                    div {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                }
            }
        }
    }
</style>
