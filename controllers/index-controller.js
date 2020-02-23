const mongoose = require('mongoose');
const User = mongoose.model('User');


const index = (req, res) => {
    res.render('index');
}


const login = (req, res) => {
console.log(req.body.email)

res.render('index', {message: req.body.email});
}

const testing = (req, res) => {
res.send('your test routing works');
}

const register = (req, res) => {
res.render('register');
}

module.exports = { index, login, testing, register}