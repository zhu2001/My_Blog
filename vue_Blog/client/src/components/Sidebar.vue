<template>
  <div class="sidebar">
    <div class="sidebarItem">
      <div class="sidebarTitle">ABOUT ME</div>
      <img
        src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
        alt="">
      <p>
        Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
        amet ex esse.Sunt eu ut nostrud id quis proident.
      </p>
    </div>
    <div class="sidebarItem">
      <div class="sidebarTitle">CATEGORIES</div>
      <ul class="sidebarList">
        <router-link v-for="cat in cats.cats.data" :to="`/?cat=${cat.name}`">
          <li class="sidebarListItem">{{cat.name}}</li>
        </router-link>
      </ul>
    </div>
    <div class="sidebarItem">
      <div class="sidebarTitle">FOLLOW US</div>
      <div class="sidebarSocial">
        <i class="sidebarIcon fab fa-facebook-square"></i>
        <i class="sidebarIcon fab fa-twitter-square"></i>
        <i class="sidebarIcon fab fa-youtube-square"></i>
        <i class="sidebarIcon fab fa-instagram-square"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, toRefs } from 'vue'
export default {
  name: 'Sidebar',
  setup () {
    let cats = ref({
      cats: {}
    })
    const getCats = async () => {
      cats.value.cats = await axios.get('/categories')
    }
    getCats()

    return {
      cats
    }
  }
}
</script>

<style scoped>
.sidebar {
  flex: 3;
  margin: 20px;
  padding-bottom: 30px;
  background-color: #fbfbfb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebarItem {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebarTitle {
  margin: 10px;
  padding: 5px;
  width: 80%;
  border-top: 1px solid #a7a4a4;
  border-bottom: 1px solid #a7a4a4;
  font-family: "Varela Round", sans-serif;
  font-size: 12px;
  color: #222;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
}

.sidebarItem > img {
  margin-top: 15px;
}

.sidebarItem > p {
  padding: 30px;
}

.sidebarListItem {
  display: inline-block;
  width: 50%;
  margin-top: 15px;
  cursor: pointer;
}

.sidebarSocial {
  margin-top: 15px;
  width: 250px;
  display: flex;
  align-item: center;
  justify-content: center;
}

.sidebarIcon {
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
}
</style>