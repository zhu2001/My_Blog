const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require('./router/auth')
const userRoute = require('./router/users')
const postRoute = require('./router/posts')
const categoryRoute = require('./router/categories')
const multer = require('multer')
const path = require("path")

dotenv.config()
app.use(express.json())
// 使用内置中间件暴露静态资源，不访问路由直接写文件名+后缀也能看页面
// app.use(express.static(__dirname + '/public'))
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)
app.listen('3000', (err) => {
  if (err) console.log('启动失败', err)
  else console.log('服务器启动成功i')
})