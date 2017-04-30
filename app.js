import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import addController from './controller';
import staticFiles from './static-files';
import templating from './templating';

// 创建一个koa服务器
const app = new Koa();
// import路由得到的是一个函数，所以要运行这个函数才可以使用router.routes()这样的方法
const router = Router();
// 用于判断是生产环境还是开发环境
const isProduction = process.env.NODE_ENV === 'production';

// 记录url以及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 处理静态文件的中间件
// 在生产环境上node不处理静态资源文件，它们又服务器处理
if (!isProduction) {
    app.use(staticFiles('/static/', `${__dirname}/static`));
}

//解析post请求
app.use(bodyParser());

// 负责给ctx加上render()来使用Nunjucks
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction,
}));

// 执行自动扫描控制器目录的函数，这里第二个参数如果不传默认就是controllers
addController(router);
app.use(router.routes());

// 服务器你监听3000端口
app.listen(4000);
console.log('app start at port 4000');
