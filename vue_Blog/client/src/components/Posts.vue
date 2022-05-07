<template>
  <div class="posts">
    <Post v-for="post in posts.data" :post="post" />
  </div>
</template>

<script>
import Post from './Post'
export default {
  name: 'Posts',
  components: { Post },
  props: { posts: Array },
  setup (props, context) {

  }
}
</script>

<style scoped>
.posts {
  flex: 9;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  margin: 20px;
}
</style>