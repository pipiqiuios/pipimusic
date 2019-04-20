const Koa = require('koa')
const path = require('path')

//创建服务器
let app = new Koa();

//开启服务器
app.listen(7777, () => {
     console.log("7777端口的服务器已经启动");
})

//模板渲染
const render = require('koa-art-template');
render(app, {
     root: path.join(__dirname, 'view'),
     extname: '.html',
     //静态内容实时更新
     debug: process.env.NODE_ENV !== 'production'
});

//引入路由中间件
const Router = require('koa-router');
let router = new Router();

router.get('/', async ctx => {
     ctx.render('index');
})

//为了给static 重写url
app.use(async (ctx, next) => {
     if (ctx.url.startsWith('/public')) {
          ctx.url = ctx.url.replace('/public', '');
     }
     await next();
})

//处理静态资源
app.use(require('koa-static')(path.resolve('./public')));
//开始使用中间件
app.use(router.routes());