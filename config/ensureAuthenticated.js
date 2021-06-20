function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        next();
    } else {
        res.locals.user = '';
        next();
    }
}

function setUser(req, res, next){
    if (!req.isAuthenticated()){
        res.locals.user = '';
        return next();
    }
    res.locals.user = req.user;
    next();
}

module.exports = {ensureAuthenticated, setUser };