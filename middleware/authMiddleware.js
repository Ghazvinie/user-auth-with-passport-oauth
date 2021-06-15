function ensureAuthenticated(req, res, next) {
    console.log(req.user)
    if (req.isAuthenticated()) {
        next();
    } else {
        req.session.notSignedIn = true;
        res.redirect('/auth/signin');
        return;
    }
}

module.exports = ensureAuthenticated;