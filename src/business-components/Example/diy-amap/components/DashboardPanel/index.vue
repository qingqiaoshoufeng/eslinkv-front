<template>
    <transition
        :enter-active-class="enter"
        :leave-active-class="leave"
        v-on:before-enter="beforeEnter"
    >
        <div :style="styleObject" v-if="animation" v-on="$listeners">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import animate from './animate'

export default {
    name: 'DashboardPanel',
    mixins: [animate],
    props: {
        styleObject: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped>
</style>
