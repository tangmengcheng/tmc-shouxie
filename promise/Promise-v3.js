function MyPromise(executor) {
    var self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onFullFilledArray = [];
    self.onRejectedArray = [];

    function resolve(value) {
        if(self.status === 'pending') {
            self.value = value;
            self.status = 'resolved';
            self.onFullFilledArray.forEach(function(cb) {
                cb(self.value);
            })
        }
    }

    function reject(reason) {
        if(self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedArray.forEach(function(cb) {
                cb(self.reason);
            })
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

MyPromise.prototype.then = function(onFullFilled, onRejected) {
    var self = this;
    var promise2;
    switch(self.status) {
        case 'pending':
            promise2 = new MyPromise(function(resolve, reject) {
                self.onFullFilledArray.push(function() {
                    try {
                        var temple = onFullFilled(self.value);
                        resolve(temple);
                    } catch (e) {
                        reject(e);
                    }
                });
                self.onRejectedArray.push(function() {
                    try {
                        var temple = onRejected(self.reason);
                    } catch (e) {
                        reject(e);
                    }
                })
            })
        case 'resolved':
            promise2 = new MyPromise(function(resolve, reject) {
                try {
                    var temple = onFullFilled(self.value);
                    resolve(temple);
                } catch (e) {
                    reject(e)
                }
            })
            break;
        case 'rejected':
            promise2 = new MyPromise(function(resolve, reject) {
                try {
                    var temple = onRejected(self.reason);
                    resolve(temple);
                } catch (e) {
                    reject(e);
                }
            })
            break;
        default:;
    }
    return promise2;
}

module.exports = MyPromise;