<template>
    <!--navbar put before router-view-->
    <navbar></navbar>
    <div class="app">
        <!--Here will be rendering components from router.js-->
        <router-view></router-view>
    </div>
</template>

<script>
// -------For using Navbar in all pages---------
import Navbar from '@/components/Navbar';
export default {
    components: {
        Navbar
    }
}
//-----------------------------------------------
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
    width: 100%
}
</style>