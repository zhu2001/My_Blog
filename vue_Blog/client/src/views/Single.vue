<template>
  <div class="single">
    <SinglePost></SinglePost>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import SinglePost from '../components/SinglePost'
export default {
  name: 'Single',
  components: { Sidebar, SinglePost },

}
</script>

<style scoped>
.single {
  display: flex;
}
</style>