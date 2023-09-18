import axios, { AxiosResponse } from 'axios'
import { ref, onMounted, Ref } from 'vue'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export function usePosts(limit: number): {
  posts: Ref<Post[]>
  totalPages: Ref<number>
  isPostsLoading: Ref<boolean>
} {
  const posts = ref<Post[]>([])
  const totalPages = ref<number>(0)
  const isPostsLoading = ref<boolean>(true)

  const fetching = async () => {
    try {
      const response: AxiosResponse<Post[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      )
      totalPages.value = Math.ceil(
        Number(response.headers['x-total-count']) / limit
      )
      posts.value = response.data
    } catch (e) {
      alert('Error')
    } finally {
      isPostsLoading.value = false
    }
  }

  onMounted(fetching)

  return {
    posts,
    totalPages,
    isPostsLoading,
  }
}
