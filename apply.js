Function.prototype.apply2 = function(content = window) {
    content.fn = this;
    let result;
    // 判断是否有第二个参数
    if(arguments[1]) {
        result = content.fn(...arguments[1]);
    } else {
        result = content.fn();
    }
    delete content.fn;
    return result;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Student(name, age, grade) {
    Person.apply2(this, arguments);
    this.grade = grade;
}

let student = new Student('tmc', '24', '一年级')
console.log(student)
