const MyPromise = require('./Promise-v1');

var p = new MyPromise(function(resolve, reject) {
    setTimeout(function() {
        resolve(1);
    }, 1000);
});

p.then(function(data) {
    console.log(data);
})

// V1 版本无法处理异步的resolve