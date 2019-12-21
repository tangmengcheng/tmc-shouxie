const axios = require('axios');
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const Inquirer = require('inquirer');
const MetalSmith = require('metalsmith'); // 编译文件夹  找需不需要渲染
// consolidate 统一了  所有的模板引擎 handlebars ejs
let { render } = require('consolidate').ejs;
render = promisify(render);

let downloadGitRepo = require('download-git-repo');
// promisify 可以把异步的方法转换成promise
downloadGitRepo = promisify(downloadGitRepo);
let ncp = require('ncp');
ncp = promisify(ncp);
const {downloadDirectory} = require('./contants.js');


// create 所有的逻辑
// create功能就是创建项目
// 拉取你自己的所有项目列出来  让用户选 安装那个项目
// 选完后  在显示所有的版本号  1.0...

// https://api.github.com/orgs/zhu-cli/repos 获取组织（或用户）下的仓库
// 可能还需要用户配置一些数据  来结合渲染我的项目

// 获取项目列表
const fetchReposList = async () => {
    const {data} = await axios.get('https://api.github.com/orgs/zhu-cli/repos');
    return data;
}
// 获取Tags列表
const fetchTagList = async (repo) => {
    const {data} = await axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`);
    return data;
}

// 封装loading
const waitFnloading = (fn, message) => async (...args) => {
    let spinner = ora(message);
    spinner.start();
    let result = await fn(...args);
    spinner.succeed();
    return result;
}

const download = async (repo, tag) => {
    let api = `zhu-cli/${repo}`; // 组织名+仓库名
    if(tag) {
        api += `#${tag}`;
    }
    const dest = `${downloadDirectory}/${repo}`; // 保存目录是.template/+仓库名
    await downloadGitRepo(api, dest);

    return dest; // 下载的最终目录
}

module.exports = async (projectName) => {
    // 1、获取项目的模板（所有的）
    let repos = await waitFnloading(fetchReposList, 'fetching template ...')();
    
    repos = repos.map(item => item.name); // 只需要仓库的名字
    console.log(repos);
    // 在获取之前  显示loading 结束loading
    // 完成后选择模板 inquirer
    const {repo} = await Inquirer.prompt({
        name: 'repo', // 获取选择后的结果
        type: 'list', // 列表选择
        message: 'please choise a template to create project',
        choices: repos
    });
    console.log(repo);

    // 获取对应的版本号
    let tags = await waitFnloading(fetchTagList, 'fetching tags ...')(repo);
    tags = tags.map(item => item.name); // 只需要tags的名字
    const {tag} = await Inquirer.prompt({
        name: 'tag', // 获取选择后的结果
        type: 'list', // 列表选择
        message: 'please choise a tags to create project',
        choices: tags
    });
    console.log(repo, tag); // 下载模板
    // 把模板放到一个临时目录，存好，以备后期使用

    // download-git-repo
    let result = await waitFnloading(download, 'download template...')(repo, tag); // 下载的目录
    console.log(result);
    // 我拿到了下载的目录，直接拷贝到当前执行的目录即可。 ncp path.resolve()表示当前执行的目录
    // 把template 下的文件 拷贝到执行命令的目录下 名字叫 projectName
    // 拷贝之前 要判断项目名字是否存在  如果存在提示用户当前项目已存在
    // 如果有ask.js文件
    
    if(!fs.existsSync(path.resolve(result, 'ask.js'))) {
        await ncp(result, path.resolve(projectName));
    } else {
        // 复杂的需要模板渲染，渲染后在拷贝。
        // 把git上的项目下载下来，如果有ask.js 文件就是一个复杂的项目模板；这样我们需要用户选择，选择后编译模板
        // metalsmith 只要是模板编译 都需要这个模板
        console.log('复杂模板');
        // 1、让用户填写信息
        await new Promise((resolve, reject) => {
            MetalSmith(__dirname) // 如果你传入路径  他会默认遍历当前路径下的src文件夹
            .source(result)
            .destination(path.resolve(projectName))
            .use(async (files, metal, done) => {
                const args = require(path.join(result, 'ask.js'));
                const obj =  await Inquirer.prompt(args);
                const meta = metal.metadata();
                Object.assign(meta, obj); // 将用户填写的信息添加到meta对象上, 这样就可以传给下一个use了
                delete files['ask.js'];
                done();
            })
            .use((files, meta, done) => {
                let objs = meta.metadata()
                Reflect.ownKeys(files).forEach(async file => {
                    // 这个是要处理的  如果有<%也说明是模板
                    if(file.includes('js') || file.includes('json')) {
                        let content = files[file].contents.toString(); // 文件的内容
                        if(content.includes('<%')) {
                            content = await render(content, objs); // 转换后的文件内容
                            files[file].contents = Buffer.from(content); // 渲染
                        }
                    }
                })
                // 根据用户的输入  下载模板
                console.log(meta.metadata());
                done();
            })
            .build(err => {
                if(err) {
                    reject();
                }else {
                    resolve();
                }
            })
        })
        // 2、用用户填写的信息去渲染模板
        
    }
};