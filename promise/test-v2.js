var MyPromise = require('./Promise-v2');

var p = new MyPromise(function(resolve, reject) {
    setTimeout(function() {
        resolve('测试resolve解决异步问题');
    }, 1000);
})

p.then(function(data) {
    console.log(data);
}).then(function() {
    console.log('链式调用1');
}).then(function() {
    console.log('链式调用2');
})