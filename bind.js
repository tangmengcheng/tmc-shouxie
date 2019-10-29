/**
 * bind() 方法
 * 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
 */

 Function.prototype.bind2 = function(content) {
     if(typeof this != 'function') {
         throw Error('not a function');
     }
     let _this = this;
     let args = [...arguments].slice(1);
     return function F() {
         // 判断是否被当做构造函数使用
         if(this instanceof F) {
             return _this.apply(this, args.concat([...arguments]))
         }
         return _this.apply(content, args.concat([...arguments]))
     }
 }

 function a() {
     console.log(this.name)
     return this.name     
 }
 var b = {name: 'tmc'}
 a.bind2(b)()