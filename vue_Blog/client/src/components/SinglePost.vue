<template>
  <div class="singlePost">
    <div class="singlePostWrapper" v-if="post.post.data">
      <img v-if="post.post.data.photo" :src="PF + post.post.data.photo" class="singlePostImg">
      <input type="text" v-show="updateModel" class="singlePostTitleInput" v-model="title" outFocus>
      <h1 class="singlePostTitle" v-show="!updateModel">
        {{title}}
        <div class=" singlePostEdit" v-if="post.post.data.username===store.state.user?.username">
          <i class="singlePostIcon far fa-edit" @click="updateModel = true"></i>
          <i class="singlePostIcon far fa-trash-alt" @click="handleDelete"></i>
        </div>
      </h1>
      <div class="singlePostInfo">
        <span class="singlePostInfo">
          Author: <router-link :to="`/?username=${post.post.data.username}`"><b>{{post.post.data.username}}</b>
          </router-link>
        </span>
        <span class="singlePostDate">{{new Date(post.post.data.createdAt).toDateString()}}</span>
      </div>
      <textarea v-show="updateModel" class="singlePostDescInput" v-model="desc"></textarea>
      <p class="singlePostDesc" v-show="!updateModel">
        {{desc}}
      </p>
      <button v-show="updateModel" class="singlePostButton" @click="handleUpdate">Update</button>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  name: 'SinglePost',
  setup () {
    //获取当前访问的地址/IP
    const PF = "http://localhost:3000/images/"
    const location = window.location
    const path = location.pathname.split('/')[2]
    const store = useStore()
    let title = ref('')
    let desc = ref('')
    let updateModel = ref(false)
    let post = ref({
      post: {}
    })
    const getPost = async () => {
      post.value.post = await axios.get('/posts/' + path)
      title.value = post.value.post.data.title
      desc.value = post.value.post.data.desc
    }

    async function handleDelete () {
      try {
        await axios.delete("/posts/" + path, { data: { username: store.state.user.username } })
        window.location.replace('/')
      } catch (err) { }
    }
    getPost()

    async function handleUpdate () {
      try {
        await axios.put("/posts/" + path, {
          username: store.state.user.username,
          title: title.value,
          desc: desc.value
        }
        )
        // window.location.reload()
        updateModel.value = false
      } catch (err) { }
    }

    return {
      post,
      PF,
      store,
      handleDelete,
      updateModel,
      title,
      desc,
      handleUpdate,
      handleUpdate
    }
  }
}
</script>

<style scoped>
.singlePost {
  flex: 9;
}

.singlePostWrapper {
  padding: 20px;
  padding-right: 0;
  display: flex;
  flex-direction: column;
}

.singlePostImg {
  width: 100%;
  height: 300px;
  border-radius: 5px;
  object-fit: cover;
}

.singlePostTitle {
  text-align: center;
  margin: 10px;
  font-family: "Lora", serif;
  font-size: 28px;
}

.singlePostTitleInput {
  margin: 10px;
  font-family: "Lora", serif;
  font-size: 28px;
  text-align: center;
  border: none;
  color: gray;
  border-bottom: 1px solid lightgrey;
}

.singlePostTitleInput:focus {
  outline: none;
}

.singlePostEdit {
  float: right;
  font-size: 16px;
}

.singlePostIcon {
  margin-left: 10px;
  cursor: pointer;
}

.singlePostIcon:first-child {
  color: teal;
}

.singlePostIcon:last-child {
  color: tomato;
}

.singlePostInfo {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  font: size 16px;
  font-family: "Varela Round", sans-serif;
  color: #b39656;
}

.singlePostDesc {
  color: #666;
  font-size: 18px;
  line-height: 25px;
}

.singlePostDesc::first-letter {
  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
}

.singlePostDescInput {
  border: none;
  color: #666;
  font-size: 18px;
  line-height: 25px;
  resize: none;
}

.singlePostDescInput:focus {
  outline: none;
}

.singlePostButton {
  width: 100px;
  border: none;
  background-color: teal;
  padding: 5px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 20px;
}
</style>