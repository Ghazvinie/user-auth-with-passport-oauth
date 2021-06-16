const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, googleGet, googleRedirect, dashboardGet, signOutGet } = require('../controllers/authController');
const ensureAuth  = require('../middleware/authMiddleware');

authRouter.get('/signup', signUpGet);

authRouter.post('/signup', signUpPost);

authRouter.get('/signin', signInGet);

authRouter.post('/signin', signInPost);

authRouter.get('/google', googleGet);

authRouter.get('/google/redirect', googleRedirect);

// Checks user is authorised to view dashboard
authRouter.get('/dashboard', ensureAuth, dashboardGet);

authRouter.get('/signout', signOutGet);

module.exports = authRouter;