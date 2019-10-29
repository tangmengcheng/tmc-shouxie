// // 默认绑定 隐士绑定 显示绑定 new绑定
// var obj = {
//     hi: function() {
//         console.log(this)
//         return () => {
//             console.log(this)
//         }
//     },
//     sayHi: function() {
//         return function() {
//             console.log(this)
//             return () => {
//                 console.log(this)
//             }
//         }
//     },
//     see: function() {
//         console.log(this)
//         (function() {
//             console.log(this)
//         })()
//     },
//     say: () => {
//         console.log(this)
//     }
// }
// // let hi = obj.hi()
// // hi()
// // let sayHi = obj.sayHi()
// // let fun1 = sayHi()
// // fun1()
// // obj.say()
// obj.see()

function sayHi(){
    console.log('Hello,', this.name);
}
var name = 'YvetteLau';
sayHi();