<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input v-focus v-model="post.title" type="text" placeholder="Name" />
    <my-input v-model="post.body" type="text" placeholder="Description" />
    <my-button
      style="align-self: flex-end; margin-top: 15px"
      @click="createPost"
    >
      Create
    </my-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'post-form',
  data() {
    return {
      post: {
        title: '',
        body: '',
      } as {
        title: string
        body: string
        id?: number
      },
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },
  },
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
