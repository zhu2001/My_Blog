<template>
  <div class="write">
    <img class="writeImg" v-show="file" :src="url" />
    <form class="writeForm" @submit.native.prevent="handleSubmit">
      <div class="writeFormGroup">
        <label htmlFor="fileInput">
          <i class="writeIcon fas fa-plus"></i>
        </label>
        <input type="file" id="fileInput" style="display:none" @change="setFile($event)">
        <input type="text" v-model="title" placeholder="Title" class="writeInput" autofocus>
      </div>
      <div class="writeFormGroup">
        <textarea v-model="desc" placeholder="Tell your story..." type="text" class="writeInput writeText"></textarea>
      </div>
      <button class="writeSubmit" type="submit">Publish</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Write',
  setup () {
    const store = useStore()
    let title = ref('')
    let desc = ref('')
    let file = ref(null)
    let url = ref('')

    async function handleSubmit () {
      const newPost = reactive({
        username: store.state.user.username,
        title: title.value,
        desc: desc.value
      })
      if (file.value) {
        const data = new FormData()
        const filename = Date.now() + file.value.name
        data.append("name", filename)
        data.append('file', file.value)
        newPost.photo = filename
        try {
          await axios.post("/upload", data)
        } catch (err) { }
      }
      try {
        console.log(newPost)
        const res = await axios.post("/posts", newPost)
        window.location.replace("/post/" + res.data._id)
      } catch (err) { }
    }

    function setFile (e) {
      url.value = window.URL.createObjectURL(e.target.files[0])
      file.value = e.target.files[0]

      // file.value.push(url.value)
      // console.log(e.target.files[0])
      // url.value = window.URL.createObjectURL(e.files[0])
    }
    // watchEffect(() => {
    //   console.log(JSON.parse(localStorage.getItem("user")))
    // })

    return {
      title,
      file,
      desc,
      setFile,
      url,
      handleSubmit
    }
  }
}
</script>

<style>
.write {
  padding-top: 50px;
}

.writeImg {
  margin-left: 150px;
  width: 70vw;
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
}

.writeForm {
  position: relative;
}

.writeFormGroup {
  margin-left: 150px;
  display: flex;
  align-items: center;
}

.writeIcon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: rgb(121, 118, 118);
  cursor: pointer;
}

.writeInput {
  font-size: 30px;
  border: none;
  padding: 20px;
  width: 70vw;
}

.writeInput:focus {
  outline: none;
}

.writeText {
  font-size: 20px;
  height: 100vh;
}

.writeSubmit {
  position: absolute;
  top: 20px;
  right: 50px;
  color: white;
  background-color: teal;
  padding: 10px;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  font-size: 16px;
}
</style>