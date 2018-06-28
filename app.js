//加载模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

// 加载路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 生产一个express的实例
var app = express();

app.use(session({
    name: 'sessionKey',
    secret: 'admin',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1000 * 1000  // 有效期，单位是毫秒
    }
}));

// view engine setup
/*
设置 views 文件夹为存放视图文件的目录,
即存放模板文件的地方,__dirname 为全局变量,
存储当前正在执行的脚本所在的目录。
 */
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为jade
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//加载日志中间件
app.use(logger('dev'));
//加载解析json的中间件
app.use(express.json());
//加载解析urlencoded请求体的中间件。  post请求
app.use(express.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());


//登录拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;
    var isFile = url.indexOf('.');
    if(isFile === -1){
        if (url !== "/login" && !req.session.user) {
            return res.redirect("/login");
        }
    }
    next()
});

//设置public文件夹为放置静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

// 路由控制器。
app.use('/', indexRouter); // http://localhost:3000
app.use('/user', usersRouter);  //http://localhost:3000/users



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//把app导出。  别的地方就可以通过 require("app") 获取到这个对象
module.exports = app;
