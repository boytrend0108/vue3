import axios from 'axios'// for API
export const postModule = {
    state: () => ({
        // -------this is data grom PostPageWithStore
        posts: [],// array for our posts
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
    }),
    getters: {// this is computed properties from PostPage
        // add state to functiom params
        sortedPosts(state) {// sort posts
            // we deploy new array and !!!! 'this' change to 'state'
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]
                ?.localeCompare(post2[state.selectedSort]))
        },// in this getter we use first getter
        sortedAndSearchedPost(state, getters) {// filter posts
            // here we use getters instade this, couse we refers to first getter
            return getters.sortedPosts.filter(post =>
                //but here we refers to state
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {// mutation apply for changing state
        setPosts(state, posts) {
            state.posts = posts
        },
        setIsPostLoading(state, bool) {
            state.isPostLoading = bool
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPage(state, totalPage) {
            state.totalPage = totalPage
        },
    },
    actions: {
        async fetchPosts({ state, commit }) {// more information https://vuex.vuejs.org/api/#actions
            try {
                commit('setIsPostLoading', true)// this means :change 'setIsPostLoading' to true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: { //-----for page rendering ...typicode.com/posts&_page=10&_limit= 5
                        // HERE WE CHANGE 'THIS' TO 'STATE'
                        _limit: state.limit, // show "this.limit" posts per page and ...
                        _page: state.page,// download page number "this.page"
                    }
                });
                // headers['x-total-count']  we lock in devtools -> Network -> headers
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit)) //-----for page rendering
                commit('setPosts', response.data)// change setPost to response.data
            } catch (err) {
                console.log(err);
            } finally {
                commit('setIsPostLoading', false);//disappeare prelouder    
            }
        },
        async loadMorePosts({ state, commit }) {
            try {
                // change this  this.page += 1 to...
                commit('setPage', state.page += 1)// увеличиваем страницу на ед.
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: { //-----for page rendering ...typicode.com/posts&_page=10&_limit= 5
                        _limit: state.limit, // show "this.limit" posts per page and ...
                        _page: state.page,// download page number "this.page"
                    }
                });
                // headers['x-total-count']  we lock in devtools -> Network -> headers
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                //-----for page rendering
                commit('setPosts', [...state.posts, ...response.data])// to exsisting posts add new posts
            } catch (err) {
                console.log(err);
            } finally {
                // this.isPostLoading = false;//disappeare inscription 'Downloading...'    
            }
        }
    },
    namespaced: true//!!!
}