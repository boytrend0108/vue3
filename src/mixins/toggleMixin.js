export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)// updata show in v-if="show"
        }

    },
    // add for example
    mounted() { // don't forget to put "()"
        // console.log('mixin');
    }

}
