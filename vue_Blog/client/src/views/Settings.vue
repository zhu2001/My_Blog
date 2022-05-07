<template>
  <div class="settings">
    <div class="settingsWrapper">
      <div class="settingsTitle">
        <span class="settingsUpdateTitle">Update your Account</span>
        <span class="settingsDeleteTitle" @click="deleteAccount">Delete Account</span>
      </div>
      <form class="settingsForm" @submit.native.prevent="handleSubmit">
        <label>Profile Picture</label>
        <div class="settingsPP">
          <img :src="file?url:PF+store.state.user.profilePic" />
          <label htmlFor="fileInput">
            <i class="settingsPPIcon far fa-user-circle"></i>
          </label>
          <input type="file" id="fileInput" style="display:none" @change="setFile($event)">
        </div>
        <label>Username</label>
        <input type="text" placeholder="username" v-model="username">
        <label>Email</label>
        <input type="email" placeholder="email" v-model="email" />
        <label>Password</label>
        <input type="password" v-model="password">
        <button class="settingsSubmit" type="submit">Update</button>
        <span v-show="success" style="color:green;textAlign:center;marginTop:20px">Profile has been updated...</span>
      </form>
    </div>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import axios from 'axios'
export default {
  name: 'Setting',
  components: { Sidebar },
  setup () {
    const PF = "http://localhost:3000/images/"
    const success = ref(false)
    const store = useStore()
    let url = ref('')
    let file = ref(null)
    let username = ref(store.state.user.username)
    let email = ref(store.state.user.email)
    let password = ref('')

    async function handleSubmit () {
      store.dispatch('updateStart')
      const updatedUser = reactive({
        userId: store.state.user._id,
        username: username.value,
        email: email.value,
        password: password.value
      })
      if (file.value) {
        const data = new FormData()
        const filename = Date.now() + file.value.name
        data.append('name', filename)
        data.append('file', file.value)
        updatedUser.profilePic = filename
        try {
          await axios.post('/upload', data)
        } catch (err) { }
      }
      try {
        const res = await axios.put('/users/' + store.state.user._id, updatedUser)
        success.value = true
        store.dispatch('updateSuccess', res.data)
      } catch (err) { store.dispatch('updateFailure') }
    }

    function setFile (e) {
      url.value = window.URL.createObjectURL(e.target.files[0])
      file.value = e.target.files[0]
    }

    async function deleteAccount () {

      if (confirm('是否确定删除账号')) {
        try {
          await axios.delete('/users/' + store.state.user._id)
          store.commit('deleteAccount')
          sessionStorage.removeItem('username')
          localStorage.removeItem('user')
          window.location.replace('/')
        } catch (err) { console.log(err) }
      }
    }

    return {
      setFile,
      url,
      file,
      username,
      email,
      password,
      store,
      handleSubmit,
      PF,
      success,
      deleteAccount
    }
  }

}
</script>

<style>
.settings {
  display: flex;
}

.settingsWrapper {
  flex: 9;
  padding: 20px;
}

.settingsTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settingsUpdateTitle {
  font-size: 30px;
  margin-bottom: 20px;
  color: lightcoral;
}

.settingsDeleteTitle {
  color: red;
  font-size: 12px;
  cursor: pointer;
}

.settingsForm {
  display: flex;
  flex-direction: column;
}

.settingsPP {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.settingsPP > img {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  object-fit: cover;
}

.settingsPPIcon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: lightcoral;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
}

.settingsForm > label {
  font-size: 20px;
  margin-top: 20px;
}

.settingsForm > input {
  color: gary;
  margin: 10px 0;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgray;
}

.settingsSubmit {
  width: 150px;
  align-self: center;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: teal;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
}
</style>