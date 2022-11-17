<!--This component  post posts -->
<template>
    <div v-show="posts.length > 0">
        <h2>Posts List</h2>
        <!--transition-group for animation-->
        <transition-group name="post-list">
            <post-item 
              v-for="post in posts" 
              :post="post" 
              :key="post.id" 
              @remove="$emit('remove', post)"/>
        </transition-group>
    </div>
         <h2 
              v-show="posts.length === 0" 
              style="color: red">
              Posts list is empty
        </h2>
</template>

<script>
import PostItem from "@/components/PostItem";// import components +......
export default { // export props
    components: { PostItem },// ....add component
    props: {
        posts: {
            type: Array,
            requierd: true
        },
    },
    emits: ['remove']
}

</script>

<!-- scoped - css apply in this component only -->
<style scoped>
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}

.post-list-move {
    transition: transform 0.8s ease;
}
</style>