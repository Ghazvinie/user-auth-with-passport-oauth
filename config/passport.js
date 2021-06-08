const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userSchema');
const bcrypt = require('bcrypt');

function passportSetup(passport) {

    passport.use(new LocalStrategy(
        async function (email, password, done) {
            try {
                const user = await UserModel.findOne({ email });
                if (user) {
                    const userValid = await bcrypt.compare(password, user.password);
                    if (userValid) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
                } else {
                    return done(null, false, { message: 'User not found' });
                }
            } catch (err) {
                console.log(err);
            }
        }
    ));
}