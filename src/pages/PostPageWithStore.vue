<template>
    <div>
        <h1>Post page</h1>
        <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Seach..." />
        <div class="app__bnts">
            <my-button style="margin: 15px 0" @click="showDialog">Create post</my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions">
            </my-select>
        </div>
        <!-- v-model connect show in MyDialog with dialogVisible in this page -->
        <my-dialog v-model:show="dialogVisible">
            <!-- This use slot -->
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPost" @remove='removePost' v-if="!isPostLoading" />
        <!--Preloader-->
        <my-preloader class="loader" v-show="isPostLoading">loading</my-preloader>
    </div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--(000)ref we use to get access to DOM element-->
</template>

<script>
// @- allias thet refers tu src
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'// this is for mapping

export default {// data and methods stay here couse they'll be used in diferent components
    components: {
        PostForm, PostList // add components to script
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        createPost(post) {// without post don't work push
            this.posts.unshift(post);
            this.dialogVisible = false; //hide dialog window 
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        // insted of using here func 'fetchPosts' and 'loadMorePosts' we use referencies to postModul
        ...mapActions({// this need to use fetchPosts and loadMorePosts in html
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts'
        }),
        ...mapMutations({// this need to use setPage and setSearchQuery in html
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',// this is for search input
            setSelectedSort: 'post/setSelectedSort'// thi is for sort
        }),

    },
    mounted() {
      
    },
    computed: {
        ...mapState({ // connect state from postModule
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            sortOptions: state => state.post.sortOptions,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPage: state => state.post.totalPage
        }),
        ...mapGetters({ // connect getters from postMolule
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPost: 'post/sortedAndSearchedPost'
        }),
    },
}
</script>

<style scoped>
.app__bnts {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    align-items: center;
}

.observer {
    height: 60px;
    background-color: aqua;
}
</style>