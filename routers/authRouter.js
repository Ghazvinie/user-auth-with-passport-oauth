const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, dashboardGet } = require('../controllers/authController');
// const { isUserAuth } = require('../middleware/jwtMiddleware');
// const csrfProtection = require('../middleware/csrfMiddleware');

authRouter.get('/signup', signUpGet);

authRouter.post('/signup', signUpPost);

authRouter.get('/signin', signInGet);

authRouter.post('/signin', signInPost);

authRouter.get('/dashboard', dashboardGet);

// authRouter.post('/changePassword', csrfProtection, isUserAuth, changePasswordPost);

// authRouter.get('/signout', signOutGet);

module.exports = authRouter;