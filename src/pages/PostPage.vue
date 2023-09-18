<template>
  <div>
    <h1>Posts page</h1>
    <my-input v-model="searchQuery" placeholder="Search...." v-focus />
    <div class="app__btns">
      <my-button @click="showDialog"> Create post </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        :key="pageNumber"-->
    <!--        class="page"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNumber-->
    <!--        }"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from '../components/PostForm.vue'
import PostList from '../components/PostList.vue'
import MyButton from '../components/UI/MyButton.vue'
import axios from 'axios'
import MySelect from '../components/UI/MySelect.vue'
import MyInput from '../components/UI/MyInput.vue'

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'By name' },
        { value: 'body', name: 'By description' },
      ],
    }
  },
  methods: {
    createPost(post) {
      axios
        .post('https://jsonplaceholder.typicode.com/posts', post)
        .then((response) => console.log(response.data))
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'DELETE',
      })
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        )
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = response.data
      } catch (e) {
        alert('Error')
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        )
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('Ошибка')
      }
    },
  },
  mounted() {
    this.fetchPosts()
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  },
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
