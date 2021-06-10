const passport = require('passport');
const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');

function signUpGet(req, res) {
    res.render('signUp');
}

// Process sign up POST form 
async function signUpPost(req, res) {
    // Get form data
    const { email, password } = req.body;

    try {
        // Save user to database
        const user = await UserModel.create({ email, password });
        const redirect = '/auth/signin';
        res.status(201).json({ redirect });
    } catch (error) {
        const err = errorHandler(error);
        // Send error for page to display to user
        res.status(400).json({ err });
    }
}

function signInGet(req, res) {
    res.render('signIn');
}

async function signInPost(req, res, next) {
    passport.authenticate('local', {
        failureRedirect: 'signIn',
        successRedirect: 'dashboard',
    }) (req, res, next);
}

function dashboardGet(req, res){
    res.render('dashboard');
}
module.exports = { signUpGet, signUpPost, signInGet, signInPost, dashboardGet };