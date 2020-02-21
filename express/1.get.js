// express 是一个函数
let express = require('./express');

// app 监听函数
let app = express();
// RESTFUL API  根据方法名的不同，做对应的资源处理
// req 请求 客户端的请求
// res 响应 服务器的响应
app.get('/name', function(req, res) {
    res.end('tmc');
})

app.post('/age', function(req, res) {
    res.end('25')
})

// all 代表的是匹配所有的方法，* 表示匹配所有的路径；一定要放在最底部
app.listen(3001, () => {
    console.log(`Server start port at 3001`);
})