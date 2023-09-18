import { ref, computed, Ref } from 'vue'

interface Post {
  title: string
}

export default function useSortedPosts(sortedPosts: Ref<Post[]>): {
  searchQuery: Ref<string>
  sortedAndSearchedPosts: Ref<Post[]>
} {
  const searchQuery = ref<string>('')

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return {
    searchQuery,
    sortedAndSearchedPosts,
  }
}
