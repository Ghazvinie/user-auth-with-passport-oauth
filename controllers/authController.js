function signUpGet(req, res) {
    res.send('signUp');
}

function signUpPost(req, res) {
    res.send('signUp!');
}

module.exports = { signUpGet, signUpPost };