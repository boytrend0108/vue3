import { ref, computed } from 'vue'
export default function useSortedPosts(posts) {

    const selectedSort = ref('')//ref принимает аргумент и возвращает его обёрнутым в объект со свойством value,
    const sortedPosts = computed(() => {
        // we deploy new array
        return [...posts.value].sort((post1, post2) => post1[selectedSort.value]
            ?.localeCompare(post2[selectedSort.value]))
    })

    return { selectedSort, sortedPosts }// возвращаемые функции ведут себя также, как и методы
}