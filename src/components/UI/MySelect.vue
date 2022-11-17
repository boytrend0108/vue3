<template>
    <select v-model="modelValue" @change="changeOption">
        <option disable value="">Select from list</option>
        <option 
          v-for="option in options" 
          key="option.value" 
          :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'my-select', // don't forget add this comp to index.js
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => { }// for empty array we use ()=>{}
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    },

}

</script>

<style scoped>

</style>