import { ref } from 'vue'

export default function useCreatePost(posts) {
    const dialogVisible = ref(false)
    const createPost = (post) => {
        posts.value.unshift(post);
    }

    return { createPost, dialogVisible }
}