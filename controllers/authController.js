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
    const { email, password } = req.body;

    passport.authenticate('local', {
        failureRedirect: 'signIn',
        successRedirect: 'dashboard',
    }) (req, res, next);


    // try {
    //     // Find user
    //     const user = await UserModel.findOne({ email });
    //     if (user) {
    //         // Check encrypted password
    //         const userValid = await bcrypt.compare(password, user.password);
    //         // If passwords match
    //         if (userValid) {
    //             const redirect = '/auth/dashboard';
    //             const { _id, username } = user;
    //             // Generate JWT for user with _id
    //             const token = generateJWT(_id);
    //             // Store JWT in cookie
    //             res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600 * 1000, sameSite: 'lax' });
    //             // Set flash message
    //             req.flash('userDetails', username);
    //             res.status(200).json({ redirect });
    //         } else {
    //             throw Error('Incorrect password');
    //         }
    //     } else {
    //         throw Error('Incorrect username or email');
    //     }
    // } catch (error) {
    //     const err = errorHandler(error);
    //     // Send error for page to display to user
    //     res.json({ err });
    // }

}

function dashboardGet(req, res){
    res.render('dashboard');
}
module.exports = { signUpGet, signUpPost, signInGet, signInPost, dashboardGet };