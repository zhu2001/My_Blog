<template>
  <div class="post">
    <img class="postImg" v-if="post.photo" :src='PF + post.photo' alt="">
    <div class="postInfo">
      <div class="postInfo">
        <div class="postCats" v-for="categories in post.categories">
          <span class="postCat">{{categories}}</span>
          <!-- <span class="postCat">Life</span> -->
        </div>
        <router-link :to="`/post/${post._id}`">
          <span class="postTitle">{{post.title}}</span>
        </router-link>
        <hr>
        <span class="postDate">{{new Date(post.createdAt).toDateString()}}</span>
      </div>
      <p class="postDesc">
        {{post.desc}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: { post: Object },
  setup (props, context) {
    const PF = "http://localhost:3000/images/"
    return {
      PF
    }
  }
}
</script>

<style>
.post {
  width: 385px;
  margin: 0px 25px 40px 25px;
}

.postImg {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 7px;
}

.postInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.postCat {
  font-family: "Varela Round", sans-serif;
  font-size: 11px;
  color: #be9656;
  lin-height: 20px;
  margin-top: 15px;
  margin-right: 10px;
  cursor: pointer;
}

.postTitle {
  font-family: "Josefin San", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-top: 15px;
  cursor: pointer;
}

.postDate {
  font-family: "Lora", serif;
  font-style: italic;
  font-size: 13px;
  color: #999;
  margin-top: 15px;
}

.postDesc {
  font-family: "Varela Round", sans-serif;
  font-size: 14px;
  color: #444;
  line-height: 24px;
  margin-top: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>