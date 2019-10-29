/**
 * 函数柯里化
 * 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。
 */
// 通用版
function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    // console.log(length)
    // console.log(args)
    return function() {
        newArgs = args.concat(Array.prototype.slice.call(arguments))
        console.log(newArgs)
        if(newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        } else {
            return fn.apply(this, newArgs);
        }
    }
}
function multiFn(a, b, c) {
    console.log(a * b * c)
    return a * b * c;
}

var multi = curry(multiFn);
multi(2)(3)(4)
// multi(2, 3, 4)
// multi(2)(3, 4)
// multi(2, 3)(4)