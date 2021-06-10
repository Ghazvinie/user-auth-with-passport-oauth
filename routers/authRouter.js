const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, dashboardGet } = require('../controllers/authController');
const ensureAuthenticated = require('../config/ensureAuthenticated');

// const csrfProtection = require('../middleware/csrfMiddleware');

authRouter.get('/signup', signUpGet);

authRouter.post('/signup', signUpPost);

authRouter.get('/signin', signInGet);

authRouter.post('/signin', signInPost);

authRouter.get('/dashboard', ensureAuthenticated, dashboardGet);

// authRouter.post('/changePassword', csrfProtection, isUserAuth, changePasswordPost);

// authRouter.get('/signout', signOutGet);

module.exports = authRouter;