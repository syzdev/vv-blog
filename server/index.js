const express = require('express')
const app = express()

app.set('secret', 'syzdevinsist')

app.use(require('cors')())
app.use(express.json())
require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)
// 上传文件夹静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))


app.listen(3000, () => {
  console.log('启动成功，http://localhost:3000')
})