/**
 * 实现一个new操作符
 * 它创建了一个全新的对象
 * 它会被执行[[Prototype]](也就是__proto__)链接
 * 它使this指向新创建的对象
 * 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
 * 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用
 */
// function New(func) {
//     var res = {}
//     if(func.prototype !== null) {
//         res.__proto__ = func.prototype
//     }
//     var ret = func.apply(res, Array.prototype.slice.call(arguments, 1))
//     if((typeof ret === 'object') || typeof ret === 'function' && ret !== null) {
//         return ret
//     }
//     return res;
// }
// var obj = New(A, 1, 2)
// // equals to
// var obj2 = new A(1, 2)
/**
 * new操作符的特点
 * 1、new通过构造函数Test创建处理的实例可以访问构造函数中的属性也可以访问构造函数原型链上的属性，所以：通过new操作符，实例与构造函数通过原型链连接了起来
 * 2、构造函数如果返回原始值，那么这个返回值毫无意义
 * 3、构造函数如果返回对象，那么这个返回值会被正常的使用，导致new操作符没有作用
 */

 /**
  * new操作符的几个作用：
  * 1、new操作符返回一个对象，所以我们需要在内部创建一个对象
  * 2、这个对象，也就是构造函数中的this，可以访问到挂载在this上的任意属性
  * 3、这个对象可以访问到构造函数原型链上的属性，所以需要将对象与构造函数链接起来
  * 4、返回原始值需要忽略，返回对象需要正常处理
  */

  /**
   * 创建一个new操作符
   * @param {*} Con 构造函数
   * @param  {...any} args 忘构造函数中传的参数
   */
  function createNew(Con, ...args) {
    let obj = {} // 创建一个对象，因为new操作符会返回一个对象
    Object.setPrototypeOf(obj, Con.prototype) // 将对象与构造函数原型链接起来
    // obj.__proto__ = Con.prototype // 等价于上面的写法
    let result = Con.apply(obj, args) // 将构造函数中的this指向这个对象，并传递参数
    return result instanceof Object ? result : obj
  }
/**
 * 具体实现步骤：
 * 1、首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
 * 2、然后内部创建一个空对象 obj
 * 3、因为 obj 对象需要访问到构造函数原型链上的属性，所以我们通过 setPrototypeOf 将两者联系起来。这段代码等同于 obj.__proto__ = Con.prototype
 * 4、将 obj 绑定到构造函数上，并且传入剩余的参数
 * 5、判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 obj，这样就实现了忽略构造函数返回的原始值
 */
  function Test(name, age) {
      this.name = name
      this.age = age
  }
  Test.prototype.sayName = function() {
      console.log(this.name)
  }
  const a = createNew(Test, 'tmc', 24)
  console.log(a.name)
  console.log(a.age)
  a.sayName()