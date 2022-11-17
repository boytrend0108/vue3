<!--This component only create post and send it outside-->
<template>
    <form class="form" @submit.prevent.default>
        <h2>New post</h2>
        <!-- Add post.title instead of title -->
        <my-input 
          v-focus 
          v-model="post.title" 
          type="text" 
          placeholder="Title"/>
        <my-input 
          v-model="post.body" 
          type="text" 
          placeholder="Discription" />
        <my-button 
          class="btn-pf" 
          @click="createPost">Create post</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {// our post as object
                title: '',
                body: '',
            },
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now(); // add post.id (current date)
            this.$emit('create', this.post);
            this.post = {
                title: '',// clear input
                body: '',
            }
            this.$emit('hideDialog')// updata show in v-if="show"
        }
    },

    //-----for array and object we have to use deep object tracking !!!!!!!
    // watch: {
    //     post: {
    //         handler(newValue) {
    //             console.log(newValue);
    //         },
    //         deep: true // enable deep tracking
    //     }
    // }
}
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}

.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}



.btn-pf {
    align-self: flex-end;
}
</style>