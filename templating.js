import nunjucks from 'nunjucks';

const createEnv = (path, opts) => {
    
    let autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false;
        
    let env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path || 'views', {
            noCache: noCache,
            watch: watch,
        }), {
            autoescape: autoescape,
            throwOnUndefined: throwOnUndefined
        }
    );
    
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    
    return env;
};

const templating = (path, opts) => {
    // 创建Nunjucks的env对象
    let env = createEnv(path, opts);
    
    return async (ctx, next) => {
        // 给ctx绑定render函数
        ctx.render = (view, model) => {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        }
        
        await next();
    };
      
};

module.exports = templating;
