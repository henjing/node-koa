import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import addController from './controller';
import staticFiles from './static-files';

// 创建一个koa服务器
const app = new Koa();

// import路由得到的是一个函数，所以要运行这个函数才可以使用router.routes()这样的方法
const router = Router();

app.use(bodyParser());
app.use(router.routes());

// 执行自动扫描控制器目录的函数，这里第二个参数如果不传默认就是controllers
addController(router);

// 处理静态文件的中间件
app.use(staticFiles('/static/', `${__dirname}/static`));

// 服务器你监听3000端口
app.listen(4000);
console.log('app start at port 4000');
