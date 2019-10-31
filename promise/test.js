const Promise = require('./promise')

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 1000)
})
const p1 = promise.then(res => {
    console.log(res)
    return new Promise((resolve, reject) => {
        resolve('=============')
    })
    // return "12312313"
    // return p1
})
const p2 = p1.then(res => {
    console.log(res)
})