// https://juejin.im/post/5c9a43175188252d876e5903#heading-4

// async function async1() {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }

// async function async2() {
//     console.log('async2 start')
// }

// console.log('script start')

// setTimeout(function() {
//     console.log('setttimeout')
// })

// async1()

// new Promise(function(resolve) {
//     console.log('promise1')
//     resolve()
// }).then(function(){
//     console.log('promise2')
// })

// console.log('script end')


// setTimeout(()=>{
//     console.log(1) 
//  },0)
//  Promise.resolve().then(()=>{
//     console.log(2) 
//  })
//  console.log(3) 


// setTimeout(()=>{
//     console.log(1) 
//  },0)
//  let a=new Promise((resolve)=>{
//      console.log(2)
//      resolve()
//  }).then(()=>{
//     console.log(3) 
//  }).then(()=>{
//     console.log(4) 
//  })
//  console.log(5)
 
new Promise((resolve,reject)=>{
    console.log("promise1")
    resolve()
}).then(()=>{
    console.log("then11")
    new Promise((resolve,reject)=>{
        console.log("promise2")
        resolve()
    }).then(()=>{
        console.log("then21")
    }).then(()=>{
        console.log("then23")
    })
}).then(()=>{
    console.log("then12")
})
