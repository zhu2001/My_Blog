<template>
  <div class="top">
    <div class="topLeft">
      <i class="topIcon fab fa-facebook-square"></i>
      <i class="topIcon fab fa-twitter-square"></i>
      <i class="topIcon fab fa-youtube-square"></i>
      <i class="topIcon fab fa-instagram-square"></i>
    </div>
    <div class="topCenter">
      <ul class="topList">
        <li class="topListItem">
          <router-link to="/home">HOME</router-link>
        </li>
        <li class="topListItem">
          <router-link to="/">ABOUT</router-link>
        </li>
        <li class="topListItem">
          <router-link to="/">CONTACT</router-link>
        </li>
        <li class="topListItem">
          <router-link to="/write">WRITE</router-link>
        </li>
        <li class="topListItem" v-show="user">
          <router-link to="/login" @click="handleLoginOut">LOGOUT</router-link>
        </li>
      </ul>
    </div>
    <div class="topRight">
      <router-link to="/settings">
        <img class="topImg" v-if="user" :src="PF + profilePic" alt="" />
      </router-link>
      <ul class="topList" v-show="!user">
        <li class="topListItem">
          <router-link to="/login">LOGIN</router-link>
        </li>
        <li class="topListItem">
          <router-link to="/register">REGISTER</router-link>
        </li>
      </ul>
      <i class="topSearchIcon fas fa-search"></i>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'TopBar',
  setup () {
    const store = useStore()
    const PF = "http://localhost:3000/images/"
    const user = ref('')
    watchEffect(() => {
      user.value = store.state.user
    })
    function handleLoginOut () {
      store.dispatch('loginOut')
      // localStorage.removeItem("user")

    }
    return {
      user,
      handleLoginOut,
      store,
      profilePic: computed(() => store.state.user.profilePic),
      PF
    }
  }
}
</script>

<style scoped>
.top {
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  font-family: "Josefin Sans", sans-serif;
  z-index: 999;
}
.topLeft,
.topRight {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.topIcon {
  font-size: 20px;
  margin-right: 10px;
  color: #444;
  cursor: pointer;
}
.topImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}
.topCenter {
  flex: 6;
}
.topList {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.topListItem {
  margin-right: 20px;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
}
.topSearchIcon {
  font-size: 18px;
  color: #666;
  cursor: pointer;
  margin-left: 15px;
}
</style>
