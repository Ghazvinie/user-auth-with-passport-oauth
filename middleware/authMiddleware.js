// Checks user is authenticated, if so can continue on, if not then redirected to dashboard
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        // Set notSignedIn to true so that message is displayed to user 
        req.session.notSignedIn = true;
        res.status(401).redirect('/auth/signin');
        return;
    }
}

module.exports = ensureAuth;