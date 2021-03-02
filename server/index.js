const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())
require('./routes/admin')(app)
require('./plugins/db')(app)

// 上传文件夹静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))


app.listen(3000, () => {
  console.log('启动成功，http://localhost:3000')
})