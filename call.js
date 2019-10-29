// 简单版
// var foo = {
//     value: 1,
//     bar: function() {
//         console.log(this.value)
//     }
// }
// foo.bar()


/**
 * 完整版 步骤：
 * 将函数设为对象属性
 * 执行&删除这个函数
 * 指定this到函数并传入给定参数执行函数
 * 如果不传参数，默认指向window
 * */ 
Function.prototype.call2 = function(content = window) {
    // 判断是否是underfine和null
    // if(typeof content === 'undefined' || typeof content === null){
    //     content = window
    // }
    content.fn = this;
    let args = [...arguments].slice(1);
    let result = content.fn(...args);
    delete content.fn;
    return result;
}
let foo = {
    value: 1
}
function bar (name, age) {
    console.log("name: " + name)
    console.log("age: " + age)
    console.log("value: " + this.value)
}
bar.call2(foo, 'tmc', '24')