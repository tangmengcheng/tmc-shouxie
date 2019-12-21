// 解析用户的参数
const program = require('commander');
const path = require('path');
const { version } = require('./contants.js');

const mapActions = {
    create: {
        alias: 'c',
        description: 'create a project',
        examples: [
            'tmc-cli create <project-name>'
        ]
    },
    config: {
        alias: 'conf',
        description: 'config project variable',
        examples: [
            'tmc-cli config set <k> <v>',
            'tmc-cli config get <k>'
        ]
    },
    '*': {
        alias: '',
        description: 'command not found',
        examples: []
    }
}

Reflect.ownKeys(mapActions).forEach(action => {
    program.command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description) // 命令的描述
    .action(() => {
        if(action === '*') { // 访问不到对应的命令
            console.log(mapActions[action].description)
        }else {
            // tmc-cli create xxx [node, tmc-cli, create, xxx] 截取参数
            require(path.resolve(__dirname, action))(...process.argv.slice(3));
        }
    })
});

// 监听用户的help 事件
program.on('--help', () => {
    console.log('\nExamples:')
    Reflect.ownKeys(mapActions).forEach(action => {
        mapActions[action].examples.forEach(example => {
            console.log(`  ${example}`)
        })
    })
})

// 解析用户传过来的参数
program.version(version).parse(process.argv);
