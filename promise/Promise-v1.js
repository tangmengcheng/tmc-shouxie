
function MyPromise(executor) {
    let self = this; // 缓存promise
    self.status = 'pending'; // 初始状态
    self.value = undefined; // 成功后的值
    self.reason = undefined; // 失败的原因
    function resolve(value) { // 定义resolve方法
        if(self.status === 'pending') {
            self.value = value;
            self.status = 'resolved';
        }
    }
    function reject(reason) { // 定义reject方法
        if(self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
        }
    }
    // 捕获异常
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
// Promise原型上要定义then方法
MyPromise.prototype.then = function(onFullFilled, onRejected) {
    let self = this;
    switch(self.status) {
        case "resolved":
            onFullFilled(self.value);
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:;
    }
}

module.exports = MyPromise;