// 中间件  在执行路由之前 要干一些处理工作
let express = require('./express')

let app = express()
app.use('/', (req, res, next) => {
    // use 方法第一个参数不写默认就是 /
    // 注意：只要开头能匹配到后面的就都匹配到和路由有区别，路由是完全相同
    // 可以扩展一下方法
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    console.log('middleware')
    next()
})

app.get('/name', (req, res) => {
    res.end('汤梦成')
})
app.get('/age', (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('你好')
})

// 错误中间件四个参数（err, req, res, next）放到路由的下面
app.use(function(err, req, res, next) {
    console.log(err)
    next(err) // 错误信息可以往下传
})

app.use(function(err, req, res, next) {
    console.log(err)
    next(err)
})

app.listen('3000', () => {
    console.log('server start 3000')
})