const passport = require('passport');
const UserModel = require('../models/userSchema');
const errorHandler = require('../utils/errorHandler');

// Render sign up page
function signUpGet(req, res) {
    res.status(200).render('signUp');
}

// Process sign up POST form 
async function signUpPost(req, res) {
    // Get form data
    const { email, password } = req.body;

    try {
        // Save user to database and then redirect user to sign in
        const user = await UserModel.create({ email, password });
        const redirect = '/auth/signin';
        res.status(201).json({ redirect });
    } catch (error) {
        const err = errorHandler(error);
        // Send error for page to display to user
        res.status(400).json({ err });
    }
}

// Render sign in page
function signInGet(req, res) {
    // Set notSignedIn to false for any falsey value. 
    // This helps in displaying message if user is redirected from dashboard page before signing in.
    const notSignedIn = req.session.notSignedIn ? true : false;
    // Reset notSignedIn on req.session
    req.session.notSignedIn = false;

    res.render('signIn', { notSignedIn, message: req.flash('error') });
}

// Authenticate user if they choose to sign in with email and password
function signInPost(req, res, next) {
    passport.authenticate('local', {
        failureRedirect: 'signIn',
        successRedirect: 'dashboard',
        failureFlash: true
    })(req, res, next);
}

// Authenticate user if they choose to sign in / up with Google
function googleGet(req, res, next) {
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })(req, res, next);
}

// Hanlde the redirect from Google authentication
function googleRedirect(req, res, next) {
    passport.authenticate('google',
        { failureRedirect: '/auth/signin', 
        successRedirect: '/auth/dashboard' 
    })(req, res, next);
}

// Render dashboard page
function dashboardGet(req, res) {
    // Store user to locals for displaying to dashboard
    if (req.user) {
        res.locals.user = req.user;
    }
    res.status(200).render('dashboard');
}

// Sign user out 
function signOutGet(req, res) {
    // Clear session, and locals store of user
    req.logout();
    res.redirect('/');
}

module.exports = { signUpGet, signUpPost, signInGet, signInPost, googleGet, googleRedirect, dashboardGet, signOutGet };