function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        next();
    } else {
        res.send('You cannot view this page');
    }
}

module.exports = ensureAuthenticated;