<template>
  <Header></Header>
  <div class="home">
    <Posts :posts="posts.posts"></Posts>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Header from '../components/Header'
import Posts from '../components/Posts'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { reactive, ref, onBeforeUpdate, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Home',
  components: { Header, Posts, Sidebar },
  setup () {
    let search = ref('0')
    // search = window.location.search
    let id = ref('0')
    const route = useRoute()
    // console.log(search)
    let posts = ref({
      posts: []
    })
    watchEffect(() => {
      id.value = route.query.id
      search = window.location.search
      const getPost = async () => {
        posts.value.posts = await axios.get('/posts' + search)
      }
      getPost()
    })
    return {
      posts,
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
}
</style>