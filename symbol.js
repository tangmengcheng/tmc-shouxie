// Symbol 基本数据类型 string number boolean null undefined
// 对象数据类型 object

// 特点：独一无二 永远不相等
let s1 = Symbol('tmc'); // symbol中的标识 一般只放number或string 不然结果返回Symbol([object Object])
let s2 = Symbol();
console.log(s1 === s2)

let obj = {
    [s1]: 1,
    a: 2
}
// 声明的Symbol属性是不可枚举的 for - in 可以遍历自身属性和原型上的属性ß
for(let key in obj) {
    console.log(obj[key])
}
// 获取对象上的属性
console.log(Object.getOwnPropertySymbols(obj));


let s3 = Symbol.for('tmc');
let s4 = Symbol.for('tmc');
console.log(s3 === s4);
// 通过Symbol来获取key值
console.log(Symbol.keyFor(s3))

// Symbol 内置对象
// Symbol.iterator 实现对象的遍历
// 元编程 可以去对原生js的操作进行修改
let instance = {
    [Symbol.hasInstance](value) {
        return 'a' in value;
    }
};
console.log({a: 3} instanceof instance)

let arr = [1, 2, 3];
arr[Symbol.isConcatSpreadable] = false; // 拼接数组时不展开
console.log([].concat(arr, [1, 2, 3]));

// match split search方法
let obj1 = {
    [Symbol.match](value) {
        return value.length === 3;
    }
}
console.log('abc'.match(obj1));

//species 衍生对象
class MyArray extends Array {
    constructor(...args) {
        super(...args)
    }
    // 强制修改一下
    static get [Symbol.species]() {
        return Array
    }
}
let v = new MyArray(1, 2, 3);
let c = v.map(item => item*=2); // c是v的衍生对象
console.log(c instanceof MyArray)

// Symbol.toPrimitive
// 数据类型转化
let obj3 = {
    [Symbol.toPrimitive](type) {
        console.log(type)
        return 123
    }
}
console.log(obj++)

// Symbol.toStringTag
let obj5 = {
    [Symbol.toStringTag]: 'xxxx'
}

console.log(Object.prototype.toString.call(obj5));