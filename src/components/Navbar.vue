<template>

    <div class="navbar">
        <div @click="$router.push('/')" style="cursor: pointer;">Vue 3 </div>
        <div class="navbar__btb">
            <my-button @click="$router.push(`/posts`)">Posts</my-button>
            <my-button @click="$router.push('/about')">About app</my-button>
            <my-button @click="$router.push('/store')">Store</my-button>
            <my-button @click="$router.push('/composition')">Composition Api</my-button>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style scoped >
.navbar {
    padding: 0px 15px;
    display: flex;
    height: 50px;
    background-color: teal;
    box-shadow: 2px 2px 4px gray;
    align-items: center;
}

.navbar__btb {
    margin-left: auto;
}
</style>