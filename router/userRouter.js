const Router = require('koa-router');
const userRouter = new Router();





userRouter.get('/user/login', ctx => {
     ctx.render('login');
})



module.exports = userRouter;