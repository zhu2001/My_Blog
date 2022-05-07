<template>
  <div class="register">
    <span class="registerTitle">register</span>
    <form class="registerForm" @submit.native.prevent="handleSubmit">
      <label>Username</label>
      <input type="text" class="registerInput" v-model="username" placeholder="Enter your Username...">
      <label>Email</label>
      <input type="text" class="registerInput" v-model="email" placeholder="Enter your email...">
      <label>Password</label>
      <input type="password" class="registerInput" v-model="password" placeholder="Enter your password...">
      <button class="registerButton">register</button>
    </form>
    <button class="registerLoginButton" type="submit">
      <router-link to='/login'>Login</router-link>
    </button>
    <span v-show="error" style="color:red;marginTop:10px">Something went wrong</span>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
export default {
  name: 'Register',
  setup () {
    let username = ref('')
    let email = ref('')
    let password = ref('')
    let error = ref(false)

    async function handleSubmit () {
      try {
        const res = await axios.post('/auth/register', {
          username: username.value,
          email: email.value,
          password: password.value
        })
        sessionStorage.setItem('username', res.data.username)
        res.data && window.location.replace('/login')
        error.value = false
      } catch (err) {
        error.value = true
      }
    }

    return {
      username,
      email,
      password,
      handleSubmit,
      error
    }
  }
}
</script>

<style scoped>
.register {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  align-items: center;
}

.registerTitle {
  font-size: 50px;
}

.registerForm {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.registerForm > label {
  margin: 10px 0;
}

.registerInput {
  padding: 10px;
  background-color: white;
  border: none;
}

.registerButton {
  margin-top: 20px;
  cursor: pointer;
  background-color: lightcoral;
  border: none;
  color: white;
  border-radius: 10px;
  padding: 10px;
}

.registerLoginButton {
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