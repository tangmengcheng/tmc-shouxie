// 为了处理异步resolve，用2个数组onFullFilledArray和onRejectedArray来保存异步的方法
function MyPromise(executor) {
    var self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onFullFilledArray = [];
    self.onRejectedArray = [];
    // 定义成功的方法
    function resolve(value) {
        if(self.status === 'pending') {
            self.value = value;
            self.status = 'resolved';
            self.onFullFilledArray.forEach(function(cb) {
                cb(self.value);
            })
        }
    }
    // 定义失败的方法
    function reject(reason) {
        if(self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedArray.forEach(function(cb) {
                cb(self.reason);
            })
        }
    }
    // 捕获异常
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
// 在Promise原型上定义then方法
MyPromise.prototype.then = function(onFullFilled, onRejected) {
    let self = this;
    switch(self.status) {
        case 'pending':
            self.onFullFilledArray.push(function() {
                onFullFilled(self.value);
            });
            self.onRejectedArray.push(function() {
                onRejected(self.reason);
            });
        case 'resolved':
            onFullFilled(self.value);
            break;
        case 'rejected':
            onRejected(self.reason);
            break;
        default:;
    }
}

module.exports = MyPromise;