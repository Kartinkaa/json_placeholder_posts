<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Name:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button
        class="post_btns_left"
        @click="$router.push(`/posts/${post.id}`)"
      >
        Open
      </my-button>
      <my-button @click="$emit('remove', post)"> Delete </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
.post__btns {
  margin: 0.5rem;
  display: flex;
  justify-content: flex-start;
}
.post_btns_left {
  margin-right: 2rem;
}
</style>
