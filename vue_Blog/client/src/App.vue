<template>
  <TopBar></TopBar>
  <!-- <Home></Home> -->
  <!-- <Single></Single> -->
  <!-- <Write></Write> -->
  <!-- <Settings></Settings> -->
  <!-- <Login></Login> -->
  <!-- <Register></Register> -->
  <router-view></router-view>
</template>

<script>
import TopBar from './components/TopBar'
import Home from './views/Home'
import Single from './views/Single'
import Write from './views/Write'
import Settings from './views/Settings'
import Login from './views/Login'
import Register from './views/Register'
import { watchEffect } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "App",
  components: { TopBar, Home, Single, Write, Settings, Login, Register },
  setup () {
    const store = useStore()
    watchEffect(() => {
      localStorage.setItem("user", JSON.stringify(store.state.user))
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>