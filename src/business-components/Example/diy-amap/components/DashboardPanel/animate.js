export default {
    props: {
        transition: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: true,
        },
        enter: {
            type: String,
            default: '',
        },
        leave: {
            type: String,
            default: '',
        },
        delay: {
            type: Number,
            default: 0,
        },
        speed: {
            type: Number,
            default: 300,
        },
    },
    methods: {
        beforeEnter(el) {
            const speed = this.speed;
            const delay = this.delay;
            el.style.animationDuration = ` ${speed}ms`;
            el.style.animationDelay = `${delay}ms`;
        },
    },
    computed: {
        animation() {
            if (this.transition) {
                return this.show;
            }
            return true;
        },
    },
};
