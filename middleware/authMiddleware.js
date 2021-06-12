function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
    } else {
        req.session.notSignedIn = true;
        res.redirect('/auth/signin');
        return;
    }
}

function setUser(req, res, next) {
    if (!req.isAuthenticated()) {
        res.locals.user = '';
        return next();
    }
    res.locals.user = req.user;
    next();
}

module.exports = { ensureAuthenticated, setUser };