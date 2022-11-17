<template>
    <div>
        <!--Add component to html-->
        <h1>Post page</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Seach..." />
        <div class="app__bnts">
            <!-- <my-button @click="fetchPosts" style="margin-right: 10px;">Get posts</my-button> -->
            <my-button style="margin: 15px 0" @click="showDialog">Create post</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        </div>
        <!--v-model connect show in MyDialog with dialogVisible in this page-->
        <my-dialog v-model:show="dialogVisible">
            <!--This use slot-->
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
import axios from 'axios'// for gettig data from API

export default {// data and methods stay here couse they'll be used in diferent components
    components: {
        PostForm, PostList // add components to script
    },
    data() {
        return {
            posts: [],// array for our posts
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            sortOptions: [// array for dropdown list(MySelect)
                { value: 'title', name: '- by name' },
                { value: 'body', name: '- by description' },
            ],
            searchQuery: '',
            //-----for page rendering
            page: 1,// number of page that we wi'll render
            limit: 5,// limit of posts on this page
            totalPage: 0// we calculate this below (for pagination on )
            //-------
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
        async fetchPosts() {
            try {
                this.isPostLoading = true;//appeare inscription 'Downloading...'
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: { //-----for page rendering ...typicode.com/posts&_page=10&_limit= 5
                        _limit: this.limit, // show "this.limit" posts per page and ...
                        _page: this.page,// download page number "this.page"
                    }
                });
                // headers['x-total-count']  we lock in devtools -> Network -> headers
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit) //-----for page rendering
                this.posts = response.data;
            } catch (err) {
                alert(err)
            } finally {
                this.isPostLoading = false;//disappeare inscription 'Downloading...'    
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1; // увеличиваем страницу на ед.
                // this.isPostLoading = true;//appeare inscription 'Downloading...'
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: { //-----for page rendering ...typicode.com/posts&_page=10&_limit= 5
                        _limit: this.limit, // show "this.limit" posts per page and ...
                        _page: this.page,// download page number "this.page"
                    }
                });
                // headers['x-total-count']  we lock in devtools -> Network -> headers
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit) //-----for page rendering
                this.posts = [...this.posts, ...response.data]// to exsisting posts add new posts
            } catch (err) {
                alert(err)
            } finally {
                // this.isPostLoading = false;//disappeare inscription 'Downloading...'    
            }
        },

    },
    mounted() {
        this.fetchPosts();//download post from server
    },
    computed: {//!!!!All computed function we can use as variable!!!(without ())
        // THIS WE MOVED TO POSTMODULE.JS
        sortedPosts() {// sort posts
            // we deploy new array
            return [...this.posts]
                .sort((post1, post2) => post1[this.selectedSort]
                    ?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPost() {// filter posts
            return this.sortedPosts.filter(post =>
                post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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