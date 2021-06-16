const passport = require('passport');
const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');

function signUpGet(req, res) {
    res.status(200).render('signUp');
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
    // Set notSignedIn to false for any falsey value
    const notSignedIn = req.session.notSignedIn ? true : false;
    // Reset notSignedIn on req.session
    req.session.notSignedIn = false;
    // Render signIn view
    res.render('signIn', { notSignedIn, message: req.flash('error') });
}

function signInPost(req, res, next) {
    passport.authenticate('local', {
        failureRedirect: 'signIn',
        successRedirect: 'dashboard',
        failureFlash: true
    })(req, res, next);
}

function googleGet(req, res, next) {
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })(req, res, next);
}

function googleRedirect(req, res, next) {
    passport.authenticate('google',
        { failureRedirect: '/auth/signin', successRedirect: '/auth/dashboard' 
    })(req, res, next);
}


function dashboardGet(req, res) {
    if (req.user) {
        res.locals.user = req.user;
    }
    res.render('dashboard');
}

// Sign out GET
function signOutGet(req, res) {
    // Clear session, and locals store of user
    req.logout();
    res.redirect('/');
}

module.exports = { signUpGet, signUpPost, signInGet, signInPost, googleGet, googleRedirect, dashboardGet, signOutGet };