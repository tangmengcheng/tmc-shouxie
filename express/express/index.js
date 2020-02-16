let http = require('http');
let url = require('url');
function createApplication() {
    // app是一个监听函数
    let app = (req, res) => {
        // 取出每一个layer
        // 1. 获取请求的方法
        let m = req.method.toLowerCase();
        // 2. 获取请求的路径
        let { pathname } = url.parse(req.url, true);
        
        // 通过next方法进行迭代
        let index = 0; // 取第一个
        function next(err) {
            // 如果数组全部迭代完成还没有找到  说明路径不存在
            if(index === app.routes.length) return res.end(`Cannot ${m} ${pathname}`);
            let { method, path, handler } = app.routes[index++]; // 每次调用next就应该取下一个layer 
            if(err) {
                // 如果有错误  我们应该去找错误中间件；错误中间件有一个特点：它有四个参数
                if(handler.length === 4) {
                    handler(err, req, res, next);
                } else {
                    // 如果没有匹配到 要将err继续传递下去
                    next(err); // 继续走下一个layer 继续判断
                }
            } else {
                if(method === 'middle') { // 处理中间件
                    if(path === '/' || path === pathname || pathname.startsWith(path + '/')) {
                        handler(req, res, next);
                    } else {
                        next(); // 如果这个中间件没有匹配到  那么就继续走下一个layer
                    }
                } else {
                    // 处理路由
                    if((method === m || method === 'all') && (path === pathname || path === '*')) {
                        handler(req, res);
                    } else {
                        next();
                    }
                }
            }
        }
        next(); // 中间件的next方法


        // 没有加中间件之前的方法
        // for(let i = 0; i < app.routes.length; i++) {
        //     let { method, path, handler } = app.routes[i];
        //     if((method === m || method === 'all') && (path === pathname || path === '*')) {
        //         handler(req, res);
        //     }
        // }
        // res.end(`Cannont ${m} ${pathname} `)
    }
    app.routes = []; // 存放所有的参数

    app.use = function(path, handler) {
        // 处理中间件参数的问题
        if(typeof handler !== 'function') {
            handler = path; // 没有传第一个参数
            path = '/'; //不写默认是 /
        }
        let layer = {
            method: 'middle', // method是middle就表示是一个中间件
            path,
            handler
        }
        app.routes.push(layer); // 将中间件放到容器内
    }

    // express 内置中间件
    app.use(function(req, res, next) {
        let {pathname, query} = url.parse(req.url, true);
        let hostname = req.headers['host'].split(':')[0];
        req.path = pathname;
        req.query = query;
        req.hostname = hostname;
        next()
    })

    http.METHODS.forEach(method => {
        method = method.toLowerCase(); // 将方法名转换为小写
        /**
         * path: 路径
         * handler：监听函数
         */
        app[method] = function(path, handler) {
            let layer = {
                method,
                path,
                handler
            }
            app.routes.push(layer);
        }
    })

    app.all = function(path, handler) {
        let layer = {
            method: 'all', // 如果method是all，表示全部匹配
            path,
            handler
        }
        app.routes.push(layer);
    }
    
    app.listen = function() {
        let server = http.createServer(app);
        server.listen(...arguments);
    }
    return app;
}

module.exports = createApplication;