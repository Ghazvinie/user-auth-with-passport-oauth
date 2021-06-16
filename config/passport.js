const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/userSchema');
const bcrypt = require('bcrypt');

function passportSetup(passport) {

    passport.use(new LocalStrategy({ usernameField: 'email' },
        async function (email, password, done) {
            try {
                const user = await UserModel.findOne({ email });
                if (user) {
                    const userValid = await bcrypt.compare(password, user.password);
                    if (userValid) {
                        return done(null, user);
                    } else {
                        return done(false, null, { message: 'Invalid password' });
                    }
                } else {
                    return done(false, null, { message: 'Email not registered' });
                }
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const userExists = await UserModel.findOne({ googleID: profile.id });
                if (userExists) {
                    done(null, userExists);
                } else {
                    console.log('user does not exist');
                    const user = new UserModel({
                        email: profile._json.email,
                        googleID: profile.id
                    });
                    const newUser = await user.save({ validateBeforeSave: false });
                    done(null, newUser);
                }
            } catch (err) {
                console.log(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            if (user) {
                done(null, user);
            } else {
                done(new Error('User not found'));
            }
        } catch (err) {
            done(err);
        }
    });
}

module.exports = passportSetup;