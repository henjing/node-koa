/*
 * 处理静态资源文件的中间件 
 * */

import path from 'path';
import fs from 'mz/fs';
import mime from 'mime';

export default function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        console.log('path000' + rpath)
        console.log('dir' + dir)
        // 判断是否以指定的url开头
        if (rpath.startsWith(url)) {
            
            // 获取完整路径
            let fp = path.join(dir, rpath.substring(url.length));
            // 判断文件是否存在
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
                
            } else {
                ctx.response.status = 404;
            }
            
        } else {
            await next();
        }
    };
}

