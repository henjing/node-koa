var fnIndex = async(ctx, next) => {
    const data = {
        title: '碎片科技',
        name: '黄恩景',
    };
    ctx.render('index.html', data);
};

var fnSignin = async(ctx, next) => {
    await next();
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(`signin with name: ${name} password: ${password}`);
    if(name === 'koa' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
                 <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'GET /': fnIndex,
    'GET /index': fnIndex,
    'GET /index.html': fnIndex,
    'POST /signin': fnSignin
};