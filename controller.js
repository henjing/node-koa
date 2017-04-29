/**
 * 自动扫描某个目录下的所有文件，默认是controllers
 * 过滤出js文件，然后遍历导入js文件，就可以得到每个js文件导出的对象
 * 包含路径和对应的处理函数，然后把路径和处理函数传入router.get()或者router.post()方法中
 * 这样在浏览器中输入地址就执行相应的处理函数了。
 * */

import fs from 'fs';

let addMaping = (maping, router) => {
    for (let url in maping) {
        
        if (url.startsWith('GET')) {
            const path = url.substring(4);
            router.get(path, maping[url]);
            
        } else if (url.startsWith('POST')) {
            const path = url.substring(5);
            router.post(path, maping[url]);
            
        } else {
            console.log(`invalid URL: ${url}`);
        }
        
    }
}

let addController = (router, dir = 'controllers') => {
    // 列出controllers目录下的所有文件
    let files = fs.readdirSync(`${__dirname}/${dir}`);
    
    // 过滤出.js文件
    let js_files = files.filter(f => {
        return f.endsWith('.js');
    });
    
    // 处理每个文件
    for (let file of js_files) {
        console.log(file)
        let maping = require(`${__dirname}/${dir}/${file}`);
        // 调用处理文件的函数
        addMaping(maping, router);
    }
}

module.exports = addController;
