var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.loginUser);
    if(req.session.loginUser) {
        res.render('index', {title: 'Express'});
    } else {
        return res.redirect("/login");
    }
});

router.get('/login', function(req, res, next) {
    res.render('login/login');
});

module.exports = router;
