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
                        return done(new Error ('Invalid password'));
                    }
                } else {
                    return done(new Error ('User not found' ));
                }
            } catch (err) {
                console.log(err);
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById({ id });
            if (user) {
                done(null, user);
            } else {
                done(new Error ('User not found'));
            }
        } catch (err) {
            console.log(err);
            done(err);
        }
    });
}

module.exports = passportSetup;