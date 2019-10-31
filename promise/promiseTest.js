var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('异步Promise')
    }, 1000)
    console.log('创建一个同步执行的Promise')
})
p.then(function(data) {
    console.log(data)
})