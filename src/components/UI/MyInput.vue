<template>
    <input 
    :value="modelValue" 
    @input="updateInput" 
    class="input" 
    type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]// get value from our input(modelValue for Vue3)
    },
    methods: {
        updateInput(event) {//use this method to connect modelValue and input
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>