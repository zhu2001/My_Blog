<template>
  <div class="login">
    <span class="loginTitle">Login</span>
    <form class="loginForm" @submit.native.prevent="handleSubmit">
      <label>Username</label>
      <input type="text" class="loginInput" v-model="username" placeholder="Enter your Username...">
      <label>Password</label>
      <input type="password" class="loginInput" v-model="password" placeholder="Enter your password...">
      <button class="loginButton" type="submit" :disabled="store.state.isFetching">Login</button>
    </form>
    <button class="loginRegisterButton">
      <router-link to="/register">Register</router-link>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  name: 'Login',
  setup () {
    let username = ref(window.sessionStorage.getItem('username'))
    let password = ref('')
    const store = useStore()
    async function handleSubmit () {
      store.dispatch('loginStart')
      try {
        const res = await axios.post('/auth/login', {
          username: username.value,
          password: password.value
        })
        store.dispatch('loginSuccess', res.data)
        window.location.replace('/')
      } catch (err) {
        store.dispatch('loginFailure')
      }
    }
    return {
      handleSubmit,
      username,
      password,
      store
    }
  }
}
</script>

<style scoped>
.login {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
  background-size: cover;
  align-items: center;
}

.loginTitle {
  font-size: 50px;
}

.loginForm {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.loginForm > label {
  margin: 10px 0;
}

.loginInput {
  padding: 10px;
  background-color: white;
  border: none;
}

.loginButton {
  margin-top: 20px;
  cursor: pointer;
  background-color: lightcoral;
  border: none;
  color: white;
  border-radius: 10px;
  padding: 10px;
}

.loginButton:disabled {
  cursor: not-allowed;
  background-color: rgb(252, 173, 173);
}

.loginRegisterButton {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: teal;
  cursor: pointer;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 10px;
}
</style>