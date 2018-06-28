var express = require('express');
var router = express.Router();
var users = require('../account/users').items;

var findUser = function(name, password){ // 校验用户名和密码是否正确;
    return users.find(function(item){
        return item.name === name && item.password === password;
    });
};

router.post('/login.json', function(req, res, next) {
    var user = findUser(req.body.name, req.body.password);
    console.log(req.body.name, req.body.password);
    if(user){
        req.session.regenerate(function(err) {
            if(err){
                return res.json({httpCode: 500, msg: '登录失败'});
            }
            req.session.user = user.name;
            res.json({httpCode: 200, msg: '登录成功'});
        });
    }else{
        res.json({httpCode: 200, ret_msg: '账号或密码错误'});
    }
});

module.exports = router;
