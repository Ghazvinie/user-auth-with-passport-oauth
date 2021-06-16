function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.session.notSignedIn = true;
        res.redirect('/auth/signin');
        return;
    }
}

module.exports = ensureAuthenticated;