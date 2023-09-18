import { ref, computed, Ref } from 'vue'

interface Post {
  [key: string]: string | number
}

export default function useSortedPosts(posts: Ref<Post[]>): {
  selectedSort: Ref<string>
  sortedPosts: Ref<Post[]>
} {
  const selectedSort = ref<string>('')
  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) =>
      (post1[selectedSort.value] as string)?.localeCompare(
        post2[selectedSort.value] as string
      )
    )
  })

  return {
    selectedSort,
    sortedPosts,
  }
}
