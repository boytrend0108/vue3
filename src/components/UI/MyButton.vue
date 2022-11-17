<!-- UI componenr button -->
<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'// how we name this comp
}
</script>

<style scoped>
.btn {
    padding: 10px 15px;
    background: teal;
    color: white;
    border: 1px solid teal;
    cursor: pointer;
}
</style>
