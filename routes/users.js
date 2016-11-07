var express = require('express');
var router = express.Router();

var Account = require('../models/account');


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

router.get('/',isLoggedIn, function(req, res, next)
{
    Account.find(function(err, accounts) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {

            res.render('users', {
                title: 'Users in the database',
                users: accounts,
                user: req.user

            });
        }
    });
});
module.exports = router;
