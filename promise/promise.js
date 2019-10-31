class Promise {
    constructor(executor) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            if(this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                this.onResolvedCallbacks.forEach(fn => {
                    fn()
                })
            }
        }
        const reject = (reason) => {
            if(this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => {
                    fn()
                })
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected) {
        const promise2 = new Promise((resolve, reject) => {
            if(this.status === 'fulfilled') { // 如果状态为fulfilled时则将值传给这个成功的回调
                setTimeout(() => {
                    const x = onFulfilled(this.value) // x的值有可能为 promise || 123 || '123'...
                    // 注意：此时调用promise2时还没有返回值，要用setTimeout模拟进入第二次事件循环；先有鸡先有蛋
                    resolvePromise(promise2, x, resolve, reject) 
                }, 0)
            }
            if(this.status === 'rejected') {
                setTimeout(() => {
                    const x = onRejected(this.reason) // 如果状态为rejected时则将视频的原因传给失败的回调
                    resolvePromise(promise2, x, resolve, reject) 
                }, 0)
            }
            if(this.status === 'pending') { // 记录-》解决异步
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject) 
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject) 
                    }, 0)
                })
            }
        })
        return promise2; // 解决多次链式调用的问题
    }
}

const resolvePromise = (promise2, x, resolve, reject) => {
    // console.log(promise2, x, resolve, reject)
    if(promise2 === x) {
        throw TypeError('循环引用')
    }
    // 判断x是不是promise;注意：null的typeof也是object要排除
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        try {
            const then = x.then // 获取返回值x上的then方法；注意方法会报错要捕获异常；原因111
            if(typeof then === 'function') { // 就认为是promise
                then.call(x, y => {
                    // resolve(y)
                    // 递归解析 ; 有可能返回多个嵌套的promise
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    reject(r)
                })
            }
        } catch(e) {
            reject(e)
        }
    } else {
        resolve(x);
    }
}

/**
 * 111
 * Object.definePropety(obj, 'then', {
 *      get() {
 *          new Error()
 *      }
 * })
 */
// 发布 订阅者模式
module.exports = Promise;