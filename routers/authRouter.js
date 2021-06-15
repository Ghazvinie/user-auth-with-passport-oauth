const authRouter = require('express').Router();
const { signUpGet, signUpPost, signInGet, signInPost, googleGet, googleRedirect, dashboardGet, signOutGet } = require('../controllers/authController');
const ensureAuthenticated  = require('../middleware/authMiddleware');
const passport = require('passport');
authRouter.get('/signup', signUpGet);

authRouter.post('/signup', signUpPost);

authRouter.get('/signin', signInGet);

authRouter.post('/signin', signInPost);

// authRouter.get('/google', passport.authenticate('google', {
//     scope: ['profile']
//   }));

authRouter.get('/google', googleGet);

authRouter.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/'}),
  function(req, res) {
    // Explicitly save the session before redirecting!

    setTimeout(() => {
        req.session.save(() => {
            res.redirect('./dashboard');
          })
    }, 10000)

  });

// authRouter.get('/google/redirect', googleRedirect);

// authRouter.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/' }),
// function(req, res) {
//   // Successful authentication, redirect home.
//   res.redirect('/dashboard');
// });

// authRouter.get('/google/redirect', (req, res) => {
//     res.send('hello')
// })

authRouter.get('/google/dashboard', ensureAuthenticated, dashboardGet);

authRouter.get('/signout', signOutGet);

module.exports = authRouter;